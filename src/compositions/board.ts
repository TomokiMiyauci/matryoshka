import { computed, ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import { Element, Piece, GameRecord } from '~/types/game-record'
import { reshape } from '~/functions/matrix'

type RowCol = {
  row: number
  col: number
}

export const useBoard = (row: number) => {
  const gameRecordsRef = ref<GameRecord[] | []>([])

  const setGameRecordsOfBoard = (gameRecord: GameRecord[]) => {
    gameRecordsRef.value = gameRecord
  }

  const boardRef = computed(() => {
    if (!gameRecordsRef.value.length) return []
    return gameRecordsRef.value[0].board
  })

  const matrixRef = computed(() => {
    return reshape(boardRef.value as Element[], row)
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

  return {
    setGameRecordsOfBoard,
    boardRef,
    matrixRef,
    generateMovedBoard,
    generatePlacedBoard
  }
}
