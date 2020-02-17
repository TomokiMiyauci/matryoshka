// import { withInfo } from 'storybook-addon-vue-info'
import { storiesOf } from '@storybook/vue'
import { withKnobs, radios } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import VTime from '~/components/atoms/VTime.vue'

const template = `<v-time :value="value"></v-time>`

const options = {
  30: 30,
  9: 9,
  3: 3
}

storiesOf('Atoms|VTime', module)
  // .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add(
    'default',
    () => ({
      components: { VTime },
      template,
      props: {
        value: {
          default: radios('value', options, 30)
        }
      }
    }),
    {
      info: {
        summary: 'Atoms of VTime is display for timer.'
      }
    }
  )
