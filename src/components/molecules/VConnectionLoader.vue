<template>
  <div
    class="base-position v-icon theme--light"
    :class="{ 'moved-position': isMoved }"
  >
    <mdi-circle-slice1 class="spin" v-bind="style" />
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  reactive,
  watch,
  computed
} from '@vue/composition-api'
import MdiCircleSlice1 from '~/components/atoms/icons/MdiCircleSlice1.vue'
type Props = {
  isCenter: boolean
}

export default createComponent({
  components: {
    MdiCircleSlice1
  },

  props: {
    isCenter: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    const isMoved = ref(false)
    const style = reactive({ width: '300px', height: '300px' })

    watch(
      computed(() => props.isCenter),
      (now) => {
        if (!now) {
          isMoved.value = true
          style.width = '50px'
          style.height = '50px'
        }
      }
    )

    return { isMoved, style }
  }
})
</script>

<style lang="scss" scoped>
.spin {
  animation: spin 1s infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.base-position {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  transform: translate(-50%, -50%);
  transition: all 2s;
}

.moved-position {
  top: 100%;
  left: 100%;
  transform: translate(-100%, -100%);
  will-change: transition;
}
</style>
