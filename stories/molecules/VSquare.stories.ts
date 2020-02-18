import { object, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import VSquare from '~/components/molecules/VSquare.vue'
import { Element } from '~/types/game-record'
export default {
  title: 'Molecules|VSquare',
  parameters: {
    info: {
      summary: 'Molecules of VSquare is responsive base square object.'
    }
  }
}
const template = `<v-square @click="onClick" :element="element" :next-strength="nextStrength"></v-square>`
const element: Element = {
  pieces: [],
  row: 0,
  col: 0
}

export const Default = () => ({
  components: { VSquare },
  template,

  props: {
    element: {
      default: () => object('element', element)
    },

    nextStrength: {
      default: number('nextStrength', 0)
    }
  },

  methods: {
    onClick: action('click')
  }
})

const hasPieceElement: Element = {
  pieces: [{ id: 0, strength: 1, owner: 'PLAYER1' }],
  row: 0,
  col: 0
}

export const Placeable = () => ({
  components: { VSquare },
  template,

  props: {
    element: {
      default: () => object('element', hasPieceElement)
    },

    nextStrength: {
      default: number('nextStrength', 0)
    }
  },

  methods: {
    onClick: action('click')
  }
})
