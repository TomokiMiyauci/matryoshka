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
  onBeforeMount,
  watch
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
import { firestore as f } from '~/store'
import { getTerritory } from '~/functions/matrix'
import { isWin } from '~/functions/game'
import { useRandomStrategy } from '~/compositions/storategy'
type Props = {
  isYourTurn: boolean
  nextPlayer: Player
  enableEnemyHands: boolean
  enableTimer: boolean
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

    enableEnemyHands: {
      type: Boolean,
      default: false
    },

    enableTimer: {
      type: Boolean,
      default: false
    }
  },

  setup(props: Props, { root, emit }) {
    const playroomId = f.getPlayroomId
    const gameId = f.getGameId
    const gameRecordId = f.getGameRecordId
    const player: Player = 'PLAYER1'

    const {
      selectingPieceRef,
      nextValue,
      mutateMove,
      mutatePlace
    } = useSelectingPiece()

    const { getNextMove } = useRandomStrategy()

    const {
      gameRecordsRef,
      holdingPieces: holdingPiecesRef,
      enemyHands,
      setGameRecordsOfHoldingPieces,
      getPoppedPieces,
      getOpponentHands,
      getPlayerHands
    } = useHoldingPieces(player)

    const {
      boardRef,
      setGameRecordsOfBoard,
      matrixRef,
      generateMovedBoard,
      generatePlacedBoard
    } = useBoard(3)

    const {
      gameRecordCollectionReference,
      addGameRecord,
      setPlayroomId,
      setGameId
    } = useFirestoreGameRecord(playroomId, gameId, gameRecordId)

    onBeforeMount(async () => {
      const gameRecords = (await root.$bind(
        'gameRecord',
        gameRecordCollectionReference.value
          .limit(1)
          .orderBy('createdAt', 'desc')
      )) as GameRecord[]

      setGameRecordsOfHoldingPieces(gameRecords)
      setGameRecordsOfBoard(gameRecords)
    })

    const update = async (a: string, v: string) => {
      const { gameRecordCollectionReference } = useFirestoreGameRecord(a, v)

      const gameRecords = (await root.$bind(
        'gameRecord',
        gameRecordCollectionReference.value
          .limit(1)
          .orderBy('createdAt', 'desc')
      )) as GameRecord[]

      setGameRecordsOfHoldingPieces(gameRecords)
      setGameRecordsOfBoard(gameRecords)
      setPlayroomId(a)
      setGameId(v)
    }

    watch(
      computed(() => {
        return props.nextPlayer
      }),
      (now, prev) => {
        if (now === 'PLAYER2' && prev === 'PLAYER1') {
          setTimeout(() => {
            a()
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
        }
        console.log(now, prev)
      }
    )

    // init(props.game.rows, props.game.cols, 3, player)

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
        nextPlayer: props.nextPlayer
      }
    })

    const a = async () => {
      const b = getNextMove(enemyHands.value, boardRef.value, matrixRef.value)
      if (b === undefined) return
      const gameRecord: GameRecord = {
        board: b.board.flat(),
        player1Hands: getPlayerHands('PLAYER1'),
        player2Hands: b.hands
      }

      await addGameRecord(gameRecord)
    }

    const click = (piece: Piece) => {
      if (!props.isYourTurn) return
      mutatePlace(piece)
    }

    const onClick = async (element: Element) => {
      // console.log(element)

      if (!props.isYourTurn) return
      const { row, col } = element

      const b = mutateMove(element)
      if (!b) return

      switch (b[0]) {
        case 'PLACED': {
          const place = generatePlacedBoard({ row, col }, b[1])

          const gameRecord: GameRecord = {
            board: place,
            player1Hands: getPoppedPieces(b[1]),
            player2Hands: getOpponentHands()
          }
          // emit('action', player)

          await addGameRecord(gameRecord)
          break
        }
        case 'MOVED': {
          const place = generateMovedBoard(b[2], { row, col }, b[1])

          const gameRecord: GameRecord = {
            board: place,
            player1Hands: getPlayerHands('PLAYER1'),
            player2Hands: getPlayerHands('PLAYER2')
          }

          await addGameRecord(gameRecord)
          break
        }
      }

      const player1T = getTerritory({
        matrix: matrixRef.value,
        player: 'PLAYER1'
      })

      const win = isWin(player1T)

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
      gameRecordsRef,
      update,
      a,
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
