import { computed, Ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import { Piece, GameRecord, RowCol } from '~/types/game-record'
import { reshape } from '~/functions/matrix'

export const useBoard = (
  gameRecord: Ref<GameRecord | undefined>,
  row: RowCol['row']
) => {
  const boardRef = computed(() => {
    return gameRecord.value ? gameRecord.value.board : []
  })

  const matrixRef = computed(() => {
    return reshape(boardRef.value, row)
  })

  const generateMovedBoard = (from: RowCol, to: RowCol, piece: Piece) => {
    const cpBoard = cloneDeep(matrixRef.value)

    cpBoard[from.row][from.col].pieces.pop()
    cpBoard[to.row][to.col].pieces.push(piece)
    return cpBoard.flat()
  }

  const generatePlacedBoard = (to: RowCol, piece: Piece) => {
    const cpBoard = cloneDeep(matrixRef.value)

    cpBoard[to.row][to.col].pieces.push(piece)
    return cpBoard.flat()
  }

  return { boardRef, matrixRef, generateMovedBoard, generatePlacedBoard }
}
