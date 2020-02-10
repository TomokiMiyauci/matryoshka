<template>
  <div class="container">
    <div
      v-for="holdingPiece in holdingPieces"
      :key="holdingPiece.id"
      :class="bindClass(holdingPiece)"
      class="box"
      @click="$emit('click', holdingPiece)"
    >
      <v-doll :color="color" :width="calcWidth(holdingPiece)"></v-doll>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import VDoll from '~/components/atoms/VDoll.vue'
import { Piece } from '~/types/game-record'

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
      return props.player === 'PLAYER1'
    })

    const isPlayer2 = computed<boolean>(() => {
      return props.player === 'PLAYER2'
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
      return `${BASE_SIZE + value.strength * BASE_SIZE}px`
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  margin: 1px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
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
