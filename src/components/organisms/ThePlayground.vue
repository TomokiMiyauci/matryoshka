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
import {
  createComponent,
  computed,
  watch,
  reactive,
  toRefs,
  ref
} from '@vue/composition-api'

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
import { useRandomStrategy } from '~/compositions/storategy'
import { subscribe } from '~/services/subscriber'
import { firestore } from '~/plugins/firebase'

type Props = {
  isYourTurn: boolean
  nextPlayer: Player
  enableEnemyHands: boolean
  enableTimer: boolean
  gamePath: string
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
    }
  },

  setup(props: Props, { emit }) {
    const gameRecord = reactive({
      id: '',
      data: undefined,
      path: ''
    })

    // watch(
    //   computed(() => props.playroomPath),
    //   (now) => {
    //     if (!now) return

    //     subscribe(game, firestore.doc(props.playroomPath).collection('game'))
    //   }
    // )

    watch(
      computed(() => props.gamePath),
      (now) => {
        if (!now) return

        subscribe(
          gameRecord,
          firestore.doc(props.gamePath).collection('gameRecord')
        )

        // progress.isLoading = false
      }
    )

    const isWorkingTimer = ref(true)

    const player: Player = 'PLAYER1'

    const {
      selectingPieceRef,
      nextValue,
      mutateMove,
      mutatePlace
    } = useSelectingPiece()

    const { getNextMove } = useRandomStrategy()

    const {
      holdingPieces: holdingPiecesRef,
      enemyHands,
      getPoppedPieces,
      getOpponentHands,
      getPlayerHands
    } = useHoldingPieces(toRefs(gameRecord).data, player)

    const {
      boardRef,
      matrixRef,
      generateMovedBoard,
      generatePlacedBoard
    } = useBoard(toRefs(gameRecord).data, 3)

    const { addGameRecord } = useFirestoreGameRecord()

    watch(
      computed(() => {
        return props.nextPlayer
      }),
      (now, prev) => {
        if (now === 'PLAYER2' && prev === 'PLAYER1') {
          setTimeout(async () => {
            await nextGame()
            const player2 = getTerritory({
              matrix: matrixRef.value,
              player: 'PLAYER2'
            })

            const win = isWin(player2)

            if (win) {
              emit('action', { type: 'SETTLE', winner: 'PLAYER2' })
            } else {
              emit('action', { type: 'PEND', nextPlayer: 'PLAYER1' })
            }
          }, 3000)
        } else {
          isWorkingTimer.value = true
        }
        console.log(now, prev)
      }
    )

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

    const nextGame = async () => {
      const nextMove = getNextMove(
        enemyHands.value,
        boardRef.value,
        matrixRef.value
      )
      if (nextMove === undefined) return
      const gameRecord: GameRecord = {
        board: nextMove.board.flat(),
        player1Hands: getPlayerHands('PLAYER1'),
        player2Hands: nextMove.hands
      }

      await addGameRecord(
        firestore.doc(props.gamePath).collection('gameRecord'),
        gameRecord
      )
    }

    const click = (piece: Piece) => {
      if (!props.isYourTurn) return
      mutatePlace(piece)
    }

    const onClick = async (element: Element) => {
      // console.log(element)

      if (!props.isYourTurn) return
      const { row, col } = element

      const actions = mutateMove(element)
      if (!actions) return

      switch (actions[0]) {
        case 'PLACED': {
          const place = generatePlacedBoard({ row, col }, actions[1])

          const gameRecord: GameRecord = {
            board: place,
            player1Hands: getPoppedPieces(actions[1]),
            player2Hands: getOpponentHands()
          }
          // emit('action', player)

          await addGameRecord(
            firestore.doc(props.gamePath).collection('gameRecord'),
            gameRecord
          )
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
            firestore.doc(props.gamePath).collection('gameRecord'),
            gameRecord
          )
          break
        }
      }

      const player1T = getTerritory({
        matrix: matrixRef.value,
        player: 'PLAYER1'
      })

      const win = isWin(player1T)
      isWorkingTimer.value = false

      if (win) {
        emit('action', { type: 'SETTLE', winner: 'PLAYER1' })
      } else {
        emit('action', { type: 'PEND', nextPlayer: 'PLAYER1' })
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
      gameRecord,
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
