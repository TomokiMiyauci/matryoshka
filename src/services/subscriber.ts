import { reactive, toRefs } from '@vue/composition-api'
import firebase, { firestore } from '~/plugins/firebase'
import { Document } from '~/types/document'

type Reference =
  | firebase.firestore.Query<firebase.firestore.DocumentData>
  | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

export const subscribe = (
  reactiveState: Document,
  collectionRef: Reference
) => {
  const state = reactive<Document>({
    id: '',
    data: undefined,
    path: ''
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

      reactiveState.data = change.doc.data()
      reactiveState.id = id
      reactiveState.path = ref.path

      state.data = change.doc.data()
      state.id = id
      state.path = ref.path
    })
  })

  return { unsubscribe, ...toRefs(state) }
}
