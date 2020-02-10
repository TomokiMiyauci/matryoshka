export type Playroom = {
  id?: string
  isClose?: boolean
  createdAt?: firebase.firestore.FieldValue
  games?: firebase.firestore.CollectionReference
}
