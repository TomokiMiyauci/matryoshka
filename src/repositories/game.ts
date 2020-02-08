import { computed, ref, reactive } from '@vue/composition-api'
import firebase from '~/plugins/firebase'
import { Game } from '~/types/game'
import { useFirestorePlayroom } from '~/repositories/playroom'

export const useFirestoreGame = (playroomId?: string, gameId?: string) => {
  const { playroomDocumentReference, setPlayroomId } = useFirestorePlayroom(
    playroomId
  )

  const gameIdRef = ref(gameId || '')

  const state = reactive({
    id: '',
    path: ''
  })

  const gameCollectionReference = computed(() => {
    return playroomDocumentReference.value.collection('games')
  })

  const gameDocumentReference = computed(() => {
    return gameCollectionReference.value.doc(gameIdRef.value)
  })

  const setGameId = (gameId: string) => {
    gameIdRef.value = gameId
  }

  const createGame = async (
    documentReference: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    data: Game
  ) => {
    const documentData = await documentReference.collection('game').add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    state.id = documentData.id
    state.path = documentData.path

    gameIdRef.value = documentData.id
    return documentData
  }

  const updateGame = (
    documentReference: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    data: Game
  ) => {
    return documentReference.update(data)
  }

  return {
    gameIdRef,
    gameCollectionReference,
    gameDocumentReference,
    setGameId,
    setPlayroomId,
    createGame,
    updateGame
  }
}
