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
    }
  },

  setup(props: Props) {
    const boxSelecting = (value) => {
      return props.selecting === value
    }

    const bindClass = (value) => {
      return { boxSelecting: boxSelecting(value) }
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
}
.box {
  margin: 5px;
  width: 100px;
  height: 100px;
  background: rgba(234, 0, 255, 0.425);
  border-radius: 10px;
  border: 1px solid #fff;
  cursor: pointer;
}
.box:hover {
  background: rgba(234, 0, 255, 0.199);
}

.box-selecting {
  background: rgba(234, 0, 255, 0.199);
  border: 1px solid rgba(252, 210, 24, 0.897);
}
</style>
