<template>
  <div>
    <v-game-manager
      :is-your-turn="isYourTurn"
      :player="name"
      :next-player="nextPlayer"
    ></v-game-manager>
    <v-board @click="onClick" v-bind="boardProps"></v-board>
    <v-possession v-bind="possessionProps" @click="click"></v-possession>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase.js'
import VBoard from '~/components/molecules/VBoard.vue'
import VPossession from '~/components/molecules/VPossession.vue'
import VGameManager from '~/components/molecules/VGameManager.vue'

export default {
  components: {
    VGameManager,
    VBoard,
    VPossession
  },
  props: {
    deepArray: {
      type: Object,
      required: true
    },

    docRef: {
      type: Function,
      required: true
    },

    isYourTurn: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    row: 3,
    col: 3,
    selecting: undefined,
    holding: undefined,
    holdingPieces: [],
    turn: 1
  }),

  computed: {
    ...mapGetters('playroom', ['id']),
    ...mapGetters('player', ['name']),

    boardProps() {
      const { deepLatestBoard, nextNumber, holding, latestBoard } = this
      return {
        board: deepLatestBoard,
        nextNumber,
        holding,
        shallowBoard: latestBoard
      }
    },

    possessionProps() {
      const { holdingPieces, selecting, name } = this
      return {
        holdingPieces,
        selecting,
        player: name
      }
    },

    nextPlayer() {
      if (!this.deepArray) return undefined
      return this.deepArray.nextPlayer
    },

    latestBoard() {
      const todos = this.todos
      return todos && todos.history
        ? this.cloneDeep(todos.history.slice(-1)[0].squares)
        : []
    },

    todos() {
      return this.deepArray ? this.deepArray : undefined
    },

    selectingOrHolding() {
      /**
       * stateのselectingもしくはholdingのうち、undefinedでないものを返す。
       * どちらもundefinedの場合はundefinedを返す
       * @type {Object | undefined}
       */
      return this.selecting || this.holding
    },

    deepLatestBoard() {
      /**
       * latestBoardをDeep Arrayに変換する。
       * latestBoardが[]の場合はundefinedを返す
       * @type {Array | undefined}
       */
      const latestBoard = this.latestBoard
      if (!latestBoard.length) {
        return undefined
      }

      const arr = new Array(this.row).fill(undefined).map(() => new Array(0))
      latestBoard.forEach((matrix) => {
        arr[matrix.row].push(matrix)
      })

      return arr
    },

    nextNumber() {
      const b = this.selectingOrHolding

      if (!b) {
        return undefined
      }
      if ('number' in b) {
        return b.number
      } else if ('value' in b) {
        return b.value.slice(-1)[0].number
      }
      return undefined
    }
  },

  created() {
    this.initHoldingPieces(this.name)
  },

  methods: {
    initHoldingPieces(playerName) {
      if (!playerName) return
      const holdingPieces = [
        { id: 0, number: 0, player: playerName },
        { id: 1, number: 0, player: playerName },
        { id: 2, number: 1, player: playerName },
        { id: 3, number: 1, player: playerName },
        { id: 4, number: 2, player: playerName },
        { id: 5, number: 2, player: playerName }
      ]
      this.holdingPieces = holdingPieces
    },
    filter(deepArray, player) {
      if (!deepArray) return []
      return deepArray.map((matrix) => {
        return matrix.filter((value) => {
          if (!('value' in value) | !value.value.length) return

          return value.value.slice(-1)[0].player === player
        })
      })
    },

    click(value) {
      if (!this.isYourTurn) return
      if (this.holding) {
        this.holding = undefined
      }
      value === this.selecting
        ? (this.selecting = undefined)
        : (this.selecting = value)
    },

    cloneDeep(value) {
      return JSON.parse(JSON.stringify(value))
    },

    getMetrix({ row, col }, board) {
      const filtered = board.filter((metrix) => {
        return metrix.row === row && metrix.col === col
      })

      return filtered[0]
    },

    getPlacedBoard({ row, col }, update, board) {
      return board.map((matrix) => {
        if (matrix.col === col && matrix.row === row) {
          const { value } = matrix
          value.push(update)

          return { ...matrix, value }
        } else {
          return matrix
        }
      })
    },

    getLatestValue({ row, col }, board) {
      const matrix = this.getMetrix({ row, col }, board)
      return matrix.value ? matrix.value.slice(-1)[0] : {}
    },

    getMovedBoard(from, to, board) {
      const latestValue = this.getLatestValue(from, board)
      if (!latestValue) {
        return []
      }

      const movedBoard = board.map((matrix) => {
        if (matrix.col === from.col && matrix.row === from.row) {
          const { value } = matrix
          value.pop()
          return { ...matrix, value }
        } else if (matrix.col === to.col && matrix.row === to.row) {
          const { value } = matrix
          value.push(latestValue)
          return { ...matrix, value }
        } else {
          return matrix
        }
      })
      return movedBoard
    },

    onClick(payload) {
      if (!this.isYourTurn) return
      const { row, col, value } = payload

      if (!this.selecting && !this.holding && !value.length) {
        return
      }

      if (this.selecting) {
        // not placeable
        if (value.length) {
          if (value.slice(-1)[0].number >= this.selecting.number) {
            // const selectedValue = this.cloneDeep(this.selecting)
            // this.selecting = undefined
            // console.log(1111, selectedValue)

            // this.holding = selectedValue

            return
          }
        }

        this.place({ row, col }, this.selecting, this.latestBoard)
        const a = this.holdingPieces.filter((holdingPiece) => {
          return this.selecting.id !== holdingPiece.id
        })

        this.selecting = undefined
        this.holdingPieces = a
      } else if (this.holding) {
        if (
          this.holding.row !== payload.row ||
          this.holding.col !== payload.col
        ) {
          const { value, ...from } = this.holding
          if (
            !payload.value.length ||
            payload.value.slice(-1)[0].number < value.slice(-1)[0].number
          ) {
            this.move(from, { row, col }, this.latestBoard)
          } else {
            return
          }
        }
        this.holding = undefined
      } else {
        if (value.slice(-1)[0].player !== this.name) return

        this.holding = { ...payload }
      }
    },

    move(from, to, board) {
      const b = this.getMovedBoard(from, to, board)
      if (!b.length) {
        return
      }

      this.docRef().update({
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: b,
          turn: this.turn,
          player: this.name
        }),
        nextPlayer: this.name === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
      })
      this.turn++
    },

    place({ row, col }, update, board) {
      const placedBoard = this.getPlacedBoard({ row, col }, update, board)

      this.docRef().update({
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: placedBoard,
          turn: this.turn,
          player: this.name
        }),
        nextPlayer: this.name === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
      })
      this.turn++
    }
  }
}
</script>

<style></style>
