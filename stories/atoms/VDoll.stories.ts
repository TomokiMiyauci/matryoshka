import VDoll from '~/components/atoms/VDoll.vue'

export default {
  title: `atoms|VDoll`
}

export const def = () => ({
  components: { VDoll },
  template: '<v-doll color="red"></v-doll>'
})

export const size = () => ({
  components: { VDoll },
  template: `<div>
  <v-doll size="30px" color="red"></v-doll>
  <v-doll size="60px" color="red"></v-doll>
  <v-doll size="90px" color="red"></v-doll>
  <div  style="background:grey;width:200px;height:200px;display:flex;justify-content:center;align-items:center;"><v-doll size="50%" color="red"></v-doll></div>
  </div>`
})

export const color = () => ({
  components: { VDoll },
  template: `<div>
  <v-doll color="red"></v-doll>
  <v-doll color="blue"></v-doll>
  </div>`
})
