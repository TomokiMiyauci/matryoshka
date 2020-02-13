<template>
  <v-card>
    <v-card-title>{{ message.title }}</v-card-title>
    <v-card-text>
      {{ message.text }}
    </v-card-text>
    <v-card-text class="text-center display-1">
      Win {{ yourWins }} - {{ enemyWins }} Lose
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
import { Playroom } from '~/types/playroom'

type Props = {
  player: Player
  winner: Player | 'NONE' | 'DRAW'
  yourWins: Playroom['player1Wins']
  enemyWins: Playroom['player2Wins']
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
    },

    yourWins: {
      type: Number,
      default: 0
    },

    enemyWins: {
      type: Number,
      default: 0
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
