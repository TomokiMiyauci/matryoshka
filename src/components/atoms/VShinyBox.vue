<template>
  <div
    class="shiny-box"
    :style="style"
    :class="classStyle"
    @click="$emit('click')"
  >
    <slot></slot>
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

const useStyle = (props: Props) => {
  const classStyle = computed(() => {
    return {
      isShining: props.isShining
    }
  })

  const style = computed(() => {
    const transparencyWeight = 0.7
    const { r, g, b, a } = props.color
    const baseRGBA = `rgba(${r},${g},${b},${a})`
    const shineRGBA = props.shineColor
      ? `rgba(${props.shineColor.r},${props.shineColor.g},${props.shineColor.b},${props.shineColor.a})`
      : `rgba(${r},${g},${b},${a * transparencyWeight})`
    const backgroundColor = props.isShining ? shineRGBA : baseRGBA
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
      default: () => ({ r: 30, g: 220, b: 190, a: 1.0 })
    },

    shineColor: {
      type: Object
    }
  },

  setup(props: Props) {
    const { classStyle, style } = useStyle(props)

    return {
      classStyle,
      style
    }
  }
})
</script>

<style lang="scss" scoped>
.shiny-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14vh;
  height: 14vh;
  margin: 0.3%;
  border: 0.1vh solid rgba(128, 128, 128, 0.5);
  border-radius: 8%;
}

.isShining {
  border: 0.1vh solid white;
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
