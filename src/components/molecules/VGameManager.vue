<template>
  <div class="container">
    <div class="turn" :class="classStyle">{{ text }}</div>
    <v-turn-sign
      ref="autohide"
      :player="player"
      :next-player="nextPlayer"
    ></v-turn-sign>
    <div v-if="enableTimer" class="turn-manager">
      <transition name="fade-transition" mode="out-in">
        <v-timer
          v-if="isYourTurn"
          ref="timer"
          count="30"
          @timeup="$emit('timeup')"
        >
        </v-timer>
        <v-bouncing-loader v-else></v-bouncing-loader>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref, watch } from '@vue/composition-api'
import VTimer from '~/components/molecules/VTimer.vue'
import VBouncingLoader from '~/components/molecules/VBouncingLoader.vue'
import VTurnSign from '~/components/molecules/VTurnSign.vue'

type Props = {
  isYourTurn: Boolean
  enableTimer: Boolean
  player: string
  nextPlayer: string
}

export default createComponent({
  props: {
    isYourTurn: {
      type: Boolean,
      require: true
    },

    enableTimer: {
      type: Boolean,
      default: false
    },

    player: {
      type: String,
      require: true
    },

    nextPlayer: {
      type: String,
      require: true
    }
  },

  components: {
    VTimer,
    VBouncingLoader,
    VTurnSign
  },

  setup(props: Props) {
    const text = computed<string>(() => {
      return props.isYourTurn ? 'Your Turn ' : 'Enemy Turn'
    })

    const classStyle = computed<object>(() => {
      return {
        'your-turn-player1': props.isYourTurn && props.player === 'PLAYER_1',
        'your-turn-player2': props.isYourTurn && props.player === 'PLAYER_2'
      }
    })

    watch(
      () => props.isYourTurn,
      () => {
        if (!autohide) return
        autohide.value.show()
      },
      {
        lazy: true
      }
    )

    const autohide = ref<any>()

    return {
      text,
      classStyle,
      autohide
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1vh;
}

.turn {
  margin: 0 auto;
  padding: 0 8px;
  border: 4px double #aaa;
  border-radius: 30px;
  transition: all 0.5s;
}

.your-turn-player1 {
  background-color: rgba(223, 37, 37, 0.8);
}

.your-turn-player2 {
  background-color: rgba(37, 71, 223, 0.8);
}

.turn-manager {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
}
</style>
