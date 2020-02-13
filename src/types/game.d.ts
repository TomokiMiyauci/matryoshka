import { Player } from '~/types/player'

export type Game = {
  id?: string
  rows: number
  cols: number
  nextPlayer: Player
  readyPlayers: Player[]
  winner?: Player | 'DRAW'
  createdAt?: firebase.firestore.FieldValue
}
