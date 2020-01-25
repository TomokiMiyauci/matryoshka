<template>
  <div
    class="default"
    :style="style"
    :class="classStyle"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
type Props = {
  color: Color
  isShining: boolean
  shineColor: Color
}

type Color = {
  r: number
  g: number
  b: number
  a: number
}

const useStyle = (isShining: boolean, color: Color, shineColor: Color) => {
  const classStyle = computed(() => {
    return {
      isShining
    }
  })

  const style = computed(() => {
    const transparencyWeight = 0.7
    const { r, g, b, a } = color
    const baseRGBA = `rgba(${r},${g},${b},${a})`
    const shineRGBA = shineColor
      ? `rgba(${shineColor.r},${shineColor.g},${shineColor.b},${shineColor.a})`
      : `rgba(${r},${g},${b},${a * transparencyWeight})`
    const backgroundColor = isShining ? shineRGBA : baseRGBA
    return { 'background-color': backgroundColor }
  })

  return {
    classStyle,
    style
  }
}

export default createComponent({
  props: {
    isShining: {
      type: Boolean,
      default: false
    },

    color: {
      type: Object,
      default: () => ({ r: 1, b: 120, g: 4, a: 0.8 })
    },

    shineColor: {
      type: Object
    }
  },

  setup(props: Props) {
    const { classStyle, style } = useStyle(
      props.isShining,
      props.color,
      props.shineColor
    )

    return {
      classStyle,
      style
    }
  }
})
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1% solid grey;
  border-radius: 8%;
}

.isShining {
  cursor: pointer;
  animation: Shine 3s infinite cubic-bezier(0.12, 0.89, 0.98, 0.47);
}

@keyframes Shine {
  0% {
    background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.5) 48%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.5) 52%,
      rgba(255, 255, 255, 0) 57%,
      rgba(255, 255, 255, 0) 100%
    );
    background-repeat: no-repeat;
    background-position: -250px -250px;
    background-size: 500px 480px;
  }

  100% {
    background-repeat: no-repeat;
    background-position: 250px 250px;
  }
}
</style>
