<template>
  <div>
    <table style="margin:0 auto;">
      <tbody>
        <tr v-for="(rows, index) in deepLatestBoard" :key="index">
          <td
            v-for="cols in rows"
            :key="cols.row + cols.col"
            :class="{
              'td-placeable': isPlaceable(cols),
              'td-selecting': isSelecting(cols),
              'own-player1': ownPlayer1(cols)
            }"
            @click="onClick(cols)"
            class="td"
          >
            {{
              cols.value.slice(-1)[0]
                ? cols.value.slice(-1)[0].number
                : undefined
            }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="container">
      <div
        v-for="i in holdingPieces"
        :key="i.id"
        :class="{ 'box-selecting': boxSelecting(i) }"
        @click="click(i)"
        class="box"
      >
        {{ i.number }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase.js'

export default {
  props: {
    deepArray: {
      type: Object,
      required: true
    },

    docRef: {
      type: Function,
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

    boxSelecting(value) {
      return this.selecting === value
    },

    click(value) {
      value === this.selecting
        ? (this.selecting = undefined)
        : (this.selecting = value)
    },

    cloneDeep(value) {
      return JSON.parse(JSON.stringify(value))
    },

    placeableBoard(number) {
      /**
       * プレイス可能な現在のボードを返す
       * @type {Array}
       */
      if (!this.latestBoard.length) {
        return []
      }
      return this.latestBoard.filter((matrix) => {
        const latestValue = matrix.value ? matrix.value.slice(-1)[0] : undefined
        if (
          !latestValue ||
          ('number' in latestValue && latestValue.number < number)
        ) {
          return matrix
        }
      })
    },

    isSelecting(matrix) {
      /**
       * 選択中かどうかを判定する
       * @type {Boolean}
       */
      if (!this.holding) {
        return
      }
      if (this.holding.row === matrix.row && this.holding.col === matrix.col) {
        return true
      }
    },

    ownPlayer1(matrix) {
      const { value } = matrix
      if (!value.length || value.slice(-1)[0].player !== 'PLAYER_1') return
      return true
    },

    isPlaceable(matrix) {
      /**
       * プレイス可能かどうかを判定する
       * @type {Boolean}
       */
      const nextNumber = this.nextNumber

      if (nextNumber === undefined) {
        return
      }
      const is = this.placeableBoard(nextNumber).some(
        (a) => a.row === matrix.row && a.col === matrix.col
      )
      return is
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
      const { row, col, value } = payload

      if (!this.selecting && !this.holding && !value.length) {
        return
      }

      if (this.selecting) {
        // not placeable
        if (value.length) {
          if (value.slice(-1)[0].number >= this.selecting.number) {
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
          turn: this.turn
        })
      })
      this.turn++
    },

    place({ row, col }, update, board) {
      const placedBoard = this.getPlacedBoard({ row, col }, update, board)

      this.docRef().update({
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: placedBoard,
          turn: this.turn
        })
      })
      this.turn++
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
}
.box {
  margin: 5px;
  width: 100px;
  height: 100px;
  background: rgba(234, 0, 255, 0.425);
  border-radius: 10px;
  border: 1px solid #fff;
  cursor: pointer;
}
.box:hover {
  background: rgba(234, 0, 255, 0.199);
}

.box-selecting {
  background: rgba(234, 0, 255, 0.199);
  border: 1px solid rgba(252, 210, 24, 0.897);
}

.td {
  width: 100px;
  height: 100px;
  background: rgba(88, 38, 167, 0.356);
  border-radius: 10px;
  border: 1px solid #fff;
  text-align: center;
  font-size: 60px;
}
.td-placeable {
  animation: placeable 0.8s infinite alternate;
  border: 2px double #fff;
}
.td-placeable:hover {
  cursor: pointer;
  background: rgba(164, 5, 238, 0.411);
}
.td-selecting {
  border-color: yellow;
  background-color: rgba(255, 255, 255, 0.8);
}
@keyframes placeable {
  0% {
  }
  100% {
    box-shadow: 1px 1px 10px 5px rgba(238, 192, 67, 0.692);
    background-color: rgba(151, 150, 49, 0.3);
  }
}
.own-player1 {
  color: red;
}
</style>
