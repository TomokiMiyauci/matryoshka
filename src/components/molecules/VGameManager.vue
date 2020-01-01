<template>
  <div class="container">
    <div class="turn" :class="classStyle">{{ text }}</div>
    <v-turn-sign
      :player="player"
      :next-player="nextPlayer"
      ref="autohide"
    ></v-turn-sign>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref, watch } from '@vue/composition-api'
import VTurnSign from '~/components/molecules/VTurnSign.vue'

type Props = {
  isYourTurn: Boolean
  player: string
  nextPlayer: string
}

export default createComponent({
  props: {
    isYourTurn: {
      type: Boolean,
      require: true
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
  flex-wrap: wrap;
}
.turn {
  margin: 0 auto;
  border-radius: 30px;
  padding: 0px 8px;
  border: 4px double #aaa;
  transition: all 0.5s;
}
.your-turn-player1 {
  background-color: rgba(223, 37, 37, 0.8);
}
.your-turn-player2 {
  background-color: rgba(37, 71, 223, 0.8);
}
</style>
