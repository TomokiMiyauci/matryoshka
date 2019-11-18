<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <table>
        <tbody>
          <tr>
            <v-square
              :value="squares[0]"
              :isValidClass="placeable(0)"
              @click="click(0)"
            ></v-square>
            <v-square
              :value="squares[1]"
              :isValidClass="placeable(1)"
              @click="click(1)"
            ></v-square>
            <v-square
              :value="squares[2]"
              :isValidClass="placeable(2)"
              @click="click(2)"
            ></v-square>
          </tr>
          <tr>
            <v-square
              :value="squares[3]"
              :isValidClass="placeable(3)"
              @click="click(3)"
            ></v-square>
            <v-square
              :value="squares[4]"
              :isValidClass="placeable(4)"
              @click="click(4)"
            ></v-square>
            <v-square
              :value="squares[5]"
              :isValidClass="placeable(5)"
              @click="click(5)"
            ></v-square>
          </tr>
          <tr>
            <v-square
              :value="squares[6]"
              :isValidClass="placeable(6)"
              @click="click(6)"
            ></v-square>
            <v-square
              :value="squares[7]"
              :isValidClass="placeable(7)"
              @click="click(7)"
            ></v-square>
            <v-square
              :value="squares[8]"
              :isValidClass="placeable(8)"
              @click="click(8)"
            ></v-square>
          </tr>
        </tbody>
      </table>
    </v-row>
  </v-container>
</template>

<script>
import VSquare from '~/components/atoms/VSquare'
export default {
  components: {
    VSquare
  },

  props: {
    squares: {
      type: Array,
      required: true
    },

    placeable: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    click(payload) {
      this.$emit('click', payload)
    }
  }
}
</script>

<style scoped></style>
