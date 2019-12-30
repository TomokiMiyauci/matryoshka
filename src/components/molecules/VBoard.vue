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
          {{
            cols.value.slice(-1)[0] ? cols.value.slice(-1)[0].number : undefined
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
type Props = {
  holding: Holding
  nextNumber: number
}

type Holding = {
  row: number
  col: number
}

type Board = Entry[]

interface Piece {
  id: number
  number: number
}

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

  setup(props: Props) {
    const isPlaceable = (matrix): boolean => {
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

    const isSelecting = (matrix): boolean => {
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
    }

    const ownPlayer1 = (matrix): boolean => {
      const { value } = matrix
      if (!value.length || value.slice(-1)[0].player !== 'PLAYER_1')
        return false
      return true
    }

    const classStyle = (entry: Entry) => {
      return {
        'td-placeable': isPlaceable(entry),
        'td-selecting': isSelecting(entry),
        'own-player1': ownPlayer1(entry)
      }
    }

    return {
      classStyle
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
