import { Player } from '~/types/player'
import { Piece } from '~/types/game-record'

export function generatePieces(
  row: number,
  col: number,
  inRow: number,
  player: Player
): Piece[] {
  const { quantity, lines } = pieceSet(row, col, inRow)
  const news = new Array(quantity).fill(undefined).map(() => ({}))
  let counter = 0
  let value = 0
  return news.map((_, index) => {
    const tmp = value

    counter++
    if (counter === lines - 1) {
      value++
      counter = 0
    }
    return {
      id: index,
      strength: tmp,
      owner: player
    }
  })
}

export function pieceSet(row: number, col: number, inRow: number) {
  return {
    quantity: row + col,
    lines: inRow--
  }
}

// export function getPieceIndex(piece: Piece, holdingPieces: Piece[]): number {
//   return holdingPieces.findIndex((holdingPiece) => {
//     return holdingPiece.id === piece.id && holdingPiece.owner === piece.owner
//   })
// }
