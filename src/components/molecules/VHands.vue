<template>
  <div
    v-show="holdingPieces.length"
    :class="{ 'mb-2': !isYourHands, 'mt-2': isYourHands }"
  >
    <div v-show="!isYourHands" class="text-center">{{ hands }}</div>
    <div class="hands">
      <v-box
        @click="$emit('click', piece)"
        :is-shining="isSelecting(piece)"
        v-for="piece in holdingPieces"
        :color="isYourHands ? undefined : { r: 100, g: 100, b: 128, a: 1 }"
        :key="piece.id"
      >
        <v-doll v-bind="dollProps(piece)"></v-doll>
      </v-box>
    </div>
    <div v-show="isYourHands" class="text-center">{{ hands }}</div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import VBox from '~/components/atoms/VShinyBox.vue'
import { Piece, Element } from '~/types/game-record'
import { Player } from '~/types/player'
import VDoll from '~/components/atoms/VDoll.vue'

type Props = {
  holdingPieces: Piece[]
  selectingPiece: Piece
  isYourHands: boolean
}

const useDoll = () => {
  const dollProps = (piece: Piece) => {
    const color = piece.owner === 'PLAYER1' ? 'red' : 'blue'
    const strength = piece.strength + 1
    const size = `${(strength / 3) * 100}%`
    return { color, size }
  }

  return {
    dollProps
  }
}

export default createComponent({
  components: {
    VBox,
    VDoll
  },

  props: {
    holdingPieces: {
      type: Array
    },

    selectingPiece: {
      type: Object
    },

    isYourHands: {
      type: Boolean,
      default: true
    }
  },

  setup(props: Props) {
    const { dollProps } = useDoll()

    const hands = computed(() => {
      return props.isYourHands ? 'Your Hands' : 'Enemy Hands'
    })

    const isSelecting = (piece: Piece) => {
      return (
        props.selectingPiece &&
        'id' in props.selectingPiece &&
        piece.id === props.selectingPiece.id
      )
    }

    return {
      dollProps,
      hands,
      isSelecting
    }
  }
})
</script>

<style lang="scss" scoped>
.hands {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
