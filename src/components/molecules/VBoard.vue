<template>
  <div class="grid">
    <div v-for="(rows, index) in matrix" :key="index" class="rows">
      <div
        v-for="element in rows"
        :key="element.row + element.col"
        class="cols"
      >
        <v-square
          :element="element"
          :next-strength="nextValue"
          :holding="holding"
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
import { Element } from '~/types/game-record'
type Props = {
  matrix: Element[][]
  nextValue: number
  holding: Element
}

const useDollProps = () => {
  const dollProps = (element: Element) => {
    const latestValue = element.pieces.length
      ? element.pieces.slice(-1)[0]
      : undefined
    if (latestValue === undefined) return {}

    const color = latestValue.owner === 'PLAYER1' ? 'red' : 'blue'
    const BASE_SIZE = 33
    const size = `${BASE_SIZE + latestValue.strength * BASE_SIZE}px`
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
    const { dollProps } = useDollProps()

    return { dollProps }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  width: 50vh;
  height: 50vh;
  margin: 0 auto;
  padding: 0;
}

.rows {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
}

.cols {
  width: 100%;
  height: 100%;
  padding: 0.5%;
}
</style>
