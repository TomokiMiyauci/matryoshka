import VGamepadVariant from '~/components/atoms/icons/VGamepadVariant.vue'

export default {
  title: `atoms|icons/VGamepadVariant`,
  parameters: {
    info: {
      summary: `atoms of VGamepadVariant is great component.`
    }
  }
}

const template = `<v-gamepad-variant />`
export const Default = () => ({
  components: { VGamepadVariant },
  template
})
