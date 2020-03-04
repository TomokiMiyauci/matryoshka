import VFlashCircle from '~/components/atoms/icons/VFlashCircle.vue'

export default {
  title: `atoms|icons/VFlashCircle`,
  parameters: {
    info: {
      summary: `atoms of VFlashCircle is great component.`
    }
  }
}
const template = `<v-flash-circle />`
export const Default = () => ({
  components: { VFlashCircle },
  template
})
