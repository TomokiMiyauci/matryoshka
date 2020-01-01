<template>
  <table style="margin:0 auto;">
    <tbody>
      <tr v-for="(rows, index) in board" :key="index">
        <td
          v-for="cols in rows"
          :key="cols.row + cols.col"
          :class="classStyle(cols)"
          @click="$emit('click', cols)"
          class="td"
        >
          <v-doll :color="color(cols)" :width="calcWidth(cols)"></v-doll>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import VDoll from '~/components/atoms/VDoll.vue'
// eslint-disable-next-line no-unused-vars
import { Piece } from '~/types/piece'

type Props = {
  holding: Holding
  nextNumber: number
  shallowBoard: []
}

type Holding = {
  row: number
  col: number
}

type Board = Entry[]

interface Entry {
  row: number
  col: number
  value: Piece[]
}

function placeableBoard(value: number, board: Board): Board | undefined {
  /**
   * プレイス可能な現在のボードを返す
   */
  if (!board) {
    return undefined
  }

  return board.filter((matrix: Entry) => {
    const latestValue = matrix.value ? matrix.value.slice(-1)[0] : undefined

    if (
      !latestValue ||
      ('number' in latestValue && latestValue.number < value)
    ) {
      return matrix
    }
  })
}

export default createComponent({
  props: {
    board: {
      type: Array,
      require: true
    },

    holding: {
      type: Object,
      require: true
    },

    nextNumber: {
      type: Number,
      require: true
    },

    shallowBoard: {
      type: Array,
      require: true
    }
  },

  components: {
    VDoll
  },

  setup(props: Props) {
    const color = (element: Entry): string | undefined => {
      if (ownPlayer1(element)) {
        return 'red'
      } else if (ownPlayer2(element)) {
        return 'blue'
      }
      return undefined
    }

    const calcWidth = (element: Entry): string => {
      const value = element.value.length
        ? element.value.slice(-1)[0]
        : undefined
      if (value === undefined) return ''
      const BASE_SIZE = 33
      return `${BASE_SIZE + value.number * BASE_SIZE}px`
    }

    const isPlaceable = (matrix: Entry): boolean => {
      /**
       * プレイス可能かどうかを判定する
       */
      const nextNumber = props.nextNumber

      if (nextNumber === undefined) {
        return false
      }

      const placeable = placeableBoard(nextNumber, props.shallowBoard)
      if (!placeable) return false
      return placeable.some((a) => a.row === matrix.row && a.col === matrix.col)
    }

    const isSelecting = (matrix: Entry): boolean => {
      /**
       * 選択中かどうかを判定する
       */
      if (!props.holding) {
        return false
      }
      if (
        props.holding.row === matrix.row &&
        props.holding.col === matrix.col
      ) {
        return true
      }
      return false
    }

    const ownPlayer1 = (matrix: Entry): boolean => {
      const { value } = matrix
      if (!value.length || value.slice(-1)[0].player !== 'PLAYER_1')
        return false
      return true
    }

    const ownPlayer2 = (matrix: Entry): boolean => {
      const { value } = matrix
      if (!value.length || value.slice(-1)[0].player !== 'PLAYER_2')
        return false
      return true
    }

    const classStyle = (entry: Entry) => {
      return {
        'td-placeable': isPlaceable(entry),
        'td-selecting': isSelecting(entry),
        'own-player1': ownPlayer1(entry),
        'own-player2': ownPlayer2(entry)
      }
    }

    return {
      classStyle,
      color,
      calcWidth
    }
  }
})
</script>

<style scoped>
.td {
  width: 100px;
  height: 100px;
  background: rgba(88, 38, 167, 0.356);
  border-radius: 10px;
  border: 1px solid #fff;
  text-align: center;
  vertical-align: middle;
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
  color: rgba(223, 37, 37, 0.8);
}
.own-player2 {
  color: rgba(37, 71, 223, 0.8);
}
</style>
