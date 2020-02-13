<template>
  <div style="height: 100%;">
    <template v-if="isReady">
      <the-playground
        ref="playroom"
        :enable-timer="true"
        :next-player="nextPlayerRef"
        :is-your-turn="isYourTurnRef"
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
          :winner="winnerRef"
          :your-wins="yourWinsRef"
          :enemy-wins="enemyWinsRef"
          @ready="onReady"
        ></the-match-result>
      </v-dialog>
    </template>
    <template v-else>
      <div class="text-center round">Round {{ roundRef }}</div>
      <v-ready-go :is-ready="!isLoading" @ready="onLoad"></v-ready-go>
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
import firebase, { firestore } from '~/plugins/firebase'
import { generateShallow } from '~/functions/matrix'
import { generatePieces } from '~/functions/piece'
import { Document } from '~/types/document'
import { Playroom } from '~/types/playroom'
import { Game } from '~/types/game'
import { usePlayroom } from '~/compositions/playroom'
export default createComponent({
  layout: 'playroom',
  components: {
    ThePlayground,
    VReadyGo,
    TheMatchResult: () => import('~/components/organisms/TheMatchResult.vue')
  },
  setup() {
    const playroom = reactive<Document<Playroom>>({
      id: '',
      data: undefined,
      path: ''
    })

    const game = reactive<Document<Game>>({
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

    const { yourWinsRef, enemyWinsRef, roundRef } = usePlayroom(
      toRefs(playroom).data,
      'PLAYER1'
    )

    const { playroomCollectionReference } = useFirestorePlayroom()

    const { isYourTurnRef, nextPlayerRef, winnerRef } = useGame(
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

    watch(winnerRef, (now) => {
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
      winner: Game['winner']
    }) => {
      switch (payload.type) {
        case 'SETTLE': {
          await firestore.doc(game.path).update({
            winner: payload.winner
          })
          countUp(payload.winner)
          break
        }
        case 'PEND': {
          await firestore.doc(game.path).update({
            nextPlayer:
              nextPlayerRef.value === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1'
          })
          break
        }
      }
    }

    const countUp = (winner: Game['winner']) => {
      switch (winner) {
        case 'PLAYER1': {
          firestore.doc(playroom.path).update({
            round: firebase.firestore.FieldValue.increment(1),
            player1Wins: firebase.firestore.FieldValue.increment(1)
          })
          break
        }
        case 'PLAYER2': {
          firestore.doc(playroom.path).update({
            round: firebase.firestore.FieldValue.increment(1),
            player2Wins: firebase.firestore.FieldValue.increment(1)
          })
          break
        }
        case 'DRAW': {
          firestore.doc(playroom.path).update({
            round: firebase.firestore.FieldValue.increment(1),
            draws: firebase.firestore.FieldValue.increment(1)
          })
          break
        }
      }
    }

    const onReady = async () => {
      await createGame()

      console.log(JSON.stringify(game))

      const { createGameRecord } = useFirestoreGameRecord()

      const shallowArray = generateShallow(3, 3)
      const player1Hands = generatePieces(3, 3, 3, 'PLAYER1')
      const player2Hands = generatePieces(3, 3, 3, 'PLAYER2')
      await createGameRecord(firestore.doc(game.path), {
        board: shallowArray,
        player1Hands,
        player2Hands
      })

      progress.isLoading = true
      progress.isReady = false
      progress.isGameEnd = false
      setTimeout(() => {
        progress.isLoading = false
      }, 2000)
    }

    const onLoad = () => {
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
      onLoad,
      onReady,
      playroom,
      onTurnEnd,
      game,
      nextPlayerRef,
      winnerRef,
      isYourTurnRef,
      player: 'PLAYER1',
      yourWinsRef,
      enemyWinsRef,
      roundRef
    }
  }
})
</script>

<style lang="scss" scoped>
.round {
  position: absolute;
  top: 5%;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  color: grey;
  font-size: 10vmin;
}
</style>
