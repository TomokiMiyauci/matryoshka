import { ref, computed } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import { Player } from '~/types/player'
import { Piece, Element, GameRecord } from '~/types/game-record'
import { generatePieces } from '~/functions/pieces'
export type SelectingPiece = {
  pieceMotion: MoveMotion | PlaceMotion
  piece: Piece
}

type RowCol = {
  row: number
  col: number
}

type MoveMotion = ['MOVE', RowCol]
type PlaceMotion = ['PLACE', undefined]

// export const usePlacePiece = () => {
//   const placePieceRef = ref<SelectingPiece>()

//   const mutate = (piece: Piece) => {
//     if (
//       placePieceRef.value === undefined ||
//       placePieceRef.value.piece.id === piece.id
//     ) {
//       placePieceRef.value = { pieceMotion: ['PLACE', undefined], piece }
//     } else {
//       clear()
//     }
//   }

//   const clear = () => {
//     placePieceRef.value = undefined
//   }

//   return { placePieceRef, mutate, clear }
// }

// export const useMovePiece = () => {
//   const movePieceRef = ref<SelectingPiece>()

//   const mutate = (element: Element) => {
//     const { row, col, pieces } = element
//     const piece = pieces.slice(-1)[0]

//     if (
//       movePieceRef.value === undefined ||
//       (movePieceRef.value.pieceMotion[0] === 'MOVE' &&
//         movePieceRef.value.pieceMotion[1].row === row &&
//         movePieceRef.value.pieceMotion[1].col === col)
//     ) {
//       movePieceRef.value = {
//         pieceMotion: ['MOVE', { row, col }],
//         piece
//       }
//     } else {
//       clear()
//     }
//   }

//   const clear = () => {
//     movePieceRef.value = undefined
//   }

//   return {
//     movePieceRef,
//     mutate,
//     clear
//   }
// }

export const useSelectingPiece = () => {
  const selectingPieceRef = ref<SelectingPiece>()

  const mutateMove = (element: Element) => {
    const { row, col, pieces } = element
    const piece = pieces.slice(-1)[0]

    if (selectingPieceRef.value === undefined) {
      selectingPieceRef.value = {
        pieceMotion: ['MOVE', { row, col }],
        piece
      }
    } else if (
      selectingPieceRef.value.pieceMotion[0] === 'PLACE' &&
      selectingPieceRef.value.piece.strength > piece.strength
    ) {
      const copy = cloneDeep(selectingPieceRef.value.piece)
      clear()
      return ['PLACED' as 'PLACED', copy]
    } else if (
      selectingPieceRef.value.pieceMotion[0] === 'MOVE' &&
      selectingPieceRef.value.piece.strength > piece.strength
    ) {
      const copy = cloneDeep(selectingPieceRef.value.piece)
      clear()
      return ['MOVED' as 'MOVED', copy]
    }
    // if (
    //   selectingPieceRef.value === undefined ||
    //   (selectingPieceRef.value.pieceMotion[0] === 'MOVE' &&
    //     selectingPieceRef.value.pieceMotion[1].row === row &&
    //     selectingPieceRef.value.pieceMotion[1].col === col)
    // ) {
    //   selectingPieceRef.value = {
    //     pieceMotion: ['MOVE', { row, col }],
    //     piece
    //   }
    // } else {
    //   clear()
    // }
  }

  const mutatePlace = (piece: Piece) => {
    const { id } = piece
    if (selectingPieceRef.value === undefined) {
    } else if (
      selectingPieceRef.value.pieceMotion[0] === 'PLACE' &&
      selectingPieceRef.value.piece.id === id
    ) {
      clear()
    } else {
      selectingPieceRef.value = {
        piece,
        pieceMotion: ['PLACE', undefined]
      }
    }
  }

  const clear = () => {
    selectingPieceRef.value = undefined
  }

  return {
    selectingPieceRef,
    mutateMove,
    mutatePlace
  }
}

export const useHoldingPieces = (player: Player) => {
  const gameRecordsRef = ref<GameRecord[]>([])

  const setGameRecordsOfHoldingPieces = (gameRecord: GameRecord[]) => {
    gameRecordsRef.value = gameRecord
  }

  // const init = (row: number, col: number, inRow: number, player: Player) => {
  //   holdingPiecesRef.value = generatePieces(row, col, inRow, player)
  // }
  const playerHands = computed(() => {
    return player === 'PLAYER1' ? 'player1Hands' : 'player2Hands'
  })

  const holdingPieces = computed(() => {
    if (!gameRecordsRef.value.length) return []
    return gameRecordsRef.value[0][playerHands.value]
  })

  const getPoppedPieces = (piece: Piece) => {
    if (gameRecordsRef.value.length) return

    return holdingPieces.value.filter((holdingPiece) => {
      return !(
        piece.id === holdingPiece.id && piece.owner === holdingPiece.owner
      )
    })
  }

  return {
    gameRecordsRef,
    setGameRecordsOfHoldingPieces,
    holdingPieces,
    generatePieces,
    getPoppedPieces
  }
}
