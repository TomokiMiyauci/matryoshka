<template>
  <img :width="width" :src="src" />
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
type Color = 'red' | 'blue'
type Props = {
  width: number | string
  color: Color
}

export default createComponent({
  props: {
    width: {
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
        default: {
          return undefined
        }
      }
    })

    return {
      src
    }
  }
})
</script>

<style scoped></style>
