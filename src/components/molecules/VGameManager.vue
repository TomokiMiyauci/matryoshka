<template>
  <div class="container">
    <div class="turn" :class="classStyle">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
type Props = {
  isYourTurn: Boolean
  player: string
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
    }
  },

  setup(props: Props) {
    const text = computed<string>(() => {
      return props.isYourTurn ? 'Your Turn ' : 'Opponent Turn'
    })

    const classStyle = computed<object>(() => {
      return {
        'your-turn-player1': props.isYourTurn && props.player === 'PLAYER_1',
        'your-turn-player2': props.isYourTurn && props.player === 'PLAYER_2'
      }
    })

    return {
      text,
      classStyle
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
