import { Player } from '~/types/player'

type GameRecord = {
  board: Element[]
  player1Hands: Piece[]
  player2Hands: Piece[]
}

export type Element = {
  row: number
  col: number
  pieces: Piece[]
}

type Piece = {
  id: number
  strength: number
  owner: Player
}
