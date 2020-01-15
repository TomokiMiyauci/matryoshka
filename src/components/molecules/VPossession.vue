<template>
  <div class="container">
    <div
      v-for="holdingPiece in holdingPieces"
      :key="holdingPiece.id"
      :class="bindClass(holdingPiece)"
      @click="$emit('click', holdingPiece)"
      class="box"
    >
      <v-doll :color="color" :width="calcWidth(holdingPiece)"></v-doll>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import VDoll from '~/components/atoms/VDoll.vue'
// eslint-disable-next-line no-unused-vars
import { Piece } from '~/types/piece'

type Props = {
  holdingPieces: Piece[]
  selecting: object
  player: string
}

export default createComponent({
  props: {
    holdingPieces: {
      type: Array,
      require: true
    },

    selecting: {
      type: Object,
      require: true
    },

    player: {
      type: String,
      require: true
    }
  },

  components: {
    VDoll
  },

  setup(props: Props) {
    const boxSelecting = (value: Piece) => {
      return props.selecting === value
    }

    const isPlayer1 = computed<boolean>(() => {
      return props.player === 'PLAYER_1'
    })

    const isPlayer2 = computed<boolean>(() => {
      return props.player === 'PLAYER_2'
    })

    const color = computed<string | undefined>(() => {
      if (isPlayer1.value) {
        return 'red'
      } else if (isPlayer2.value) {
        return 'blue'
      }
      return undefined
    })

    const calcWidth = (value: Piece): string => {
      const BASE_SIZE = 33
      return `${BASE_SIZE + value.value * BASE_SIZE}px`
    }

    const bindClass = (value: Piece) => {
      return {
        'box-selecting': boxSelecting(value),
        player1: isPlayer1,
        player2: isPlayer2
      }
    }

    return {
      bindClass,
      color,
      calcWidth
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.box {
  margin: 1px;
  width: 90px;
  height: 90px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-selecting {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(252, 210, 24, 0.897);
}
.player1 {
  color: rgba(223, 37, 37, 0.8);
}
.player2 {
  color: rgba(37, 71, 223, 0.8);
}
</style>
