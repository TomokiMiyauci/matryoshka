import { computed, ref, reactive } from '@vue/composition-api'
import firebase, { firestore } from '~/plugins/firebase'
import { Playroom } from '~/types/playroom'

export const useFirestorePlayroom = (playroomId?: string) => {
  const playroomIdRef = ref(playroomId || '')
  const state = reactive({ path: '' })

  const playroomCollectionReference = computed(() => {
    return firestore.collection('test')
  })

  const playroomDocumentReference = computed(() => {
    return playroomCollectionReference.value.doc(playroomIdRef.value)
  })

  const documentReferenceRef = computed(() => {
    return firestore.doc(state.path)
  })

  const setPlayroomId = (playroomId: string) => {
    playroomIdRef.value = playroomId
  }

  const setPlayroomPath = (playroomPath: string) => {
    state.path = playroomPath
  }

  const createPlayroom = async (data: Playroom) => {
    const documentData = await playroomCollectionReference.value.add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    playroomIdRef.value = documentData.id
    state.path = documentData.path
    return documentData
  }

  const updatePlayroom = (data: Playroom) => {
    return playroomDocumentReference.value.update(data)
  }

  return {
    documentReferenceRef,
    playroomIdRef,
    setPlayroomId,
    setPlayroomPath,
    playroomCollectionReference,
    playroomDocumentReference,
    createPlayroom,
    updatePlayroom
  }
}
