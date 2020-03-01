import { boolean } from '@storybook/addon-knobs'
import TheGameRules from '~/components/organisms/TheGameRules.vue'
export default {
  title: `organisms|TheGameRules`,
  parameters: {
    info: {
      summary: `organisms of TheGameRules is great component.`
    }
  }
}

const template = `<the-game-rules :enableClose="enableClose" />`
export const Default = () => ({
  components: { TheGameRules },
  template,

  props: {
    enableClose: {
      default: boolean('enableClose', true)
    }
  }
})
