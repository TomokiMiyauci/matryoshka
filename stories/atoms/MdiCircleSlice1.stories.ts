import { text } from '@storybook/addon-knobs'
import MdiCircleSlice1 from '~/components/atoms/icons/MdiCircleSlice1.vue'

export default {
  title: `atoms|icons/MdiCircleSlice1`,
  parameters: {
    info: {
      summary: `atoms of MdiCircleSlice1 is icon component.`
    }
  }
}

const template = `<mdi-circle-slice1 :w="w" :h="h" />`

export const Default = () => ({
  components: { MdiCircleSlice1 },
  template,
  props: {
    w: {
      default: text('w', '48px')
    },

    h: {
      default: text('h', '48px')
    }
  }
})
