<template>
  <v-icon class="spin" :size="size">{{ icon }}</v-icon>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { mdiCogClockwise } from '@mdi/js'

export default createComponent({
  props: {
    size: {
      type: Number,
      default: 60,
      required: true
    }
  },

  setup() {
    return { icon: mdiCogClockwise }
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
