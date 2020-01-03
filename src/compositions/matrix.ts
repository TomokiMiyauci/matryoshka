import { Matrix, Element } from '~/types/piece'

export function generateShallow(rows: number, cols: number): Matrix {
  const shallowMatrix = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      shallowMatrix.push({ row, col, value: [] })
    }
  }
  return shallowMatrix
}

export function reshape(array: Matrix, part: number): Element[][] {
  const tmp = []
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part))
  }
  return tmp
}
