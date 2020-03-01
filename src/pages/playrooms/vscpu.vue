<template>
  <div style="height: 100%;">
    <v-dialog
      :value="stage === 0 || stage === 6"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <the-game-settings :is-first="!playroom.id" @click="ccc" />
    </v-dialog>

    <template v-if="stage === 1">
      <div
        style="display:flex;align-items:center;justify-content: center;height:100%;"
      >
        <v-icon-connect :size="300" />
      </div>
    </template>

    <template v-else-if="stage === 2 || stage === 3">
      <div class="text-center round">Round {{ roundRef }}</div>
      <v-ready-go :is-ready="stage === 3" @ready="next()"></v-ready-go>
    </template>

    <template v-else-if="stage >= 4">
      <the-playground
        ref="playroom"
        :enable-timer="true"
        :next-player="nextPlayerRef"
        :is-your-turn="isYourTurnRef"
        :game-path="game.path"
        @action="onTurnEnd"
      ></the-playground>

      <v-dialog
        :value="stage === 5"
        persistent
        max-width="500px"
        transition="dialog-transition"
      >
        <the-match-result
          :player="player"
          :winner="winnerRef"
          :your-wins="yourWinsRef"
          :enemy-wins="enemyWinsRef"
          @ready="onReady"
          @setting="next()"
        ></the-match-result>
      </v-dialog>
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, toRefs, watch } from '@vue/composition-api'
import VIconConnect from '~/components/atoms/VIconConnect.vue'
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
import TheGameSettings from '~/components/organisms/TheGameSettings.vue'
import progres from '~/compositions/progress'
export default createComponent({
  layout: 'playroom',
  components: {
    ThePlayground,
    VReadyGo,
    VIconConnect,
    TheGameSettings,
    TheMatchResult: () => import('~/components/organisms/TheMatchResult.vue')
  },
  setup() {
    const ccc = async (order: 'RANDOM' | 'FIRST' | 'SECOND') => {
      const yourOrder = (order: 'RANDOM' | 'FIRST' | 'SECOND') => {
        switch (order) {
          case 'RANDOM': {
            return 'RANDOM'
          }
          case 'FIRST': {
            return 'PLAYER1'
          }
          case 'SECOND': {
            return 'PLAYER2'
          }
        }
      }
      if (playroom.id) {
        prev()
        await firestore.doc(playroom.path).update({
          order: yourOrder(order)
        })
        return
      }
      next()

      await init(yourOrder(order))
      next()
    }

    const { stage, goToStage, next, prev } = progres(6)

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

    watch(stage, (now) => {
      if (now === 2) {
        setTimeout(() => {
          next()
        }, 2000)
      }
    })

    watch(
      () => playroom.path,
      (now) => {
        if (!now) return

        subscribe(game, firestore.doc(playroom.path).collection('game'))
      }
    )

    const { yourWinsRef, enemyWinsRef, roundRef } = usePlayroom(
      toRefs(playroom).data,
      'PLAYER1'
    )

    const { playroomCollectionReference } = useFirestorePlayroom()

    const { isYourTurnRef, nextPlayerRef, winnerRef } = useGame(
      toRefs(game).data,
      'PLAYER1'
    )

    watch(winnerRef, (now) => {
      switch (now) {
        case 'PLAYER1': {
          next()
          break
        }

        case 'PLAYER2': {
          next()
          break
        }
      }
    })

    const init = async (order: Playroom['order']) => {
      await initialize(order)
      bind()
    }

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
      goToStage(1)
      await createGame('PLAYER1')

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

      next()
    }

    const bind = () => {
      subscribe(
        playroom,
        playroomCollectionReference.value.limit(1).orderBy('createdAt', 'desc')
      )
    }

    return {
      next,
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
      roundRef,
      ccc,
      stage
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
