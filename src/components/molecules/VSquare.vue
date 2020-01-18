<template>
  <div class="square" :class="classStyle" @click="$emit('click', element)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { Element } from '~/types/game-record'
import { Player } from '~/types/player'
type Props = {
  element: Element
  placeable: boolean
  isSelecting: boolean
}

const useStyle = (props: Props) => {
  const isOwn = (element: Element, player: Player): boolean => {
    const { pieces } = element
    if (!pieces.length) return false
    return pieces.slice(-1)[0].owner === player
  }

  const classStyle = computed(() => {
    return {
      'own-player1': isOwn(props.element, 'PLAYER1'),
      'own-player2': isOwn(props.element, 'PLAYER2'),
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

<style lang="scss" scoped>
.square {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(85, 69, 173, 0.8);
  border: 1% solid grey;
  border-radius: 8%;
}

.glow {
  animation: glow 0.8s infinite alternate;
}

@keyframes glow {
  100% {
    background-color: rgba(151, 150, 49, 0.3);
    box-shadow: 1px 1px 10px 5px rgba(238, 192, 67, 0.692);
  }
}

.glow:hover {
  background-color: rgba(164, 5, 238, 0.411);
  cursor: pointer;
}

.is-selecting {
  background-color: rgba(94, 5, 238, 0.3);
  cursor: pointer;
  animation: ShineAnimation 3s infinite cubic-bezier(0.12, 0.89, 0.98, 0.47);
}

@keyframes ShineAnimation {
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

.own-player1 {
  color: rgba(223, 37, 37, 0.8);
}

.own-player2 {
  color: rgba(37, 71, 223, 0.8);
}
</style>
