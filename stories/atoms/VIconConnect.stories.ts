import { number } from '@storybook/addon-knobs'
import VIconConnect from '~/components/atoms/VIconConnect.vue'
export default {
  title: `atoms|VIconConnect`,
  parameters: {
    info: {
      summary: `atoms of VIconConnect is great component.`
    }
  }
}

const template = `<v-icon-connect :size="size" />`

export const Default = () => ({
  components: { VIconConnect },
  template
})

export const Example = () => ({
  components: { VIconConnect },
  template: `<div style="height:100%;display:flex;justify-content: center;align-items:center;">${template}</div>`,
  props: {
    size: {
      default: number('size', 300)
    }
  },
  description: {
    VIconConnect: {
      props: {
        size: 'Icon size'
      }
    }
  }
})
