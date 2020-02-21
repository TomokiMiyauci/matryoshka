import { color, text } from '@storybook/addon-knobs'
import VColorPicker from '~/components/molecules/VColorPicker.vue'
export default {
  title: `molecules|VColorPicker`,
  parameters: {
    info: {
      summary: `molecules of VColorPicker is great component.`
    }
  }
}
const template = `<v-color-picker :title="title" :color="color" :hex="hex" />`

export const Default = () => ({
  components: { VColorPicker },
  template,
  props: {
    title: {
      default: text('title', '')
    },

    color: {
      default: color('color', 'rgba(255,255,255,1)')
    },

    hex: {
      default: color('color', 'rgba(255,255,255,1)').toLowerCase()
    }
  }
})
