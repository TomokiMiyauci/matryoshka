import VTimer from '~/components/molecules/VTimer.vue'

export default {
  title: `molecules|VTimer`
}

export const def = () => ({
  components: { VTimer },
  template: '<v-timer></v-timer>'
})

export const propsCount = () => ({
  components: { VTimer },
  template: '<v-timer count="10"></v-timer>'
})
