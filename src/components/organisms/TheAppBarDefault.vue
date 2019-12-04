<template>
  <v-app-bar app>
    <v-btn @click="click" absolute bottom fab>
      <v-icon>mdi-gamepad-round-up</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'
import {
  PLAYER_1,
  ASSIGN,
  ENTER_ROOM,
  CREATE_ROOM
} from '~/store/player/mutation-types'
export default {
  methods: {
    ...mapActions('player', [ASSIGN, ENTER_ROOM, CREATE_ROOM]),

    async click() {
      const docRef = await this.CREATE_ROOM()
      this.ENTER_ROOM(docRef.id)
      this.ASSIGN(PLAYER_1)
      this.$router.push(`/playrooms/${docRef.id}`)
    }
  }
}
</script>

<style scoped></style>
