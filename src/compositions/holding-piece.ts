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

export const useSelectingPiece = () => {
  const selectingPieceRef = ref<SelectingPiece>()

  const mutateMove = (element: Element) => {
    const { row, col, pieces } = element
    const piece = pieces.slice(-1)[0]
    console.log(piece)

    if (selectingPieceRef.value === undefined && !pieces.length) return

    if (selectingPieceRef.value === undefined) {
      selectingPieceRef.value = {
        pieceMotion: ['MOVE', { row, col }],
        piece
      }
    } else {
      switch (selectingPieceRef.value.pieceMotion[0]) {
        case 'PLACE': {
          if (
            !pieces.length ||
            selectingPieceRef.value.piece.strength > piece.strength
          ) {
            const copy = cloneDeep(selectingPieceRef.value.piece)
            clear()
            return ['PLACED', copy] as ['PLACED', Piece]
          }
          break
        }
        case 'MOVE': {
          if (
            !pieces.length ||
            selectingPieceRef.value.piece.strength > piece.strength
          ) {
            const rowCol = cloneDeep(selectingPieceRef.value.pieceMotion[1])
            const copyPiece = cloneDeep(selectingPieceRef.value.piece)
            clear()
            return ['MOVED', copyPiece, rowCol] as ['MOVED', Piece, RowCol]
          } else if (selectingPieceRef.value.piece.id === piece.id) {
            clear()
          }
          break
        }
      }
    }
  }

  const mutatePlace = (piece: Piece) => {
    const { id } = piece
    if (selectingPieceRef.value === undefined) {
      selectingPieceRef.value = {
        piece,
        pieceMotion: ['PLACE', undefined]
      }
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

  const nextStrength = computed(() => {
    return selectingPieceRef.value?.piece.strength
  })

  return {
    selectingPieceRef,
    mutateMove,
    mutatePlace,
    nextValue: nextStrength
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

  const opponentHands = computed(() => {
    return player === 'PLAYER1' ? 'player2Hands' : 'player1Hands'
  })

  const holdingPieces = computed(() => {
    if (!gameRecordsRef.value.length) return []
    return gameRecordsRef.value[0][playerHands.value]
  })

  const getPoppedPieces = (piece: Piece) => {
    return holdingPieces.value.filter((holdingPiece) => {
      return !(
        piece.id === holdingPiece.id && piece.owner === holdingPiece.owner
      )
    })
  }

  const getOpponentHands = () => {
    return gameRecordsRef.value[0][opponentHands.value]
  }

  const getPlayerHands = (player: Player) => {
    return gameRecordsRef.value[0][
      player === 'PLAYER1' ? 'player1Hands' : 'player2Hands'
    ]
  }

  return {
    gameRecordsRef,
    setGameRecordsOfHoldingPieces,
    holdingPieces,
    generatePieces,
    getPoppedPieces,
    getOpponentHands,
    getPlayerHands
  }
}
