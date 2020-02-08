import { Piece, Element } from '~/types/game-record'
import { generatePlacedMatrix } from '~/functions/matrix'
import {
  getRowColRandomly,
  getPieceRandomly,
  getPoppedHands
} from '~/functions/holding-piece'

export const useRandomStrategy = () => {
  const getNextMove = (
    holdingPieces: readonly Piece[],
    shallowArray: readonly Element[],
    deepArray: readonly Element[][]
  ) => {
    const randomPiece = getPieceRandomly(holdingPieces)
    if (randomPiece === undefined) return

    const randomRowCol = getRowColRandomly(randomPiece.strength, shallowArray)
    if (randomRowCol === undefined) return

    const placedMatrix = generatePlacedMatrix(randomPiece, {
      to: { row: randomRowCol[0], col: randomRowCol[1] },
      deepArray
    })

    return {
      board: placedMatrix,
      hands: getPoppedHands(randomPiece, holdingPieces)
    }
  }

  return {
    getNextMove
  }
}
