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
          <v-doll
            v-show="element.pieces.length"
            v-bind="dollProps(element)"
          ></v-doll>
        </v-square>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
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
    const strength = latestValue.strength + 1
    const size = `${(strength / 3) * 100}%`
    return { color, size }
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

  setup() {
    const { dollProps } = useDollProps()

    return { dollProps }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  width: 45vh;
  height: 45vh;
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
