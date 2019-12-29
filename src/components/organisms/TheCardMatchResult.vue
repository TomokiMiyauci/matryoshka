<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ text }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="exit"><v-icon left>mdi-exit-to-app</v-icon>exit</v-btn>
      <v-divider></v-divider>
      <v-btn @click="playAgain" color="success"
        ><v-icon left>mdi-sword-cross</v-icon>Again</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
type Props = {
  title: string
  text: string
  playAgain: Function
}

export default createComponent({
  props: {
    title: {
      type: String,
      require: true,
      default: 'default Value'
    },

    text: {
      type: String,
      require: true
    },

    playAgain: {
      type: Function,
      require: true
    }
  },

  setup(props: Props, { root }) {
    const exit = (): void => {
      root.$router.push('/playrooms')
    }
    return { exit }
  }
})
</script>

<style scoped></style>
