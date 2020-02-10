<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ text }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="exit"><v-icon left>mdi-exit-to-app</v-icon>exit</v-btn>
      <v-divider></v-divider>
      <v-btn color="success" @click="$emit('ready')"
        ><v-icon left>mdi-sword-cross</v-icon>Again</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { Player } from '~/types/player'
type Props = {
  text: string
  player: Player
  winner: Player | 'NONE'
}

export default createComponent({
  props: {
    text: {
      type: String,
      require: true
    },

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
    const title = computed(() => {
      switch (props.winner) {
        case 'NONE': {
          return ''
        }

        case 'PLAYER1': {
          return props.player === 'PLAYER1' ? 'Win!' : 'Lose..'
        }

        case 'PLAYER2': {
          return props.player === 'PLAYER2' ? 'Win!' : 'Lose..'
        }
      }
    })
    const exit = (): void => {
      root.$router.push('/playrooms')
    }
    return { exit, title }
  }
})
</script>
