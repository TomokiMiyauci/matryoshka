<template>
  <v-icon class="spin" :size="size">mdi-cog-clockwise</v-icon>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  props: {
    size: {
      type: Number,
      default: 60,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
