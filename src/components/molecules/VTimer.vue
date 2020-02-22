<template>
  <v-time :value="time" :beat="!!intervalId"></v-time>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  toRefs,
  SetupContext,
  onUnmounted,
  watch,
  computed
} from '@vue/composition-api'
import VTime from '~/components/atoms/VTime.vue'
export type Props = {
  count: string | number
  isWorking: boolean
}

export const useTimer = (props: Props, emit: SetupContext['emit']) => {
  const state = reactive({
    time: Number(props.count),
    intervalId: undefined as NodeJS.Timeout | undefined
  })

  const countdown = () => {
    state.time--
  }

  const alarm = () => {
    emit('timeup')
  }

  const cleanUp = () => {
    if (state.intervalId) {
      clearInterval(state.intervalId)
      state.intervalId = undefined
    }
  }

  const setAlerm = () => {
    if (state.intervalId) return
    state.intervalId = setInterval(() => {
      if (state.time > 0) {
        countdown()
      } else {
        cleanUp()
        alarm()
      }
    }, 1000)
  }

  return { ...toRefs(state), cleanUp, setAlerm }
}

export default createComponent({
  props: {
    count: {
      type: [String, Number],
      default: 30
    },

    isWorking: {
      type: Boolean
    }
  },

  components: {
    VTime
  },

  setup(props: Props, { emit }) {
    const { time, intervalId, setAlerm, cleanUp } = useTimer(props, emit)
    setAlerm()
    watch(
      computed(() => props.isWorking),
      (isWorking) => {
        if (isWorking) {
          setAlerm()
        } else {
          cleanUp()
        }
      }
    )

    onUnmounted(() => {
      cleanUp()
    })

    return {
      time,
      intervalId
    }
  }
})
</script>
