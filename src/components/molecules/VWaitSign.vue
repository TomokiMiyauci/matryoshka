<template>
  <v-container>
    <h1 class="text-center">{{ whichTrun }}</h1>

    <v-row justify="center">
      <v-col cols="auto">
        <v-spinner v-show="!isYourTurn"></v-spinner>
        <v-timer v-show="isYourTurn"></v-timer>
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
