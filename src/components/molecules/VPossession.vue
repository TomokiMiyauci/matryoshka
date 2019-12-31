<template>
  <div class="container">
    <div
      v-for="holdingPiece in holdingPieces"
      :key="holdingPiece.id"
      :class="bindClass(holdingPiece)"
      @click="$emit('click', holdingPiece)"
      class="box"
    >
      {{ holdingPiece.number }}
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
type Props = {
  holdingPieces: object[]
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

  setup(props: Props) {
    const boxSelecting = (value: object) => {
      return props.selecting === value
    }

    const isPlayer1 = (): boolean => {
      return props.player === 'PLAYER_1'
    }

    const isPlayer2 = (): boolean => {
      return props.player === 'PLAYER_2'
    }

    const bindClass = (value: object) => {
      return {
        'box-selecting': boxSelecting(value),
        player1: isPlayer1(),
        player2: isPlayer2()
      }
    }

    return {
      bindClass
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.box {
  margin: 5px;
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid #fff;
  cursor: pointer;
  text-align: center;
  line-height: 100px;
  font-size: 60px;
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
