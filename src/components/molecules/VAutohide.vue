<template>
  <transition>
    <div v-show="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { createComponent, watch, ref } from '@vue/composition-api'
type Props = {
  delay: number
}

export default createComponent({
  props: {
    delay: {
      type: Number,
      require: true
    }
  },

  setup(props: Props) {
    const isShow = ref<boolean>(false)

    const show = (): void => {
      isShow.value = true
    }

    const hide = (): void => {
      isShow.value = false
    }

    watch(isShow, () => {
      setTimeout(() => {
        hide()
      }, props.delay)
    })

    return { isShow, show }
  }
})
</script>

<style>
/* .v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 1s;
}
.v-enter-to {
  opacity: 1;
} */
.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity 1s;
}

.v-leave-to {
  opacity: 0;
}
</style>
