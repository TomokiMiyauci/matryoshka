import { withInfo } from 'storybook-addon-vue-info'
import { storiesOf } from '@storybook/vue'
import VDoll from '~/components/atoms/VDoll.vue'

// export default {
//   title: `atoms|VDoll`,
//   decorators: [withInfo]
// }

// export const def = () => ({
//   components: { VDoll },
//   template: '<v-doll color="red"></v-doll>'
// })

storiesOf('Atoms|VDoll', module)
  .addDecorator(withInfo)
  .add(
    'default',
    () => ({
      components: { VDoll },
      template: '<v-doll />'
    }),
    {
      info: {
        summary: 'Atoms of VDoll is image wrapper component.'
      }
    }
  )
  .add(
    'color',
    () => ({
      components: { VDoll },
      template: `<div>
        <v-doll color="red"></v-doll>
        <v-doll color="blue"></v-doll>
        </div>`
    }),
    {
      info: {
        summary: 'Props of color which can pick red of blue.'
      }
    }
  )
  .add(
    'size',
    () => ({
      components: { VDoll },
      template: `<div>
      <v-doll size="30px" color="red"></v-doll>
      <v-doll size="60px" color="red"></v-doll>
      <v-doll size="90px" color="red"></v-doll>
      <div  style="background:grey;width:200px;height:200px;display:flex;justify-content:center;align-items:center;"><v-doll size="50%" color="red"></v-doll></div>
      </div>`
    }),
    {
      info: {
        summary: 'Props of size what define image size.'
      }
    }
  )

// export const size = () => ({
//   components: { VDoll },
//   template: `<div>
//   <v-doll size="30px" color="red"></v-doll>
//   <v-doll size="60px" color="red"></v-doll>
//   <v-doll size="90px" color="red"></v-doll>
//   <div  style="background:grey;width:200px;height:200px;display:flex;justify-content:center;align-items:center;"><v-doll size="50%" color="red"></v-doll></div>
//   </div>`,
//   description: {
//     MyAwesomeComponent: {
//       props: {
//         // These description will appear in `description` column in props table
//         label: 'A label for my awesome component',
//         visible: 'Whether component is visible or not'
//       },
//       events: {
//         click: 'Event for user clicking the component'
//       },
//       slots: {
//         default: 'Place text or icon here'
//       }
//     }
//   }
// })

// export const color = () => ({
//   components: { VDoll },
//   template: `<div>
//   <v-doll color="red"></v-doll>
//   <v-doll color="blue"></v-doll>
//   </div>`
// })
