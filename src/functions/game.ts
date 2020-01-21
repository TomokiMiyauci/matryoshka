import { Matrix, Element, Player, Piece } from '~/types/piece'

const winCombinations = [
  [
    [0, 0],
    [0, 1],
    [0, 2]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2]
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1]
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2]
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0]
  ]
]

export function isTopPiece(piece: Piece, player: Player): boolean {
  return piece.player === player
}

export function isExistPiece(element: Element): boolean {
  return !!element.value.length
}

export function isWin(deepArray: object[][]): boolean {
  return winCombinations.some((winCombination) => {
    return winCombination.every((rowCol) => {
      const [row, col] = rowCol
      return Boolean(Object.keys(deepArray[row][col]).length)
    })
  })
}

export function getTerritory(matrix: Matrix, player: Player): object[][] {
  return matrix.map((rows) => {
    return rows.map((element) => {
      if (!isExistPiece(element)) return {}
      return isTopPiece(element.value.slice(-1)[0], player) ? element : {}
    })
  })
}
