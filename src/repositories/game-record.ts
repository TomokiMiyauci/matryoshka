import { computed, ref } from '@vue/composition-api'
import firebase from '~/plugins/firebase'
import { GameRecord } from '~/types/game-record'
import { useFirestoreGame } from '~/repositories/game'

export const useFirestoreGameRecord = (
  playroomId?: string,
  gameId?: string,
  gameRecordId?: string
) => {
  const { gameDocumentReference, setPlayroomId, setGameId } = useFirestoreGame(
    playroomId,
    gameId
  )
  const gameRecordIdRef = ref(gameRecordId || '')

  const gameRecordCollectionReference = computed(() => {
    return gameDocumentReference.value.collection('gameRecords')
  })

  const gameRecordDocumentReference = computed(() => {
    return gameRecordCollectionReference.value.doc(gameRecordIdRef.value)
  })

  const setGameRecordId = (gameRecordId: string) => {
    gameRecordIdRef.value = gameRecordId
  }

  const createGameRecord = async (
    documentReference: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    data: Readonly<GameRecord>
  ) => {
    const documentData = await documentReference.collection('gameRecord').add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    gameRecordIdRef.value = documentData.id
    return documentData
  }

  const updateGameRecord = (
    documentReference: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    data: Readonly<GameRecord>
  ) => {
    return documentReference.update(data)
  }

  const addGameRecord = async (
    collectionReference: firebase.firestore.CollectionReference<
      firebase.firestore.DocumentData
    >,
    data: Readonly<GameRecord>
  ) => {
    const documentData = await collectionReference.add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    return documentData
  }

  return {
    gameRecordIdRef,
    gameRecordCollectionReference,
    gameRecordDocumentReference,
    createGameRecord,
    updateGameRecord,
    addGameRecord,
    setPlayroomId,
    setGameId,
    setGameRecordId
  }
}
