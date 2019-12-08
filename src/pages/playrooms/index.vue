<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-subheader>Looking for opponents</v-subheader>
        <v-alert v-show="!canPlay" type="info">
          There are currently no rooms available for competition. You can create
          a new room at the push
          <v-icon>mdi-gamepad-round-up</v-icon>.
        </v-alert>
        <v-row
          justify="start"
          align-content="center"
          align-content-xl="start"
          justify-xl="start"
          justify-sm="start"
        >
          <v-col
            v-for="playroom in waitingPlayrooms"
            :key="playroom.id"
            cols="auto"
          >
            <v-card-playroom
              @click="goto(playroom)"
              :playroom="playroom"
            ></v-card-playroom>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-subheader>In Battle</v-subheader>
        <v-alert type="info">
          The following rooms are currently in play. You can watch it.
        </v-alert>
        <v-row justify="start" align-content="start">
          <v-col
            v-for="playroom in competingPlayrooms"
            :key="playroom.id"
            cols="auto"
          >
            <v-card @click="goto(playroom)" width="140px" height="140px">
              <v-avatar-with-name name="aaa"></v-avatar-with-name>
              <v-avatar-with-name
                name="aaa"
                style="position:absolute;right:0;bottom:0;"
                reverse
              ></v-avatar-with-name>

              <v-playroom-tag :text="playroom.id | hashing"> </v-playroom-tag>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  PLAYER_2,
  ASSIGN,
  ENTER_ROOM,
  CREATE_ROOM
} from '~/store/player/mutation-types'
import VAvatarWithName from '~/components/molecules/VAvatarWithName'

export default {
  components: {
    VAvatarWithName,
    VCardPlayroom: () => import('~/components/molecules/VCardPlayroom'),
    VPlayroomTag: () => import('~/components/atoms/VPlayroomTag')
  },

  filters: {
    hashing(val) {
      return `#${val.substr(0, 3)}`
    }
  },

  computed: {
    ...mapGetters('playroom', [
      'waitingPlayrooms',
      'numberOfWaitingPlayrooms',
      'competingPlayrooms'
    ]),

    canPlay() {
      return this.numberOfWaitingPlayrooms > 0
    }
  },

  created() {
    this.SUBSCRIBE()
  },

  methods: {
    ...mapActions('player', [ASSIGN, ENTER_ROOM, CREATE_ROOM]),
    ...mapActions('playroom', ['SUBSCRIBE']),
    ...mapActions('game', ['bindGameRef']),

    goto(payload) {
      this.ENTER_ROOM(payload.id)
      this.ASSIGN(PLAYER_2)
      this.$router.push(`/playrooms/${payload.id}`)
    }
  }
}
</script>

<style></style>
