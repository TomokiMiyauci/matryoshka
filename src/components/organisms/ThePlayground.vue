<template>
  <div>
    <v-board :squares="squares" @click="click"></v-board>
    <!-- <v-btn @click="c" color="success">text</v-btn> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { CHANGE } from '~/store/player/mutation-types'
import VBoard from '~/components/molecules/VBoard'
export default {
  components: {
    VBoard
  },

  data() {
    return {
      squares: Array(9).fill(null),
      b: 'X'
    }
  },

  methods: {
    ...mapActions('player', [CHANGE]),

    click(payload) {
      this.squares.splice(payload, 1, this.b)
      // this.a[row][col].splice(2, 1, this.b)
      const b = this.calculateWinner()
      console.log(b)
      this.CHANGE()
    },

    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        console.log(a, b, c)
        if (
          this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c]
        ) {
          setTimeout(() => {
            this.squares = Array(9).fill(null)
          }, 1000)
        }
      }
    }
  }
}
</script>

<style scoped></style>
