import { Piece, Element } from '~/types/game-record'
import { isExistsPiece, getTopPiece } from '~/functions/piece'

export const haveHands = (piece: Readonly<Piece[]>) => {
  return !!piece.length
}

export const getElementFromArrayRandomly = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getPieceRandomly = (
  pieces: Readonly<Piece[]>
): Piece | undefined => {
  if (!haveHands(pieces)) return undefined

  return getElementFromArrayRandomly(pieces)
}

export const getPlaceableEntry = (
  strength: Piece['strength'],
  shallowArray: Readonly<Element[]>
): [number, number][] | [] => {
  const filtered = shallowArray.filter((element) => {
    if (!isExistsPiece(element.pieces)) return true
    const piece = getTopPiece(element.pieces)
    if (piece.strength < strength) {
      return true
    }
  })
  return filtered.map((element) => {
    return [element.row, element.col]
  })
}

export const getRowColRandomly = (
  strength: Piece['strength'],
  shallowArray: Readonly<Element[]>
) => {
  const placeableEntry = getPlaceableEntry(strength, shallowArray)
  if (!placeableEntry.length) return
  return getElementFromArrayRandomly(placeableEntry)
}

export const getPoppedHands = (piece: Piece, hands: readonly Piece[]) => {
  return hands.filter((hand) => {
    return !(piece.id === hand.id && piece.owner === hand.owner)
  })
}
