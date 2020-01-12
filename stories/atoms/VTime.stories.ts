import VTime from '~/components/atoms/VTime.vue'

export default {
  title: `atoms|VTime`
}

export const def = () => ({
  components: { VTime },
  template: '<v-time value="30"></v-time>'
})

export const lessThan9 = () => ({
  components: { VTime },
  template: '<v-time value="9"></v-time>'
})

export const lessThan3 = () => ({
  components: { VTime },
  template: '<v-time value="3"></v-time>'
})
