<template>
  <div>
    <v-game-manager v-bind="gameManagerProps"></v-game-manager>
    <v-board @click="onClick" v-bind="boardProps"></v-board>
    <v-possession v-bind="possessionProps" @click="click"></v-possession>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import firebase, { firestore } from '~/plugins/firebase.js'
import VBoard from '~/components/molecules/VBoard.vue'
import VPossession from '~/components/molecules/VPossession.vue'
import VGameManager from '~/components/molecules/VGameManager.vue'
import { generatePieces } from '~/compositions/piece'
import { reshape } from '~/compositions/matrix'
import { Piece, Element, PieceMotion, Player, Game } from '~/types/piece'

type Props = {
  game: Game
  docRef: any
  isYourTurn: boolean
}

type From = {
  row: number
  col: number
}

type SelectingPiece = {
  pieceMotion: PieceMotion
  from?: From
  piece: Piece
}

const usePlacePiece = () => {
  const placePieceRef = ref<SelectingPiece>()

  const mutate = (piece: Piece) => {
    if (
      placePieceRef.value === undefined ||
      placePieceRef.value.piece !== piece
    ) {
      placePieceRef.value = { pieceMotion: 'PLACE', piece }
    } else {
      clear()
    }
  }

  const clear = () => {
    placePieceRef.value = undefined
  }

  return { placePieceRef, mutate, clear }
}

const useMovePiece = () => {
  const movePieceRef = ref<SelectingPiece>()

  const mutate = (element: Element) => {
    const { row, col, value } = element
    const piece = value.slice(-1)[0]

    if (
      movePieceRef.value === undefined ||
      (movePieceRef.value.from &&
        movePieceRef.value.from.row === element.row &&
        movePieceRef.value.from.col === element.col)
    ) {
      movePieceRef.value = {
        pieceMotion: 'MOVE',
        from: { row, col },
        piece
      }
    } else {
      clear()
    }
  }

  const clear = () => {
    movePieceRef.value = undefined
  }

  return {
    movePieceRef,
    mutate,
    clear
  }
}

export const useHoldingPieces = () => {
  const holdingPiecesRef = ref<Piece[]>()

  const init = (row: number, col: number, inRow: number, player: Player) => {
    holdingPiecesRef.value = generatePieces(row, col, inRow, player)
  }

  const pop = (piece: Piece) => {
    if (holdingPiecesRef.value === undefined) return
    const index = holdingPiecesRef.value.findIndex((holdingPiece) => {
      return holdingPiece.id === piece.id && holdingPiece.value === piece.value
    })

    holdingPiecesRef.value.splice(index, 1)
  }

  return { holdingPiecesRef, init, pop }
}

const setup = () => {}

export default createComponent({
  components: {
    VGameManager,
    VBoard,
    VPossession
  },

  props: {
    game: {
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

  setup(props: Props, { root }) {
    const {
      placePieceRef,
      mutate: mutatePlacePiece,
      clear: clearPlacePiece
    } = usePlacePiece()

    const {
      movePieceRef,
      mutate: mutateMovePiece,
      clear: clearMovePiece
    } = useMovePiece()

    const { holdingPiecesRef, init, pop } = useHoldingPieces()
    const player: Player = root.$store.getters['player/name']

    init(props.game.rows, props.game.cols, 3, player)
    const matrix = computed(() => {
      return reshape(props.game.history.slice(-1)[0].squares, props.game.rows)
    })

    const nextValue = computed(() => {
      const a = placePieceRef.value || movePieceRef.value

      if (a === undefined) return
      return a.piece.value
    })

    const boardProps = computed(() => {
      return {
        matrix: matrix.value,
        nextValue: nextValue.value,
        holding: movePieceRef.value ? movePieceRef.value.piece : undefined
      }
    })

    const possessionProps = computed(() => {
      return {
        holdingPieces: holdingPiecesRef.value,
        selecting: placePieceRef.value ? placePieceRef.value.piece : undefined,
        player
      }
    })

    const gameManagerProps = computed(() => {
      return {
        isYourTurn: props.isYourTurn,
        player,
        nextPlayer: 'PLAYER_1'
      }
    })

    const click = (piece: Piece) => {
      if (!props.isYourTurn) return
      if (movePieceRef.value) {
        clearMovePiece()
      }
      mutatePlacePiece(piece)
    }

    const onClick = (element: Element) => {
      if (!props.isYourTurn) return
      const { row, col, value } = element

      if (
        placePieceRef.value === undefined &&
        movePieceRef.value === undefined &&
        !value.length
      ) {
        return
      }

      if (
        placePieceRef.value !== undefined &&
        placePieceRef.value.pieceMotion === 'PLACE'
      ) {
        if (
          !!value.length &&
          value.slice(-1)[0].value >= placePieceRef.value.piece.value
        )
          return

        const matrix = reshape(
          props.game.history.slice(-1)[0].squares,
          props.game.rows
        )

        const cloneMatrix = cloneDeep(matrix)
        cloneMatrix[row][col].value.push(placePieceRef.value.piece)

        props.docRef().update({
          history: firebase.firestore.FieldValue.arrayUnion({
            squares: cloneMatrix.flat(),
            turn: 1,
            player
          }),
          nextPlayer: player === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
        })

        pop(placePieceRef.value.piece)
        clearPlacePiece()
      } else if (
        movePieceRef.value !== undefined &&
        movePieceRef.value.from !== undefined &&
        movePieceRef.value.pieceMotion === 'MOVE'
      ) {
        const { piece, from } = movePieceRef.value
        if (!value.length || value.slice(-1)[0].value < piece.value) {
          const matrix = reshape(
            props.game.history.slice(-1)[0].squares,
            props.game.rows
          )

          const cloneMatrix = cloneDeep(matrix)
          cloneMatrix[row][col].value.push(movePieceRef.value.piece)
          const { row: frow, col: fcol } = from
          cloneMatrix[frow][fcol].value.pop()

          props.docRef().update({
            history: firebase.firestore.FieldValue.arrayUnion({
              squares: cloneMatrix.flat(),
              turn: 1,
              player
            }),
            nextPlayer: player === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
          })
        }
        // else {
        // }

        clearMovePiece()
      } else {
        if (value.slice(-1)[0].player !== player) return
        mutateMovePiece(element)
      }
    }

    return {
      init,
      click,
      onClick,
      boardProps,
      possessionProps,
      gameManagerProps
    }
  }
})
</script>

<style></style>
