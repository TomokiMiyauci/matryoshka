import { reactive, toRefs } from '@vue/composition-api'
import firebase, { firestore } from '~/plugins/firebase'
import { Document } from '~/types/document'

type Reference =
  | firebase.firestore.Query<firebase.firestore.DocumentData>
  | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

export const subscribe = (
  reactiveState: Document<firebase.firestore.DocumentData>,
  collectionRef: Reference
) => {
  const state = reactive<Document<firebase.firestore.DocumentData>>({
    id: '',
    path: '',
    data: undefined
  })

  const unsubscribe = firestore
  collectionRef.onSnapshot((snapshot) => {
    if (snapshot.empty) {
      reactiveState.data = undefined
      reactiveState.id = ''
      reactiveState.path = ''
      return
    }

    snapshot.docChanges().forEach((change) => {
      const { id, ref } = change.doc

      reactiveState.id = id
      reactiveState.path = ref.path
      reactiveState.data = change.doc.data()

      state.id = id
      state.path = ref.path
      state.data = change.doc.data()
    })
  })

  return { unsubscribe, ...toRefs(state) }
}
