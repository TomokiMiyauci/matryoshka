<template>
  <v-board
    :squares="deepLatestBoard"
    :placeable="placeable"
    @click="onClick"
  ></v-board>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VBoard from '~/components/molecules/VBoard'

export default {
  components: {
    VBoard
  },

  computed: {
    ...mapGetters('game', [
      'latestBoard',
      'willBeNextBoard',
      'placeable',
      'selectingPiece',
      'deepLatestBoard',
      'isSelecting',
      'latestPiece'
    ])
  },

  mounted() {
    console.log(this.deepLatestBoard)
  },

  // watch: {
  //   latestBoard() {
  //     this.ASSESS_STATUS()
  //   },
  //   bb() {
  //     alert()
  //   }
  // },

  methods: {
    ...mapActions('player', ['PLACE_PIECE', 'MOVE_PIECE']),
    ...mapActions('game', ['ASSESS_STATUS', 'ADD_SELECTING_PIECE']),

    onClick(payload) {
      // TODO:  if selecting piece
      // if click board
      // @Place
      // case:empty
      // case:exist something value
      // else
      // @MOVE
      // case:exist something value
      //
      // case:empty => return

      if (this.isSelecting) {
        switch (this.selectingPiece.type) {
          case 'PLACE': {
            console.log('select', this.selectingPiece)

            const newValue = { ...this.selectingPiece, ...payload }
            this.PLACE_PIECE(newValue)
            break
          }
          case 'MOVE': {
            const { row, col, type, ...rest } = this.selectingPiece
            const news = {
              value: { ...rest },
              type,
              from: { col, row },
              to: { ...payload }
            }
            console.log(news)

            this.MOVE_PIECE(news)

            break
          }
        }
      } else {
        const { row, col } = payload
        const latestPiece = this.latestPiece(row, col)
        if (latestPiece.value) {
          this.ADD_SELECTING_PIECE({ ...latestPiece, type: 'MOVE' })
        }
      }
    }
  }
}
</script>

<style scoped></style>
