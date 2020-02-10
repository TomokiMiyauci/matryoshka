<template>
  <v-card>
    <v-card-title>{{ message.title }}</v-card-title>
    <v-card-text>
      {{ message.text }}
    </v-card-text>
    <v-card-text class="text-center display-1">
      Win 11 - 10 Lose
    </v-card-text>
    <v-card-actions>
      <v-btn @click="exit"><v-icon left>mdi-exit-to-app</v-icon>exit</v-btn>
      <v-divider></v-divider>
      <v-btn color="info" @click="$emit('ready')"
        ><v-icon left>mdi-sword-cross</v-icon>Again</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { Player } from '~/types/player'
type Props = {
  player: Player
  winner: Player | 'NONE' | 'DRAW'
}

export default createComponent({
  props: {
    player: {
      type: String,
      default: ''
    },

    winner: {
      type: String,
      default: 'NONE'
    }
  },

  setup(props: Props, { root }) {
    const message = computed(() => {
      switch (props.winner) {
        case 'NONE': {
          return { title: '', text: '' }
        }

        case 'DRAW': {
          break
        }

        default: {
          return props.player === props.winner
            ? { title: 'Win!', text: 'Great! You are the winner!' }
            : { title: 'Lose..', text: 'Ah... You are the loser.' }
        }
      }
    })

    const exit = (): void => {
      root.$router.push('/playrooms')
    }
    return { exit, message }
  }
})
</script>
