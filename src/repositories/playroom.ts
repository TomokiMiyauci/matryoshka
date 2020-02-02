import { computed, ref } from '@vue/composition-api'
import firebase, { firestore } from '~/plugins/firebase'
import { Playroom } from '~/types/playroom'

export const useFirestorePlayroom = (playroomId?: string) => {
  const playroomIdRef = ref(playroomId || '')

  const playroomCollectionReference = computed(() => {
    return firestore.collection('test')
  })

  const playroomDocumentReference = computed(() => {
    return playroomCollectionReference.value.doc(playroomIdRef.value)
  })

  const setPlayroomId = (playroomId: string) => {
    playroomIdRef.value = playroomId
  }

  const createPlayroom = async (data: Playroom) => {
    const documentData = await playroomCollectionReference.value.add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    playroomIdRef.value = documentData.id
    return documentData
  }

  const updatePlayroom = (data: Playroom) => {
    return playroomDocumentReference.value.update(data)
  }

  return {
    playroomIdRef,
    setPlayroomId,
    playroomCollectionReference,
    playroomDocumentReference,
    createPlayroom,
    updatePlayroom
  }
}
