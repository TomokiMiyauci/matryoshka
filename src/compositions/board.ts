import { computed, ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import { Piece, GameRecord, RowCol } from '~/types/game-record'
import { reshape, generateShallow, getTerritory } from '~/functions/matrix'

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

  return {
    generateShallowBoard: generateShallow,
    setGameRecordsOfBoard,
    getTerritory,
    boardRef,
    matrixRef,
    generateMovedBoard,
    generatePlacedBoard
  }
}
