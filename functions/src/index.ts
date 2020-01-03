import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { generateShallow, reshape } from '~/compositions/matrix'

admin.initializeApp()

const winCombinations = [
  [
    [0, 0],
    [0, 1],
    [0, 2]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2]
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1]
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2]
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0]
  ]
]

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
    if (deepLatestBoard === undefined) return
    // const win: boolean = isWin(deepLatestBoard)
    // console.log('isWin', win)
    const territoryOfPlayer1 = filterByPlayer(deepLatestBoard, 'PLAYER_1')
    const territoryOfPlayer2 = filterByPlayer(deepLatestBoard, 'PLAYER_2')
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

type players = 'PLAYER_1' | 'PLAYER_2'

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
// type judgement = 'DRAW' & player

function filterByPlayer(deepArray: matrix[][], player: players): matrix[][] {
  if (!deepArray) return []
  return deepArray.map((rowCol) => {
    return rowCol.filter((value) => {
      if (!('value' in value) || !value.value.length) return false

      return value.value.slice(-1)[0].player === player
    })
  })
}

function isWin(deepArray: matrix[][]): boolean {
  if (!deepArray) return false
  return winCombinations.some((winCombination) => {
    const a = winCombination.every((rowCol) => {
      const [row, col] = rowCol
      return Boolean(deepArray[row][col])
    })

    if (a) console.log('this is error', winCombination, 'ohh my god', deepArray)

    return a
    // const fulfill: boolean = winCombination.every((rowCol) => {
    //   return deepArray[rowCol[0]][rowCol[1]].value.length
    // })
    // if (!fulfill) return false

    // const [row, col] = winCombination[0]
    // const [row1, col1] = winCombination[1]
    // const [row2, col2] = winCombination[2]
    // const matrix0 = deepArray[row][col].value.slice(-1)[0].player
    // const matrix1 = deepArray[row1][col1].value.slice(-1)[0].player
    // const matrix2 = deepArray[row2][col2].value.slice(-1)[0].player
    // return matrix0 && matrix0 === matrix1 && matrix0 === matrix2
  })
}

type piece = {
  id: number
  number: number
  player: string
}

interface matrix {
  row: number
  col: number
  value: piece[]
}

// type shallow = matrix[]

// function deepen(
//   row: number,
//   col: number,
//   shallowArray: shallow
// ): matrix[][] | undefined {
//   /**
//    * latestBoardをDeep Arrayに変換する。
//    * latestBoardが[]の場合はundefinedを返す
//    * @type {Array | undefined}
//    */
//   const latestBoard = shallowArray
//   if (!latestBoard.length) return undefined

//   const arr = new Array(row).fill(undefined).map(() => new Array(0))
//   latestBoard.forEach((obj) => {
//     arr[obj.row].push(obj)
//   })

//   return arr
// }

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
