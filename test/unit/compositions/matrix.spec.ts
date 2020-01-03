import { generateShallow, reshape } from '~/compositions/matrix'

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
