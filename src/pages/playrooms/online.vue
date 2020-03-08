<template>
  <div>
    <p>{{ game }}</p>
    <p>{{ gameRecord }}</p>
    <the-playground2
      :is-your-turn="isYourTurnRef"
      :next-player="nextPlayerRef"
      :game-record="gameRecord.data"
      :game-path="game.path"
      @action="doAction"
    />
    <v-btn color="success" @click="update">update</v-btn>

    <v-flash-circle style="position:absolute;top:10px;right:10px;" />
    <v-connection-loader :is-center="isStage('<=', 0)" />
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  onUnmounted,
  reactive,
  toRefs,
  watch,
  computed
} from '@vue/composition-api'
import { Player } from '~/types/player'
import VFlashCircle from '~/components/atoms/icons/VFlashCircle.vue'
import { playerStore, playStore } from '~/store'
import { subscribe } from '~/services/subscriber'
import firebase, { firestore } from '~/plugins/firebase'
import { Document } from '~/types/document'
import { Playroom } from '~/types/playroom'
import { usePlayroom } from '~/compositions/playroom'
import progress from '~/compositions/progress'
// import { wait } from '~/utils/time
import { useGame } from '~/compositions/game'
import { generatePieces } from '~/functions/piece'
import { generateShallow } from '~/functions/matrix'
import VConnectionLoader from '~/components/molecules/VConnectionLoader.vue'
import { Game } from '~/types/game'

export default createComponent({
  middleware: ['authenticator', 'house-keeper'],

  layout: 'plain',

  components: {
    VFlashCircle,
    VConnectionLoader,
    ThePlayground2: () => import('~/components/organisms/ThePlayground2.vue')
  },

  setup() {
    const { isStage, next } = progress(5)
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

    const gameRecord = reactive({
      id: '',
      data: undefined,
      path: ''
    })

    const { isYourTurnRef, nextPlayerRef } = useGame(
      toRefs(game).data,
      playerStore.player as Player
    )

    const { unsubscribe } = subscribe(
      playroom,
      firestore
        .collection('test')
        .limit(1)
        .orderBy('createdAt', 'desc')
    )

    const { peopleRef, orderRef } = usePlayroom(
      toRefs(playroom).data,
      playerStore.player as Player
    )

    console.log(JSON.stringify(playroom))

    watch(peopleRef, async (now, prev) => {
      console.log(111, prev)
      console.log(!!now, now!.length, peopleRef)
      if (!!now && now.length === 2) {
        next()
        if (playerStore.player === 'PLAYER1') {
          await createGame(
            orderRef.value === 'RANDOM' ? 'PLAYER1' : orderRef.value
          )
        }

        subscribe(
          game,
          firestore
            .doc(playroom.path)
            .collection('games')
            .orderBy('createdAt', 'desc')
            .limit(1)
        )
      }
    })

    watch(
      computed(() => game.path),
      async (now) => {
        if (!now) return
        if (playerStore.player === 'PLAYER1') {
          await createGameRecord()
        }
        subscribe(
          gameRecord,
          firestore
            .doc(playroom.path)
            .collection('games')
            .doc(game.id)
            .collection('gameRecords')
            .orderBy('createdAt', 'desc')
            .limit(1)
        )
      }
    )

    const createGame = (playFirst: Player) => {
      return firestore
        .doc(playroom.path)
        .collection('games')
        .add({
          rows: 3,
          cols: 3,
          nextPlayer: playFirst,
          playFirst,
          readyPlayers: ['PLAYER1'],
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const createGameRecord = () => {
      const shallowArray = generateShallow(3, 3)
      const player1Hands = generatePieces(3, 3, 3, 'PLAYER1')
      const player2Hands = generatePieces(3, 3, 3, 'PLAYER2')
      return firestore
        .doc(playroom.path)
        .collection('games')
        .doc(game.id)
        .collection('gameRecords')
        .add({
          board: shallowArray,
          player1Hands,
          player2Hands,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const doAction = async (payload: {
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

    const update = async () => {
      const data = await firestore
        .collection('test')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()

      console.log(data)

      data.forEach(async (result) => {
        console.log(result.data(), result.ref.path)
        await firestore.doc(result.ref.path).update({
          people: firebase.firestore.FieldValue.arrayUnion('greater_virginia')
        })
      })
    }

    onUnmounted(() => {
      unsubscribe()
      playerStore.removePlayer()
    })

    return {
      params: playStore.playroomPath,
      ...toRefs(playroom),
      game,
      gameRecord,
      isStage,
      update,
      isYourTurnRef,
      nextPlayerRef,
      doAction
    }
  }
})
</script>
