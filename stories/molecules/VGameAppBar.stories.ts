import { action } from '@storybook/addon-actions'
import VGameAppBar from '~/components/molecules/VGameAppBar.vue'
export default {
  title: `molecules|VGameAppBar`,
  parameters: {
    info: {
      summary: `molecules of VGameAppBar is great component.`
    }
  }
}
const template = `<v-game-app-bar @click="click" />`
export const Default = () => ({
  components: { VGameAppBar },
  template,
  methods: {
    click: action('click')
  }
})
