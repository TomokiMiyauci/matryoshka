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
import {
  generatePieces,
  useHoldingPieces,
  usePlacePiece,
  useMovePiece
} from '~/compositions/piece'
import { reshape } from '~/compositions/matrix'
import { Piece, Element, Player, Game } from '~/types/piece'

type Props = {
  game: Game
  docRef: any
  isYourTurn: boolean
}

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

    const selectingPiece = computed(() => {
      return placePieceRef.value || movePieceRef.value
    })

    const nextValue = computed(() => {
      if (selectingPiece.value === undefined) return
      return selectingPiece.value.piece.value
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
        nextPlayer: props.game.nextPlayer
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

      if (selectingPiece.value === undefined) return

      if (
        placePieceRef.value !== undefined &&
        placePieceRef.value.pieceMotion === 'PLACE'
      ) {
        if (
          !!value.length &&
          value.slice(-1)[0].value >= placePieceRef.value.piece.value
        )
          return

        const cloneMatrix = cloneDeep(matrix.value)
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
          const cloneMatrix = cloneDeep(matrix.value)
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
