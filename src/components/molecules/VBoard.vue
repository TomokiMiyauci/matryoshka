<template>
  <div class="grid">
    <div v-for="(rows, index) in matrix" :key="index" class="rows">
      <div
        v-for="element in rows"
        :key="element.row + element.col"
        class="cols"
      >
        <v-square
          :placeable="isPlaceable(element)"
          :is-selecting="isSelecting(element)"
          :element="element"
          @click="$emit('click', element)"
        >
          <v-doll v-bind="dollProps(element)"></v-doll>
        </v-square>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, reactive, ref } from '@vue/composition-api'
import VDoll from '~/components/atoms/VDoll.vue'
import VSquare from '~/components/molecules/VSquare.vue'
import { Matrix, Element } from '~/types/piece'
type Props = {
  matrix: Matrix
  nextValue: number
  holding: Element
}

const useHolding = (props: Props) => {
  const isPlaceable = (element: Element): boolean => {
    const nextValue = props.nextValue
    if (nextValue === undefined) {
      return false
    }
    return !element.value.length || element.value.slice(-1)[0].value < nextValue
  }

  const isSelecting = (element: Element): boolean => {
    if (!props.holding) {
      return false
    }
    return (
      props.holding.row === element.row && props.holding.col === element.col
    )
  }

  return {
    isPlaceable,
    isSelecting
  }
}

const useDollProps = () => {
  const dollProps = (element: Element) => {
    const latestValue = element.value.length
      ? element.value.slice(-1)[0]
      : undefined
    if (latestValue === undefined) return {}

    const color = latestValue.player === 'PLAYER_1' ? 'red' : 'blue'
    const BASE_SIZE = 33
    const size = `${BASE_SIZE + latestValue.value * BASE_SIZE}px`
    return { color, width: size }
  }

  return {
    dollProps
  }
}

export default createComponent({
  props: {
    matrix: {
      type: Array,
      required: true
    },
    nextValue: {
      type: Number,
      require: true
    },
    holding: {
      type: Object,
      require: true
    }
  },

  components: {
    VSquare,
    VDoll
  },

  setup(props: Props) {
    const { isPlaceable, isSelecting } = useHolding(props)

    const { dollProps } = useDollProps()

    return { dollProps, isPlaceable, isSelecting }
  }
})
</script>

<style scoped>
.grid {
  margin: 0 auto;
  width: 70vw;
  max-width: 50vh;
  height: 70vw;
  max-height: 50vh;
}
.rows {
  display: flex;
}
.cols {
  flex: 1 0 auto;
  position: relative;
}
.cols::before {
  content: '';
  float: left;
  padding-top: 100%;
}
</style>
