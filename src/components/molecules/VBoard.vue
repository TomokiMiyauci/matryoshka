<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <table>
        <tbody>
          <tr v-for="(rows, row) in squares" :key="row">
            <v-square
              v-for="(cols, col) in rows"
              :key="row + col"
              :value="cols.value"
              :isValidClass="placeable(0)"
              @click="click({ row, col })"
              :isValidRed="isValidRed(cols)"
              :isValidBlue="isValidBlue(cols)"
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
      console.log(payload)
      this.$emit('click', payload)
    },

    isValidRed(val) {
      return val.player === 'PLAYER_1'
    },

    isValidBlue(val) {
      return val.player === 'PLAYER_2'
    }
  }
}
</script>

<style scoped></style>
