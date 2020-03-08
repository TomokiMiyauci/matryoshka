<template>
  <div>
    <v-game-manager
      :enable-timer="enableTimer"
      v-bind="gameManagerProps"
      @timeup="defeat"
    ></v-game-manager>
    <v-hands
      v-if="enableEnemyHands"
      :is-your-hands="false"
      v-bind="enemyHandsProps"
    ></v-hands>
    <v-board v-bind="boardProps" @click="onClick"></v-board>
    <v-hands v-bind="possessionProps" @click="click"></v-hands>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'

import { playerStore } from '../../store'
import VBoard from '~/components/molecules/VBoard.vue'
import VHands from '~/components/molecules/VHands.vue'
import VGameManager from '~/components/molecules/VGameManager.vue'
import { useBoard } from '~/compositions/board'
import {
  useHoldingPieces,
  useSelectingPiece
} from '~/compositions/holding-piece'
import { Player } from '~/types/player'
import { Element, Piece, GameRecord } from '~/types/game-record'
import { useFirestoreGameRecord } from '~/repositories/game-record'
import { getTerritory } from '~/functions/matrix'
import { isWin } from '~/functions/game'
import { firestore } from '~/plugins/firebase'

type Props = {
  isYourTurn: boolean
  nextPlayer: Player
  enableEnemyHands: boolean
  enableTimer: boolean
  gamePath: string
  gameRecord: GameRecord
}

export default createComponent({
  components: {
    VGameManager,
    VBoard,
    VHands
  },

  props: {
    isYourTurn: {
      type: Boolean,
      required: true
    },

    nextPlayer: {
      type: String,
      required: true
    },

    gamePath: {
      type: String
    },

    enableEnemyHands: {
      type: Boolean,
      default: false
    },

    enableTimer: {
      type: Boolean,
      default: false
    },

    gameRecord: {
      type: Object
    }
  },

  setup(props: Props, { emit }) {
    const isWorkingTimer = ref(true)

    const player = playerStore.player as Player

    const {
      selectingPieceRef,
      nextValue,
      mutateMove,
      mutatePlace
    } = useSelectingPiece()

    const {
      holdingPieces: holdingPiecesRef,
      enemyHands,
      getOpponentHands,
      getPoppedPieces,
      getPlayerHands
    } = useHoldingPieces(
      computed(() => props.gameRecord),
      player
    )

    const { matrixRef, generateMovedBoard, generatePlacedBoard } = useBoard(
      computed(() => props.gameRecord),
      3
    )

    const { addGameRecord } = useFirestoreGameRecord()

    const boardProps = computed(() => {
      return {
        matrix: matrixRef.value,
        nextValue: nextValue.value,
        holding: selectingPieceRef.value
          ? selectingPieceRef.value.piece
          : undefined
      }
    })

    const possessionProps = computed(() => {
      return {
        holdingPieces: holdingPiecesRef.value,
        selectingPiece: selectingPieceRef.value
          ? selectingPieceRef.value.piece
          : undefined
      }
    })

    const enemyHandsProps = computed(() => {
      return {
        holdingPieces: enemyHands.value,
        selectingPiece: undefined
      }
    })

    const gameManagerProps = computed(() => {
      return {
        isYourTurn: props.isYourTurn,
        player,
        nextPlayer: props.nextPlayer,
        isWorkingTimer: isWorkingTimer.value
      }
    })

    const click = (piece: Piece) => {
      if (!props.isYourTurn) return
      mutatePlace(piece)
    }

    const onClick = async (element: Element) => {
      console.log(props.gamePath)
      console.log(element)

      const { row, col } = element

      if (
        !!element.pieces.length &&
        element.pieces.slice(-1)[0].owner !== playerStore.player
      ) {
        return
      }

      const actions = mutateMove(element)
      if (!actions) return

      switch (actions[0]) {
        case 'PLACED': {
          const place = generatePlacedBoard({ row, col }, actions[1])

          switch (playerStore.player) {
            case 'PLAYER1': {
              const gameRecord: GameRecord = {
                board: place,
                player1Hands: getPoppedPieces(actions[1]),
                player2Hands: getOpponentHands()
              }

              await addGameRecord(
                firestore.doc(props.gamePath).collection('gameRecords'),
                gameRecord
              )
              break
            }

            case 'PLAYER2': {
              const gameRecord: GameRecord = {
                board: place,
                player1Hands: getOpponentHands(),
                player2Hands: getPoppedPieces(actions[1])
              }

              await addGameRecord(
                firestore.doc(props.gamePath).collection('gameRecords'),
                gameRecord
              )
              break
            }
          }
          break
        }
        case 'MOVED': {
          const place = generateMovedBoard(actions[2], { row, col }, actions[1])

          const gameRecord: GameRecord = {
            board: place,
            player1Hands: getPlayerHands('PLAYER1'),
            player2Hands: getPlayerHands('PLAYER2')
          }

          await addGameRecord(
            firestore.doc(props.gamePath).collection('gameRecords'),
            gameRecord
          )
          break
        }
      }

      const player1T = getTerritory({
        matrix: matrixRef.value,
        player
      })

      const win = isWin(player1T)
      isWorkingTimer.value = false

      if (win) {
        emit('action', { type: 'SETTLE', winner: player })
      } else {
        emit('action', {
          type: 'PEND',
          nextPlayer: player === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1'
        })
      }
    }

    const defeat = () => {}

    // const defeat = () => {
    //   props.docRef.update({
    //     winner: (player === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1') as Player
    //   })

    //   firestore
    //     .collection('playrooms')
    //     .doc(root.$store.getters['playroom/id'])
    //     .collection('games')
    //     .add(generateInit(3, 3))
    // }

    return {
      defeat,
      click,
      onClick,
      matrixRef,
      boardProps,
      possessionProps,
      gameManagerProps,
      nextValue,
      holdingPiecesRef,
      selectingPieceRef,
      enemyHandsProps
    }
  }
})
</script>
