import VClose from '~/components/atoms/icons/VClose.vue'

export default {
  title: `Atoms|icons/VClose`,
  parameters: {
    info: {
      summary: `atoms of VClose is close icon button`
    }
  }
}

export const Default = () => ({
  components: { VClose },
  template: '<v-close />'
})
