const winCombinations: [number, number][][] = [
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

export const isWin = (deepArray: (Element | {})[][]): boolean => {
  return winCombinations.some((winCombination) => {
    return winCombination.every((rowCol) => {
      const [row, col] = rowCol
      return Boolean(Object.keys(deepArray[row][col]).length)
    })
  })
}
