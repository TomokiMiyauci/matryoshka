import { Element } from '~/types/game-record'
import { Player } from '~/types/player'
import { isExistsPiece, getTopPiece, isPlayerPiece } from '~/functions/piece'

export const generateShallow = (rows: number, cols: number): Element[] => {
  const shallowMatrix = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      shallowMatrix.push({ row, col, pieces: [] })
    }
  }
  return shallowMatrix
}

export const reshape = (array: Element[], part: number): Element[][] => {
  const tmp = []
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part))
  }
  return tmp
}

export const getTerritory = ({
  matrix,
  player
}: {
  matrix: Element[][]
  player: Player
}): object[][] => {
  return matrix.map((rows) => {
    return rows.map((element) => {
      if (!isExistsPiece(element.pieces)) return {}
      return isPlayerPiece(getTopPiece(element.pieces), player) ? element : {}
    })
  })
}
