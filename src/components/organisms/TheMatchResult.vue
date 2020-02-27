<template>
  <v-card max-width="500px">
    <v-card-title>{{ message.title }}</v-card-title>
    <v-card-text>
      {{ message.text }}
    </v-card-text>

    <v-card-text v-if="!!message.title">
      <div
        :class="message.animation"
        style="display:flex;justify-content:center"
      >
        <v-icon size="250px" :color="message.iconColor"
          >{{ message.icon }}
        </v-icon>
      </div>
    </v-card-text>

    <v-card-text class="text-center display-1">
      Win {{ yourWins }} - {{ enemyWins }} Lose
    </v-card-text>
    <v-card-actions>
      <v-btn @click="exit"
        ><v-icon left>{{ exitIcon }}</v-icon
        >exit</v-btn
      >
      <v-divider></v-divider>
      <v-btn color="info" @click="$emit('ready')"
        ><v-icon left>{{ buttleIcon }}</v-icon
        >Again</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import {
  mdiCloud,
  mdiWhiteBalanceSunny,
  mdiUmbrella,
  mdiExitToApp,
  mdiSwordCross
} from '@mdi/js'

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
      type: String as () => Player,
      default: '',
      required: true
    },

    winner: {
      type: String as () => Player | 'DRAW' | 'NONE',
      default: 'NONE',
      required: true
    },

    yourWins: {
      type: Number,
      default: 0,
      required: true
    },

    enemyWins: {
      type: Number,
      default: 0,
      required: true
    }
  },

  setup(props: Props, { root }) {
    const message = computed(() => {
      switch (props.winner) {
        case 'NONE': {
          return { title: '', text: '', icon: '' }
        }

        case 'DRAW': {
          return {
            title: 'DRAW',
            text: 'The ability was equal.',
            icon: mdiCloud,
            iconColor: 'grey',
            animation: 'hover'
          }
        }

        default: {
          return props.player === props.winner
            ? {
                title: 'Win!',
                text: 'Great! You are the winner!',
                icon: mdiWhiteBalanceSunny,
                iconColor: 'orange',
                animation: 'spin'
              }
            : {
                title: 'Lose..',
                text: 'Ah... You are the loser.',
                icon: mdiUmbrella,
                iconColor: 'blue',
                animation: 'flutter'
              }
        }
      }
    })

    const exit = (): void => {
      root.$router.push('/')
    }
    return { exit, message, exitIcon: mdiExitToApp, buttleIcon: mdiSwordCross }
  }
})
</script>

<style lang="scss" scoped>
.spin {
  animation: spin 5s infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.flutter {
  animation: flutter 5s infinite alternate;
}

@keyframes flutter {
  50% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(-30deg);
  }
}

.hover {
  animation: hover ease-in 3s infinite;
}
@keyframes hover {
  50% {
    transform: translateY(15px);
  }
}
</style>
