<template>
  <v-badge
    color="teal accent-3"
    dot
    overlap
    transition="fade-transition"
    :value="isFlash"
  >
    <v-icon class="spin" x-large>{{ mdiFlashCircle }}</v-icon>
  </v-badge>
</template>

<script lang="ts">
import {
  createComponent,
  onUnmounted,
  reactive,
  toRefs
} from '@vue/composition-api'
import { mdiFlashCircle } from '@mdi/js'

export default createComponent({
  setup() {
    const state = reactive({
      isFlash: false,
      intervalId: undefined as NodeJS.Timeout | undefined
    })

    state.intervalId = setInterval(() => {
      state.isFlash = !state.isFlash
    }, 1500)

    onUnmounted(() => {
      if (state.intervalId) {
        clearInterval(state.intervalId)
      }
    })

    return { ...toRefs(state), mdiFlashCircle }
  }
})
</script>

<style lang="scss" scoped>
.spin {
  animation: spin 2s infinite;
}

@keyframes spin {
  100% {
    transform: rotateY(360deg);
  }
}
</style>
