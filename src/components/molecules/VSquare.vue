<template>
  <div class="square" :class="classStyle" @click="$emit('click', element)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { Element, Player } from '~/types/piece'
type Props = {
  element: Element
  placeable: boolean
  isSelecting: boolean
}

const useStyle = (props: Props) => {
  const isOwn = (element: Element, player: Player): boolean => {
    const { value } = element
    if (!value.length) return false
    return value.slice(-1)[0].player === player
  }

  const classStyle = computed(() => {
    return {
      'own-player1': isOwn(props.element, 'PLAYER_1'),
      'own-player2': isOwn(props.element, 'PLAYER_2'),
      glow: props.placeable,
      'is-selecting': props.isSelecting
    }
  })

  return {
    classStyle
  }
}

export default createComponent({
  props: {
    element: {
      type: Object,
      require: true
    },

    placeable: {
      type: Boolean,
      require: true
    },

    isSelecting: {
      type: Boolean,
      require: true
    }
  },

  setup(props: Props) {
    const { classStyle } = useStyle(props)

    return {
      classStyle
    }
  }
})
</script>

<style scoped>
.square {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 1px;
  background-color: rgba(85, 69, 173, 0.8);
  border-radius: 10%;
  border: 1px solid rgba(128, 128, 128, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.glow {
  animation: glow 0.8s infinite alternate;
}

@keyframes glow {
  0% {
  }
  100% {
    box-shadow: 1px 1px 10px 5px rgba(238, 192, 67, 0.692);
    background-color: rgba(151, 150, 49, 0.3);
  }
}
.glow:hover {
  cursor: pointer;
  background-color: rgba(164, 5, 238, 0.411) !important;
}

.is-selecting {
  cursor: pointer;
  background-color: rgba(94, 5, 238, 0.3);
  animation: ShineAnimation 3s infinite cubic-bezier(0.12, 0.89, 0.98, 0.47);
}

@keyframes ShineAnimation {
  0% {
    background-repeat: no-repeat;
    background-image: linear-gradient(
      top left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.5) 48%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.5) 52%,
      rgba(255, 255, 255, 0) 57%,
      rgba(255, 255, 255, 0) 100%
    );
    background-position: -250px -250px;
    background-size: 500px 480px;
  }
  100% {
    background-repeat: no-repeat;
    background-position: 250px 250px;
  }
}

.own-player1 {
  color: rgba(223, 37, 37, 0.8);
}
.own-player2 {
  color: rgba(37, 71, 223, 0.8);
}
</style>
