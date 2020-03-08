import { Player } from '~/types/player'

export type Playroom = {
  id?: string
  isClose?: boolean
  player1Wins: number
  player2Wins: number
  order: Player | 'RANDOM'
  round: number
  people?: string[]
  createdAt?: firebase.firestore.FieldValue
}
