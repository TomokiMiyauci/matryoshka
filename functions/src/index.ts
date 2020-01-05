import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isWin, getTerritory } from '~/compositions/game'
import { generateShallow, reshape } from '~/compositions/matrix'
admin.initializeApp()

export const testFunc = functions
  .region('asia-northeast1')
  .firestore.document('playrooms/{playroomId}/games/{gameId}')
  .onUpdate(async (change, context) => {
    // const id: string = context.params.id
    // if (id !== 'HO8cX8IFtTDOR1E7lpPb') return

    const data = change.after.data()
    const previousData = change.before.data()
    console.log('start')

    if (
      data === undefined ||
      previousData === undefined ||
      data.history.length <= 2 ||
      'winner' in data ||
      data.winner ||
      'winner' in previousData ||
      previousData.winner
    )
      return

    const deepLatestBoard = reshape(data.history.slice(-1)[0].squares, 3)
    const territoryOfPlayer1 = getTerritory(deepLatestBoard, 'PLAYER_1')
    const territoryOfPlayer2 = getTerritory(deepLatestBoard, 'PLAYER_2')
    const isWinPlayer1 = isWin(territoryOfPlayer1)
    const isWinPlayer2 = isWin(territoryOfPlayer2)

    if (isWinPlayer1 || isWinPlayer2) {
      const datas = generateInit(3, 3)
      await addToSubdocument(
        'playrooms',
        context.params.playroomId,
        'games',
        datas
      )
    }

    if (isWinPlayer1 && isWinPlayer2) {
      return change.after.ref.set({ winner: 'DRAW' }, { merge: true })
    } else if (isWinPlayer1) {
      return change.after.ref.set({ winner: 'PLAYER_1' }, { merge: true })
    } else if (isWinPlayer2) {
      return change.after.ref.set({ winner: 'PLAYER_2' }, { merge: true })
    }

    return null
  })

async function addToSubdocument(
  collectionName: string,
  docName: string,
  subCollectionName: string,
  data: any
) {
  console.log('starttttttttt')

  await admin
    .firestore()
    .collection(collectionName)
    .doc(docName)
    .collection(subCollectionName)
    .add(data)
    .catch((e) => {
      console.log(e)
    })
  console.log('eeeeett')
}

function generateInit(rows: number, cols: number) {
  return {
    history: [{ squares: generateShallow(rows, cols) }],
    rows,
    cols,
    timestamp,
    readyPlayers: [],
    nextPlayer: 'PLAYER_1'
  }
}

const timestamp = admin.firestore.FieldValue.serverTimestamp()
