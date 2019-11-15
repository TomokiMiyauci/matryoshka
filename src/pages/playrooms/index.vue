<template>
  <div>
    <v-btn @click="click" fab>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-card
      v-for="playroom in playrooms"
      :key="playroom.id"
      @click="c(playroom)"
    >
      goto
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ENTER, PLAYER_1, PLAYER_2 } from '~/store/player/mutation-types'

export default {
  computed: {
    ...mapState('playroom', ['playrooms'])
  },
  created() {
    this.SUBSCRIBE()
  },

  methods: {
    ...mapActions('player', [ENTER]),
    ...mapActions('playroom', ['CREATE', 'SUBSCRIBE']),

    async click() {
      this.ENTER(PLAYER_1)
      const docRef = await this.CREATE()
      this.$router.push(`/playrooms/${docRef.id}`)
    },

    c(payload) {
      this.ENTER(PLAYER_2)
      this.$router.push(`/playrooms/${payload.id}`)
    }
  }
}
</script>

<style></style>
