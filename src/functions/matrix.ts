import cloneDeep from 'lodash/cloneDeep'
import { Element, Piece, RowCol } from '~/types/game-record'
import { Player } from '~/types/player'
import { isExistsPiece, getTopPiece, isPlayerPiece } from '~/functions/piece'

export const generateShallow = (
  rows: RowCol['row'],
  cols: RowCol['col']
): Element[] => {
  const shallowMatrix = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      shallowMatrix.push({ row, col, pieces: [] })
    }
  }
  return shallowMatrix
}

export const reshape = (
  array: Readonly<Element[]>,
  part: number
): Element[][] => {
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
  matrix: Readonly<Element[][]>
  player: Player
}): (Element | {})[][] => {
  return matrix.map((rows) => {
    return rows.map((element) => {
      if (!isExistsPiece(element.pieces)) return {}
      return isPlayerPiece(getTopPiece(element.pieces), player) ? element : {}
    })
  })
}

export const generatePlacedMatrix = (
  piece: Readonly<Piece>,
  { to, deepArray }: { to: Readonly<RowCol>; deepArray: Readonly<Element[][]> }
): Readonly<Element[][]> => {
  const copyMatrix = cloneDeep(deepArray)
  const { row, col } = to

  copyMatrix[row][col].pieces.push(piece)
  return copyMatrix
}

export const generateMovedMatrix = (
  piece: Readonly<Piece>,
  from: Readonly<RowCol>,
  { to, deepArray }: Readonly<{ to: RowCol; deepArray: Element[][] }>
): Readonly<Element[][]> => {
  const copyMatrix = cloneDeep(deepArray)

  copyMatrix[from.row][from.col].pieces.pop()
  copyMatrix[to.row][to.col].pieces.push(piece)
  return copyMatrix
}
