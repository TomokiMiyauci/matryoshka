export type Playroom = {
  id?: string
  isClose?: boolean
  player1Wins: number
  player2Wins: number
  round: number
  createdAt?: firebase.firestore.FieldValue
}
