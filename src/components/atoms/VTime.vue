<template>
  <div :class="classStyle" class="time">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
type Props = { value: string | number }

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
    }
  },

  setup(props: Props) {
    const { before10Sec, before3Sec } = useTime(props)

    const classStyle = computed(() => {
      return {
        'before-ten-sec': before10Sec.value,
        'before-three-sec': before3Sec.value
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
  justify-content: center;
  align-items: center;
  width: 9vh;
  height: 9vh;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  border: solid 1vh $default;
  animation-name: beat;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  color: $default;
  font-size: 4vh;
  font-weight: bold;
}

@keyframes beat {
  50% {
    color: blue;
    border-color: blue;
    opacity: 0.5;
    transform: scale(0.8);
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
