import VMatrixObject from '~/components/atoms/VMatrixObject.vue'

export default {
  title: `atoms|VMatrixObject`,
  parameters: {
    info: {
      summary: 'Atoms of VMatrixObject is for landing page object.'
    }
  }
}

export const Default = () => ({
  components: { VMatrixObject },
  template: '<v-matrix-object></v-matrix-object>'
})
