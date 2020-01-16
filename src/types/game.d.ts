import { Player } from '~/types/player'

export type Game = {
  rows: number
  cols: number
  nextPlayer: Player
  readyPlayers: Player[]
  winner: Player
  gameRecord?: firebase.firestore.CollectionReference
  createdAt?: firebase.firestore.FieldValue
}
