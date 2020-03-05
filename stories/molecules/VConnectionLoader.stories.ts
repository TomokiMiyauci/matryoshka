import { boolean } from '@storybook/addon-knobs'
import VConnectionLoader from '~/components/molecules/VConnectionLoader.vue'

export default {
  title: `molecules|VConnectionLoader`,
  parameters: {
    info: {
      summary: `molecules of VConnectionLoader is loader icon for connection component.`
    }
  }
}

const template = `<v-connection-loader :is-center="isCenter" />`
export const Default = () => ({
  components: { VConnectionLoader },
  template,
  props: {
    isCenter: {
      default: boolean('isCenter', true)
    }
  }
})
