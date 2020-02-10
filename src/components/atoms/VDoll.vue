<template>
  <img class="default" alt="doll" :width="size" :height="size" :src="src" />
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
type Color = 'red' | 'blue'
type Props = {
  size: number | string
  color: Color
}

export default createComponent({
  props: {
    size: {
      type: [Number, String],
      require: true
    },

    color: {
      type: String,
      require: true
    }
  },

  setup(props: Props) {
    const src = computed((): Color | undefined => {
      switch (props.color) {
        case 'red': {
          return require('~/assets/img/doll-red.png')
        }
        case 'blue': {
          return require('~/assets/img/doll-blue.png')
        }
      }
    })

    return {
      src
    }
  }
})
</script>

<style lang="scss" scoped>
.default {
  user-select: none;
  pointer-events: none;
}
</style>
