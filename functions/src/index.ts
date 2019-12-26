import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

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


export const testFunc =
  functions.firestore.document('todos/{id}').onUpdate((change, context)=>{
    const id:string = context.params.id
    if(id !== 'HO8cX8IFtTDOR1E7lpPb')return

    const data = change.after.data()
    const previousData = change.before.data()
    console.log('start')

    if(data === undefined || previousData === undefined || data.history.length <=2 || 'winner' in data || 'winner' in previousData)return
    if(data.winner)return

    const deepLatestBoard = deepen(3,3,data.history.slice(-1)[0].squars)
    const win:boolean = isWin(deepLatestBoard)
    console.log('isWin',win);
    if(win){
      return change.after.ref.set(
        { winner: true},
        { merge: true }
        )
      }else{
        return undefined
      }
  })

function isWin(deepArray:any):boolean {
  if (!deepArray) return false
  return winCombinations.some((winCombination) => {
    const fulfill:boolean = winCombination.every((rowCol) => {
      return deepArray[rowCol[0]][rowCol[1]].value.length
    })
    if (!fulfill) return

    const [row, col] = winCombination[0]
    const [row1, col1] = winCombination[1]
    const [row2, col2] = winCombination[2]
    const matrix0 = deepArray[row][col].value.slice(-1)[0].player
    const matrix1 =deepArray[row1][col1].value.slice(-1)[0]
      .player
    const matrix2 =deepArray[row2][col2].value.slice(-1)[0]
      .player
    return matrix0 && matrix0 === matrix1 && matrix0 === matrix2
  })
}

type matrix ={
  row:number,
  col:number,
  value:object[]
}

function deepen(row:number,col:number,shallowArray:matrix[]):object[][]| undefined{
    /**
     * latestBoardをDeep Arrayに変換する。
     * latestBoardが[]の場合はundefinedを返す
     * @type {Array | undefined}
     */
    const latestBoard = shallowArray
    if (!latestBoard.length) return undefined

    const arr = new Array(row).fill(undefined).map(() => new Array(0))
    latestBoard.forEach((obj) => {
      arr[obj.row].push(obj)
    })

    return arr
}
