<template>
  <div style="height: 100%;">
    <template v-if="isReady">
      <the-playground
        ref="playroom"
        :enable-timer="true"
        :next-player="nextPlayer"
        :is-your-turn="isYourTurn"
        :game-path="game.path"
        @action="onTurnEnd"
      ></the-playground>

      <v-dialog
        :value="isGameEnd"
        scrollable
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <the-match-result
          :player="player"
          :winner="winner"
          @ready="onReady"
        ></the-match-result>
      </v-dialog>
    </template>
    <template v-else>
      <v-ready-go :is-ready="!isLoading" @ready="aaa"></v-ready-go>
    </template>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  toRefs,
  onBeforeMount,
  watch
} from '@vue/composition-api'
import VReadyGo from '~/components/atoms/VReadyFight.vue'
import { useFirestoreGameRecord } from '~/repositories/game-record'
import ThePlayground from '~/components/organisms/ThePlayground.vue'
import { initialize, createGame } from '~/services/firestore'
import { useGame } from '~/compositions/game'
import { useFirestorePlayroom } from '~/repositories/playroom'
import { subscribe } from '~/services/subscriber'
import { firestore } from '~/plugins/firebase'
import { generateShallow } from '~/functions/matrix'
import { generatePieces } from '~/functions/piece'
export default createComponent({
  layout: 'playroom',
  components: {
    ThePlayground,
    VReadyGo,
    TheMatchResult: () => import('~/components/organisms/TheMatchResult.vue')
  },
  setup() {
    const playroom = reactive({
      id: '',
      data: undefined,
      path: ''
    })

    const game = reactive({
      id: '',
      data: undefined,
      path: ''
    })

    watch(
      () => playroom.path,
      (now) => {
        if (!now) return

        subscribe(game, firestore.doc(playroom.path).collection('game'))
      }
    )

    const progress = reactive({
      isLoading: true,
      isReady: false,
      isGameEnd: false
    })

    // const { boardRef, matrixRef } = useBoard(toRefs(gameRecord).data)

    const { playroomCollectionReference } = useFirestorePlayroom()

    const { isYourTurn, nextPlayer, winner } = useGame(
      toRefs(game).data,
      'PLAYER1'
    )

    // watch(
    //   () => playroom.path,
    //   (now) => {
    //     if (!now) return

    //     subscribe(game, firestore.doc(playroom.path).collection('game'))
    //   }
    // )

    watch(winner, (now) => {
      switch (now) {
        case 'PLAYER1': {
          progress.isGameEnd = true
        }
      }
    })

    // watch(
    //   () => game.path,
    //   (now) => {
    //     if (!now) return

    //     subscribe(gameRecord, firestore.doc(game.path).collection('gameRecord'))
    //     console.log(1)

    //     progress.isLoading = false
    //   }
    // )

    onBeforeMount(async () => {
      await initialize()
      bind()
    })

    const onTurnEnd = async (payload: {
      type: 'SETTLE' | 'PEND'
      winner: string
    }) => {
      switch (payload.type) {
        case 'SETTLE': {
          await firestore.doc(game.path).update({
            winner: payload.winner
          })
          break
        }
        case 'PEND': {
          await firestore.doc(game.path).update({
            nextPlayer: nextPlayer.value === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1'
          })
          break
        }
      }
    }

    const onReady = async () => {
      await createGame()

      console.log(JSON.stringify(game))

      const { createGameRecord: cgr } = useFirestoreGameRecord()

      const shallowArray = generateShallow(3, 3)
      const player1Hands = generatePieces(3, 3, 3, 'PLAYER1')
      const player2Hands = generatePieces(3, 3, 3, 'PLAYER2')
      await cgr(firestore.doc(game.path), {
        board: shallowArray,
        player1Hands,
        player2Hands
      })

      // playroom.value.update(firestore.playroomId, firestore.gameId)

      progress.isLoading = true
      progress.isReady = false
      progress.isGameEnd = false
      setTimeout(() => {
        progress.isLoading = false
      }, 2000)
    }

    const aaa = () => {
      progress.isReady = true
    }
    const bind = () => {
      subscribe(
        playroom,
        playroomCollectionReference.value.limit(1).orderBy('createdAt', 'desc')
      )
    }
    setTimeout(() => {
      progress.isLoading = false
    }, 2000)

    return {
      ...toRefs(progress),
      aaa,
      onReady,
      playroom,
      onTurnEnd,
      game,
      nextPlayer,
      winner,
      isYourTurn,
      player: 'PLAYER1'
    }
  }
})
</script>
