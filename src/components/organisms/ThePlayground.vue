<template>
  <v-board
    :squares="latestBoard"
    :placeable="placeable"
    @click="onClick"
  ></v-board>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VBoard from '~/components/molecules/VBoard'

export default {
  components: {
    VBoard
  },

  computed: {
    ...mapGetters('game', ['latestBoard', 'willBeNextBoard', 'placeable'])
  },

  watch: {
    latestBoard() {
      this.ASSESS_STATUS()
    }
  },

  methods: {
    ...mapActions('player', ['ACTION']),
    ...mapActions('game', ['ASSESS_STATUS']),

    onClick(payload) {
      console.log(this.willBeNextBoard(payload))
      this.ACTION(payload)
      // this.addHistoryRecord(payload)
    }
  }
}
</script>

<style scoped></style>
