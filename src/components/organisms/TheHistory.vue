<template>
  <div>
    <v-subheader>History</v-subheader>
    <p>Turn</p>
    <v-board
      v-for="(squares, index) in fullHistory"
      :key="index"
      :squares="squares.squares"
    ></v-board>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VBoard from '~/components/molecules/VBoard'

export default {
  components: {
    VBoard
  },

  computed: {
    ...mapGetters('game', ['fullHistory'])
  }
}
</script>

<style scoped></style>
