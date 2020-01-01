import VDoll from '~/components/atoms/VDoll.vue'

export default {
  title: `atoms|VDoll`
}

export const def = () => ({
  components: { VDoll },
  template: '<v-doll color="red"></v-doll>'
})

export const width = () => ({
  components: { VDoll },
  template: `<div>
  <v-doll width="30px" color="red"></v-doll>
  <v-doll width="60px" color="red"></v-doll>
  <v-doll width="90px" color="red"></v-doll>
  </div>`
})

export const color = () => ({
  components: { VDoll },
  template: `<div>
  <v-doll color="red"></v-doll>
  <v-doll color="blue"></v-doll>
  </div>`
})
