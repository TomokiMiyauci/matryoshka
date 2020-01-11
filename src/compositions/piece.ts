import { ref } from '@vue/composition-api'
import { Player, Piece, PieceMotion, Element } from '~/types/piece'

type SelectingPiece = {
  pieceMotion: PieceMotion
  from?: From
  piece: Piece
}

type From = {
  row: number
  col: number
}

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
      value: tmp,
      player
    }
  })
}

export function pieceSet(row: number, col: number, inRow: number) {
  return {
    quantity: row + col,
    lines: inRow--
  }
}

export const usePlacePiece = () => {
  const placePieceRef = ref<SelectingPiece>()

  const mutate = (piece: Piece) => {
    if (
      placePieceRef.value === undefined ||
      placePieceRef.value.piece !== piece
    ) {
      placePieceRef.value = { pieceMotion: 'PLACE', piece }
    } else {
      clear()
    }
  }

  const clear = () => {
    placePieceRef.value = undefined
  }

  return { placePieceRef, mutate, clear }
}

export const useMovePiece = () => {
  const movePieceRef = ref<SelectingPiece>()

  const mutate = (element: Element) => {
    const { row, col, value } = element
    const piece = value.slice(-1)[0]

    if (
      movePieceRef.value === undefined ||
      (movePieceRef.value.from &&
        movePieceRef.value.from.row === element.row &&
        movePieceRef.value.from.col === element.col)
    ) {
      movePieceRef.value = {
        pieceMotion: 'MOVE',
        from: { row, col },
        piece
      }
    } else {
      clear()
    }
  }

  const clear = () => {
    movePieceRef.value = undefined
  }

  return {
    movePieceRef,
    mutate,
    clear
  }
}

export const useHoldingPieces = () => {
  const holdingPiecesRef = ref<Piece[]>()

  const init = (row: number, col: number, inRow: number, player: Player) => {
    holdingPiecesRef.value = generatePieces(row, col, inRow, player)
  }

  const pop = (piece: Piece) => {
    if (holdingPiecesRef.value === undefined) return
    const index = holdingPiecesRef.value.findIndex((holdingPiece) => {
      return holdingPiece.id === piece.id && holdingPiece.value === piece.value
    })

    holdingPiecesRef.value.splice(index, 1)
  }

  return { holdingPiecesRef, init, pop }
}
