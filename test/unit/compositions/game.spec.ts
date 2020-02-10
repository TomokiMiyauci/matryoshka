describe('test', () => {
  it('shoud', () => {})
})

// import {
//   isWin,
//   getTerritory,
//   isTopPiece,
//   isExistPiece
// } from '~/compositions/game'
// import { generateShallow, reshape } from '~/compositions/matrix'

// const PLAYER_1 = 'PLAYER_1' as 'PLAYER_1'
// const PLAYER_2 = 'PLAYER_2' as 'PLAYER_2'

// describe('isTopPiece', () => {
//   it('should return true if it gives as below', () => {
//     const piece = { id: 0, value: 1, player: PLAYER_1 }
//     const isTop = isTopPiece(piece, PLAYER_1)

//     expect(isTop).toBeTruthy()
//   })

//   it('should return false if it gives as below', () => {
//     const piece = { id: 0, value: 1, player: PLAYER_2 }
//     const isTop = isTopPiece(piece, PLAYER_1)

//     expect(isTop).toBeFalsy()
//   })
// })

// describe('isExistPiece', () => {
//   it('should return true if it gives as below', () => {
//     const piece = { id: 0, value: 1, player: PLAYER_1 }
//     const element = { row: 0, col: 0, value: [piece] }
//     const isExist = isExistPiece(element)

//     expect(isExist).toBeTruthy()
//   })
//   it('should return false if it gives as below', () => {
//     const element = { row: 0, col: 0, value: [] }
//     const isExist = isExistPiece(element)

//     expect(isExist).toBeFalsy()
//   })
// })

// describe('getTerritory', () => {
//   it('should return expect array if it gives as below', () => {
//     const matrix = [
//       [
//         {
//           row: 0,
//           col: 0,
//           value: [{ id: 0, value: 1, player: PLAYER_1 }]
//         }
//       ],
//       [
//         {
//           row: 1,
//           col: 0,
//           value: [{ id: 1, value: 2, player: PLAYER_1 }]
//         }
//       ]
//     ]

//     const actual = getTerritory(matrix, 'PLAYER_1')

//     expect(actual).toEqual(matrix)
//   })

//   it('should return expect array if it gives as below 2', () => {
//     const matrix = [
//       [
//         {
//           row: 0,
//           col: 0,
//           value: [{ id: 0, value: 1, player: PLAYER_1 }]
//         }
//       ],
//       [
//         {
//           row: 1,
//           col: 0,
//           value: [{ id: 1, value: 2, player: PLAYER_2 }]
//         }
//       ]
//     ]

//     const exp = [
//       [
//         {
//           row: 0,
//           col: 0,
//           value: [{ id: 0, value: 1, player: PLAYER_1 }]
//         }
//       ],
//       [{}]
//     ]

//     const actual = getTerritory(matrix, 'PLAYER_1')

//     expect(actual).toEqual(exp)
//   })

//   it('should return expect array if it gives as below 3', () => {
//     const matrix = [
//       [
//         {
//           row: 0,
//           col: 0,
//           value: [{ id: 0, value: 0, player: PLAYER_1 }]
//         },
//         {
//           row: 0,
//           col: 1,
//           value: [{ id: 1, value: 0, player: PLAYER_2 }]
//         },
//         {
//           row: 0,
//           col: 2,
//           value: [{ id: 2, value: 1, player: PLAYER_1 }]
//         }
//       ],
//       [
//         {
//           row: 1,
//           col: 0,
//           value: [{ id: 4, value: 2, player: PLAYER_2 }]
//         },
//         {
//           row: 1,
//           col: 1,
//           value: [{ id: 2, value: 1, player: PLAYER_1 }]
//         },
//         {
//           row: 1,
//           col: 2,
//           value: [{ id: 0, value: 0, player: PLAYER_2 }]
//         }
//       ]
//     ]

//     const exp = [
//       [
//         {},
//         {
//           row: 0,
//           col: 1,
//           value: [{ id: 1, value: 0, player: PLAYER_2 }]
//         },
//         {}
//       ],
//       [
//         {
//           row: 1,
//           col: 0,
//           value: [{ id: 4, value: 2, player: PLAYER_2 }]
//         },
//         {},
//         {
//           row: 1,
//           col: 2,
//           value: [{ id: 0, value: 0, player: PLAYER_2 }]
//         }
//       ]
//     ]

//     const actual = getTerritory(matrix, 'PLAYER_2')

//     expect(actual).toEqual(exp)
//   })

//   it('should return expect array if it gives as below 4', () => {
//     const matrix = [
//       [
//         {
//           row: 0,
//           col: 0,
//           value: [
//             { id: 0, value: 0, player: PLAYER_1 },
//             { id: 4, value: 2, player: PLAYER_2 }
//           ]
//         },
//         {
//           row: 0,
//           col: 1,
//           value: [{ id: 1, value: 0, player: PLAYER_2 }]
//         },
//         {
//           row: 0,
//           col: 2,
//           value: [{ id: 2, value: 1, player: PLAYER_1 }]
//         }
//       ],
//       [
//         {
//           row: 1,
//           col: 0,
//           value: [{ id: 4, value: 2, player: PLAYER_2 }]
//         },
//         {
//           row: 1,
//           col: 1,
//           value: [
//             { id: 2, value: 1, player: PLAYER_1 },
//             { id: 5, value: 2, player: PLAYER_2 }
//           ]
//         },
//         {
//           row: 1,
//           col: 2,
//           value: [{ id: 0, value: 0, player: PLAYER_2 }]
//         }
//       ]
//     ]

//     const exp = [
//       [
//         {},
//         {},
//         {
//           row: 0,
//           col: 2,
//           value: [{ id: 2, value: 1, player: PLAYER_1 }]
//         }
//       ],
//       [{}, {}, {}]
//     ]

//     const actual = getTerritory(matrix, 'PLAYER_1')

//     expect(actual).toEqual(exp)
//   })
// })

// describe('isWin', () => {
//   it('should return false in this case', () => {
//     const shallowArray = generateShallow(3, 3)
//     const array = reshape(shallowArray, 3)
//     const ter = getTerritory(array, PLAYER_1)

//     const isPlayer1Win = isWin(ter)

//     expect(isPlayer1Win).toBeFalsy()
//   })

//   it('should return true in this case 2', () => {
//     const shallowArray = generateShallow(3, 3)
//     const matrix = reshape(shallowArray, 3)
//     const piece = { id: 0, value: 1, player: PLAYER_1 }
//     matrix[0][0].value.push(piece)
//     matrix[1][0].value.push(piece)
//     matrix[2][0].value.push(piece)
//     const ter = getTerritory(matrix, PLAYER_1)

//     const isPlayer1Win = isWin(ter)

//     expect(isPlayer1Win).toBeTruthy()
//   })

//   it('should return true in this case 3', () => {
//     const shallowArray = generateShallow(3, 3)
//     const matrix = reshape(shallowArray, 3)
//     const piece1 = { id: 0, value: 1, player: PLAYER_1 }
//     const piece2 = { id: 0, value: 1, player: PLAYER_2 }
//     matrix[0][0].value.push(piece1)
//     matrix[1][0].value.push(piece2)
//     matrix[2][0].value.push(piece1)
//     const ter = getTerritory(matrix, PLAYER_1)

//     const isPlayer1Win = isWin(ter)

//     expect(isPlayer1Win).toBeFalsy()
//   })

//   it('should return true in this case 4', () => {
//     const shallowArray = generateShallow(3, 3)
//     const matrix = reshape(shallowArray, 3)
//     const piece1 = { id: 0, value: 1, player: PLAYER_1 }
//     const piece2 = { id: 0, value: 1, player: PLAYER_2 }
//     matrix[0][0].value.push(piece1)
//     matrix[0][0].value.push(piece2)
//     matrix[1][0].value.push(piece1)
//     matrix[2][0].value.push(piece1)
//     const ter = getTerritory(matrix, PLAYER_1)

//     const isPlayer1Win = isWin(ter)

//     expect(isPlayer1Win).toBeFalsy()
//   })

//   it('should return true in this case 5', () => {
//     const shallowArray = generateShallow(3, 3)
//     const matrix = reshape(shallowArray, 3)
//     const piece1 = { id: 0, value: 1, player: PLAYER_1 }
//     const piece2 = { id: 0, value: 1, player: PLAYER_2 }
//     matrix[0][0].value.push(piece1)
//     matrix[0][0].value.push(piece2)
//     matrix[1][1].value.push(piece2)
//     matrix[2][2].value.push(piece2)
//     const ter = getTerritory(matrix, PLAYER_2)

//     const isPlayer1Win = isWin(ter)

//     expect(isPlayer1Win).toBeTruthy()
//   })
// })
