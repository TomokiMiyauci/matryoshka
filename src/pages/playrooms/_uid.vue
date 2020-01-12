<template>
  <div>
    <the-playground
      :game="latestGame"
      :doc-ref="docRef"
      :is-your-turn="isYourTurn"
      ref="playground"
    ></the-playground>

    <v-dialog
      :value="dialogRef"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <the-card-match-result
        @ready="onReady"
        v-bind="message"
      ></the-card-match-result>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  computed,
  watch,
  onBeforeMount
} from '@vue/composition-api'
import firebase, { firestore } from '~/plugins/firebase.js'
import { Player, Game } from '~/types/piece'
import { useDialog } from '~/compositions/dialog'

export default createComponent({
  layout: 'playroom',

  components: {
    ThePlayground: () => import('~/components/organisms/ThePlayground.vue'),
    TheCardMatchResult: () =>
      import('~/components/organisms/TheCardMatchResult.vue')
  },

  setup(_, { root }) {
    const { dialogRef, show, hide } = useDialog()
    // ;(async () => {
    //   await root.$store.dispatch('game/bindGameRef')
    //   // dResultを使った処理
    // })()

    const games = computed<Game[]>(() => root.$store.getters['game/game'])
    const lastGame = computed<Game>(() => games.value.slice(-1)[0])
    const lastGameId = computed(() => lastGame.value.id)
    const latestGame = computed<Game>(() => {
      if (
        // 'readyPlayers' in lastGame.value &&
        lastGame.value.readyPlayers.length >= 2
      ) {
        return lastGame.value
      } else if (games.value.length === 1) {
        return games.value[0]
      }
      return games.value[games.value.length - 2]
    })

    const latestGameId = computed(() => latestGame.value.id)
    const player = computed<Player>(() => root.$store.getters['player/name'])
    const playroomId = computed<string>(
      () => root.$store.getters['playroom/id']
    )

    const isYourTurn = computed(() => {
      return latestGame.value.nextPlayer === player.value
    })

    const docRef = computed(() => {
      return firestore
        .collection('playrooms')
        .doc(playroomId.value)
        .collection('games')
        .doc(lastGameId.value)
    })

    const message = computed(() => {
      switch (latestGame.value.winner) {
        case 'DRAW': {
          return { title: 'Draw', text: 'It was a good match.' }
        }
        case player.value: {
          return { title: 'Win!', text: 'Great! You are the winner!' }
        }
        case player.value === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1': {
          return { title: 'Lose..', text: 'Ah... You are the loser.' }
        }
        default: {
          return undefined
        }
      }
    })

    const playground = ref<any>()
    const init = () => {
      playground.value.init(3, 3, 3, player.value)
    }

    const onReady = async () => {
      await docRef.value
        .update({
          readyPlayers: firebase.firestore.FieldValue.arrayUnion(player.value)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }

    watch(latestGame, (latestGame) => {
      switch (latestGame.winner) {
        case undefined: {
          break
        }

        default: {
          show()
        }
      }
    })

    watch(dialogRef, (next, prev) => {
      if (!prev && next) {
        init()
      }
    })

    watch(lastGame, (next, prev) => {
      if (next.readyPlayers.length === 2) {
        hide()
      }
    })

    onReady()

    return {
      dialogRef,
      show,
      hide,
      latestGame,
      docRef,
      isYourTurn,
      message,
      onReady,
      playground
    }
  }
})
</script>

<style scoped>
.card {
  position: absolute;
  right: 0;
}
</style>
