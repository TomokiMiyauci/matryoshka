import { generateShallow, reshape } from '~/functions/matrix'

const PLAYER1 = 'PLAYER1' as 'PLAYER1'

describe('generateShallow', () => {
  it('should generate shallow array and return', () => {
    const actual = generateShallow(3, 4)
    const exp = [
      { row: 0, col: 0, pieces: [] },
      { row: 0, col: 1, pieces: [] },
      { row: 0, col: 2, pieces: [] },
      { row: 0, col: 3, pieces: [] },
      { row: 1, col: 0, pieces: [] },
      { row: 1, col: 1, pieces: [] },
      { row: 1, col: 2, pieces: [] },
      { row: 1, col: 3, pieces: [] },
      { row: 2, col: 0, pieces: [] },
      { row: 2, col: 1, pieces: [] },
      { row: 2, col: 2, pieces: [] },
      { row: 2, col: 3, pieces: [] }
    ]

    expect(actual).toEqual(exp)
  })
})

describe('reshape', () => {
  it('should reshape shallow array to deep array', () => {
    const shallowArray = generateShallow(3, 3)
    const actual = reshape(shallowArray, 3)
    const exp = [
      [
        { row: 0, col: 0, pieces: [] },
        { row: 0, col: 1, pieces: [] },
        { row: 0, col: 2, pieces: [] }
      ],
      [
        { row: 1, col: 0, pieces: [] },
        { row: 1, col: 1, pieces: [] },
        { row: 1, col: 2, pieces: [] }
      ],
      [
        { row: 2, col: 0, pieces: [] },
        { row: 2, col: 1, pieces: [] },
        { row: 2, col: 2, pieces: [] }
      ]
    ]

    expect(actual).toEqual(exp)
  })
})

describe('push', () => {
  it('should ', () => {
    const shallowArray = generateShallow(1, 1)
    const matrix = reshape(shallowArray, 1)
    const piece = { id: 0, strength: 1, owner: PLAYER1 }
    matrix[0][0].pieces.push(piece)

    expect(matrix[0][0].pieces[0]).toEqual(piece)
  })
})
