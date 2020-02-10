<template>
  <v-time :value="time"></v-time>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  toRefs,
  SetupContext,
  onUnmounted
} from '@vue/composition-api'
import VTime from '~/components/atoms/VTime.vue'
export type Props = {
  count: string | number
}

export const useTimer = (props: Props, context: SetupContext) => {
  const state = reactive({
    time: Number(props.count),
    intervalId: undefined as number | undefined
  })

  const countdown = () => {
    state.time--
  }

  const alarm = () => {
    context.emit('timeup')
  }

  const cleanUp = () => {
    clearInterval(state.intervalId)
  }

  onUnmounted(() => {
    cleanUp()
  })

  state.intervalId = window.setInterval(() => {
    if (state.time > 0) {
      countdown()
    } else {
      cleanUp()
      alarm()
    }
  }, 1000)

  return { ...toRefs(state), cleanUp }
}

export default createComponent({
  props: {
    count: {
      type: [String, Number],
      default: 30
    }
  },

  components: {
    VTime
  },

  setup(props: Props, context) {
    const { time, cleanUp } = useTimer(props, context)

    return {
      time,
      cleanUp
    }
  }
})
</script>
