import { generateShallow, reshape, push } from '~/compositions/matrix'

const PLAYER_1 = 'PLAYER_1' as 'PLAYER_1'
const PLAYER_2 = 'PLAYER_2' as 'PLAYER_2'

describe('generateShallow', () => {
  it('should generate shallow array and return', () => {
    const actual = generateShallow(3, 4)
    const exp = [
      { row: 0, col: 0, value: [] },
      { row: 0, col: 1, value: [] },
      { row: 0, col: 2, value: [] },
      { row: 0, col: 3, value: [] },
      { row: 1, col: 0, value: [] },
      { row: 1, col: 1, value: [] },
      { row: 1, col: 2, value: [] },
      { row: 1, col: 3, value: [] },
      { row: 2, col: 0, value: [] },
      { row: 2, col: 1, value: [] },
      { row: 2, col: 2, value: [] },
      { row: 2, col: 3, value: [] }
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
        { row: 0, col: 0, value: [] },
        { row: 0, col: 1, value: [] },
        { row: 0, col: 2, value: [] }
      ],
      [
        { row: 1, col: 0, value: [] },
        { row: 1, col: 1, value: [] },
        { row: 1, col: 2, value: [] }
      ],
      [
        { row: 2, col: 0, value: [] },
        { row: 2, col: 1, value: [] },
        { row: 2, col: 2, value: [] }
      ]
    ]

    expect(actual).toEqual(exp)
  })
})

describe('push', () => {
  it('should ', () => {
    const shallowArray = generateShallow(1, 1)
    const matrix = reshape(shallowArray, 1)
    const piece = { id: 0, value: 1, player: PLAYER_1 }
    matrix[0][0].value.push(piece)

    expect(matrix[0][0].value[0]).toEqual(piece)
  })
})
