<template>
  <div class="square" @click="$emit('click', piece)">
    <slot></slot>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    piece: {
      type: Object,
      require: true
    }
  }
})
</script>

<style scoped>
.square {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 1px;
  background-color: rgba(47, 150, 69, 0.795);
  border-radius: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
