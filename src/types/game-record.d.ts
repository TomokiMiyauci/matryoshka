import { Player } from '~/types/player'

export type GameRecord = {
  board: Element[]
  player1Hands: Piece[]
  player2Hands: Piece[]
}

export type Element = {
  pieces: Piece[]
} & RowCol

export type Piece = {
  id: number
  strength: number
  owner: Player
}

export type RowCol = {
  row: number
  col: number
}
