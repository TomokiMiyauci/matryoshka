import { computed, ref } from '@vue/composition-api'
import firebase from '~/plugins/firebase'
import { Game } from '~/types/game'
import { useFirestorePlayroom } from '~/repositories/playroom'

export const useFirestoreGame = (playroomId: string, gameId?: string) => {
  const { playroomDocumentReference } = useFirestorePlayroom(playroomId)
  const gameIdRef = ref(gameId || '')

  const gameCollectionReference = computed(() => {
    return playroomDocumentReference.value.collection('games')
  })

  const gameDocumentReference = computed(() => {
    return gameCollectionReference.value.doc(gameIdRef.value)
  })

  const createGame = async (data: Game) => {
    const documentData = await gameCollectionReference.value.add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    gameIdRef.value = documentData.id
    return documentData
  }

  const updateGame = (data: Game) => {
    return playroomDocumentReference.value.update(data)
  }

  return {
    gameIdRef,
    gameCollectionReference,
    gameDocumentReference,
    createGame,
    updateGame
  }
}
