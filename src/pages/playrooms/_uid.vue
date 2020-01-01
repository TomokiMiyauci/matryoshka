<template>
  <div>
    <the-playground
      :deep-array="latestGameOrEmpty"
      :doc-ref="docRef"
      :is-your-turn="isYourTurn"
      ref="playground"
    ></the-playground>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <the-card-match-result
        @ready="onReady"
        v-bind="cardProps"
      ></the-card-match-result>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase, { firestore } from '~/plugins/firebase.js'

export default {
  layout: 'playroom',

  components: {
    ThePlayground: () => import('~/components/organisms/ThePlayground.vue'),
    TheCardMatchResult: () =>
      import('~/components/organisms/TheCardMatchResult.vue')
  },

  async fetch({ store }) {
    await store.dispatch('game/bindGameRef')
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    ...mapGetters('playroom', ['id']),
    ...mapGetters('game', ['game', 'generateInitValue']),
    ...mapGetters('player', ['name']),

    cardProps() {
      return this.message
    },

    lastGame() {
      return this.game.slice(-1)[0]
    },

    lastGameId() {
      return this.lastGame.id
    },

    latestGame() {
      const lastGame = this.lastGame

      if ('readyPlayers' in lastGame && lastGame.readyPlayers.length === 2) {
        return lastGame
      } else if (this.game.length) {
        return this.game[this.game.length - 2]
      }
      return undefined
    },

    latestGameId() {
      const latestGame = this.latestGame
      if (!latestGame) return undefined
      return latestGame.id
    },

    readyPlayers() {
      return this.lastGame ? this.lastGame.readyPlayers : undefined
    },

    latestGameOrEmpty() {
      return this.latestGame ? this.latestGame : {}
    },

    round() {
      return this.game.length ? this.game.length : undefined
    },

    isYourTurn() {
      if (!this.latestGame || !this.name) return false

      return this.latestGame.nextPlayer === this.name
    },

    message() {
      if (!this.latestGame || !this.latestGame.winner) return undefined
      switch (this.latestGame.winner) {
        case 'DRAW': {
          return { title: 'Draw', text: 'It was a good match.' }
        }
        case this.name: {
          return { title: 'Win!', text: 'Great! You are the winner!' }
        }
        case this.name === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1': {
          return { title: 'Lose..', text: 'Ah... You are the loser.' }
        }
        default: {
          return undefined
        }
      }
    }
  },

  watch: {
    latestGame(val) {
      switch (val.winner) {
        case 'DRAW': {
          this.dialog = true
          break
        }

        case this.name: {
          this.dialog = true
          break
        }

        case this.name === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1': {
          this.dialog = true
          break
        }
      }
    },

    dialog(val) {
      if (!val) {
        this.init()
      }
    },

    readyPlayers(val) {
      if (
        val &&
        this.dialog &&
        this.lastGame.history.length === 1 &&
        val.length === 2
      ) {
        this.dialog = false
        this.init()
      }
    }
  },

  created() {
    this.onReady()
  },

  methods: {
    async onReady() {
      await firestore
        .collection('playrooms')
        .doc(this.id)
        .collection('games')
        .doc(this.lastGameId)
        .update({
          readyPlayers: firebase.firestore.FieldValue.arrayUnion(this.name)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },

    docRef(collectionName = 'playrooms') {
      return firestore
        .collection(collectionName)
        .doc(this.id)
        .collection('games')
        .doc(this.latestGameId)
    },

    init() {
      this.$refs.playground.initHoldingPieces(this.name)
    }
  }
}
</script>

<style scoped>
.card {
  position: absolute;
  right: 0;
}
</style>
