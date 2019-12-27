<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <table>
        <tbody>
          <tr v-for="(rows, row) in squares" :key="row">
            <v-square
              v-for="(cols, col) in rows"
              :key="row + col"
              :value="cols"
              :is-valid-class="placeable(0)"
              :is-valid-red="isValidRed(cols)"
              :is-valid-blue="isValidBlue(cols)"
              @click="click({ row, col })"
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
