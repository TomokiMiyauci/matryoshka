<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="w"
    :height="h"
    viewBox="0 0 24 24"
    role="img"
    style="transition: all 1s;fill: currentColor;"
  >
    <path :d="svgPath" />
  </svg>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { mdiCircleSlice1 } from '@mdi/js'

export default createComponent({
  props: {
    w: {
      type: String,
      default: '48px'
    },

    h: {
      type: String,
      default: '48px'
    }
  },

  setup() {
    return { svgPath: mdiCircleSlice1 }
  }
})
</script>
