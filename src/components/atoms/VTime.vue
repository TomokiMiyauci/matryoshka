<template>
  <div :class="classStyle" class="time">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
type Props = {
  value: string | number
  beat: boolean
}

const useTime = (props: Props) => {
  const before10Sec = computed(() => props.value < 10)
  const before3Sec = computed(() => props.value <= 3)

  return {
    before10Sec,
    before3Sec
  }
}

export default createComponent({
  props: {
    value: {
      type: [String, Number],
      required: true
    },

    beat: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  setup(props: Props) {
    const { before10Sec, before3Sec } = useTime(props)

    const classStyle = computed(() => {
      return {
        'before-ten-sec': before10Sec.value,
        'before-three-sec': before3Sec.value,
        beat: props.beat
      }
    })

    return {
      classStyle
    }
  }
})
</script>

<style scoped lang="scss">
$warning: #e53935;
$weak-warning: #fdd835;
$default: turquoise;

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9vh;
  min-width: 50px;
  height: 9vh;
  min-height: 50px;
  color: $default;
  font-weight: bold;
  font-size: 4vh;
  border: solid 1vh $default;
  border-radius: 50%;
}

.beat {
  animation-name: beat;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes beat {
  50% {
    color: blue;
    border-color: blue;
    transform: scale(0.8);
    opacity: 0.5;
  }
}

.before-ten-sec {
  color: $weak-warning;
  border-color: $weak-warning;
  opacity: 0.9;
}

.before-three-sec {
  color: $warning;
  border-color: $warning;
  opacity: 0.9;
}
</style>
