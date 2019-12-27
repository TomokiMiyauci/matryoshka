<template>
  <v-container>
    <h1 class="text-center">{{ whichTrun }}</h1>
    <v-row justify="center">
      <v-col cols="auto">
        <v-spinner v-if="!isYourTurn"></v-spinner>
        <v-timer v-else-if="isYourTurn" @up="$emit('up')"></v-timer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VSpinner from '~/components/atoms/VSpinner'
import VTimer from '~/components/molecules/VTimer'
export default {
  components: {
    VSpinner,
    VTimer
  },

  props: {
    isYourTurn: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    whichTrun() {
      return this.isYourTurn ? 'Your Turn' : `Opponent's turn`
    }
  }
}
</script>

<style scoped></style>
