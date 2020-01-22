import { computed, ref } from '@vue/composition-api'
import firebase from '~/plugins/firebase'
import { GameRecord } from '~/types/game-record'
import { useFirestoreGame } from '~/repositories/game'

export const useFirestoreGameRecord = (
  playroomId: string,
  gameId: string,
  gameRecordId?: string
) => {
  const { gameDocumentReference } = useFirestoreGame(playroomId, gameId)
  const gameRecordIdRef = ref(gameRecordId || '')

  const gameRecordCollectionReference = computed(() => {
    return gameDocumentReference.value.collection('gameRecords')
  })

  const gameRecordDocumentReference = computed(() => {
    return gameRecordCollectionReference.value.doc(gameRecordIdRef.value)
  })

  const createGameRecord = async (data: GameRecord) => {
    const documentData = await gameRecordCollectionReference.value.add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    gameRecordIdRef.value = documentData.id
    return documentData
  }

  const updateGameRecord = (data: GameRecord) => {
    return gameRecordDocumentReference.value.update(data)
  }

  const addGameRecord = async (data: GameRecord) => {
    const documentData = await gameRecordCollectionReference.value.add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return {
    gameRecordIdRef,
    gameRecordCollectionReference,
    gameRecordDocumentReference,
    createGameRecord,
    updateGameRecord,
    addGameRecord
  }
}
