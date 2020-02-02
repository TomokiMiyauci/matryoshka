import { Player } from '~/types/player'

export type Game = {
  id?: string
  rows: number
  cols: number
  nextPlayer: Player
  readyPlayers: Player[]
  winner?: Player | 'DRAW'
  gameRecord?: firebase.firestore.CollectionReference
  createdAt?: firebase.firestore.FieldValue
}
