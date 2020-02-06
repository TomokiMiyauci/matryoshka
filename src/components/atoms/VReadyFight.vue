<template>
  <div ref="div" class="ready" :class="{ fight: isReady }">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, computed } from '@vue/composition-api'
type Props = {
  isReady: boolean
}

export default createComponent({
  props: {
    isReady: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  setup(props: Props, { emit }) {
    const div = ref<HTMLElement>({})

    const message = computed((): 'Ready' | 'Fight!' => {
      return props.isReady ? 'Fight!' : 'Ready'
    })

    onMounted(() => {
      div.value.onanimationend = () => {
        emit('ready')
      }
    })

    return {
      div,
      message
    }
  }
})
</script>

<style scoped lang="scss">
$red: rgba(255, 0, 0, 0.8);

.ready {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 15vmin;
  animation: bounce 1s ease infinite;
  user-select: none;
}

.fight {
  animation: fade 1.5s ease;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    color: $red;
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}

@keyframes fade {
  100% {
    color: $red;
    font-size: 30vmin;
    opacity: 0;
  }
}
</style>
