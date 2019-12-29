<template>
  <table style="margin:0 auto;">
    <tbody>
      <tr v-for="(rows, index) in board" :key="index">
        <td
          v-for="cols in rows"
          :key="cols.row + cols.col"
          :class="{
            'td-placeable': isPlaceable(cols),
            'td-selecting': isSelecting(cols),
            'own-player1': ownPlayer1(cols)
          }"
          @click="onClick(cols)"
          class="td"
        >
          {{
            cols.value.slice(-1)[0] ? cols.value.slice(-1)[0].number : undefined
          }}
        </td>
      </tr>
    </tbody>
  </table>

  <!-- <v-container>
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
  </v-container> -->
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    board: {
      type: Array,
      require: true
    },

    isPlaceable: {
      type: Function,
      require: true
    },

    isSelecting: {
      type: Function,
      require: true
    },

    onClick: {
      type: Function,
      require: true
    },

    ownPlayer1: {
      type: Function,
      require: true
    }
  }
})

// 案
// import { createComponent } from '@vue/composition-api'
// type Props = {
//   board: Board
//   fn: Function
//   c: Function
//   cc: Function
// }

// type Board = Entry[]

// interface Piece {
//   id: number
//   number: number
// }

// interface Entry {
//   row: number
//   col: number
//   value: Piece[]
// }

// function placeableBoard(value: number, board: Board): Board | undefined {
//   /**
//    * プレイス可能な現在のボードを返す
//    * @type {Array}
//    */
//   if (!board.length) {
//     return undefined
//   }
//   return board.filter((matrix: Entry) => {
//     const latestValue = matrix.value ? matrix.value.slice(-1)[0] : undefined
//     if (
//       !latestValue ||
//       ('number' in latestValue && latestValue.number < value)
//     ) {
//       return matrix
//     }
//   })
// }

// export default createComponent({
//   props: {
//     board: {
//       type: Array,
//       require: true
//     },

//     fn: {
//       type: Function,
//       require: true
//     },
//     c: {
//       type: Function,
//       require: true
//     },
//     cc: {
//       type: Function,
//       require: true
//     }
//   },

//   setup(props: Props) {
//     const isPlaceable = (entry: Entry): boolean => {
//       /**
//        * プレイス可能かどうかを判定する
//        * @type {Boolean}
//        */
//       const num = 1
//       if (num === undefined) {
//         return false
//       }
//       const placeableBoards = placeableBoard(1, props.board)
//       if (placeableBoards === undefined) return false
//       const is = placeableBoards.some(
//         (a) => a.row === entry.row && a.col === entry.col
//       )
//       return is
//     }

//     return {
//       isPlaceable
//     }
//   }
// })

// import VSquare from '~/components/atoms/VSquare'
// export default {
//   components: {
//     VSquare
//   },

//   props: {
//     squares: {
//       type: Array,
//       required: true
//     },

//     placeable: {
//       type: Function,
//       default: () => {}
//     }
//   },

//   methods: {
//     click(payload) {
//       console.log(payload)
//       this.$emit('click', payload)
//     },

//     isValidRed(val) {
//       return val.player === 'PLAYER_1'
//     },

//     isValidBlue(val) {
//       return val.player === 'PLAYER_2'
//     }
//   }
// }
</script>

<style scoped>
.td {
  width: 100px;
  height: 100px;
  background: rgba(88, 38, 167, 0.356);
  border-radius: 10px;
  border: 1px solid #fff;
  text-align: center;
  font-size: 60px;
}
.td-placeable {
  animation: placeable 0.8s infinite alternate;
  border: 2px double #fff;
}
.td-placeable:hover {
  cursor: pointer;
  background: rgba(164, 5, 238, 0.411);
}
.td-selecting {
  border-color: yellow;
  background-color: rgba(255, 255, 255, 0.8);
}
@keyframes placeable {
  0% {
  }
  100% {
    box-shadow: 1px 1px 10px 5px rgba(238, 192, 67, 0.692);
    background-color: rgba(151, 150, 49, 0.3);
  }
}
.own-player1 {
  color: red;
}
</style>
