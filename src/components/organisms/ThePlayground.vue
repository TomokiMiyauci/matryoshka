<template>
  <v-board :squares="latestMove" @click="onClick"></v-board>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CHANGE } from '~/store/player/mutation-types'
import VBoard from '~/components/molecules/VBoard'

export default {
  components: {
    VBoard
  },

  computed: {
    ...mapGetters('game', ['latestMove'])
  },

  methods: {
    ...mapActions('player', [CHANGE]),
    ...mapActions('game', ['addHistoryRecord']),

    onClick(payload) {
      this.CHANGE()
      this.addHistoryRecord(payload)
    }
  }
}
</script>

<style scoped></style>
