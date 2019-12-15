import firebase from '~/plugins/firebase'

const timestamp = firebase.firestore.FieldValue.serverTimestamp()
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

function generateShallowMatrix(row, col) {
  const matrix = []
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      matrix.push({ row: r, col: c, value: null })
    }
  }
  return matrix
}

function matrixify(shallowArray, rows, cols) {
  const deepArray = []
  let count = 0

  for (let r = 0; r < rows; r++) {
    deepArray.push([])
    for (let c = 0; c < cols; c++) {
      deepArray[r].push(shallowArray[count])
      count++
    }
  }
  return deepArray
}

function flatten(deepArray) {
  return deepArray.flat()
}

export default {
  game(state) {
    return state.game
  },

  rows() {
    return 3
  },

  cols() {
    return 3
  },

  deepLatestBoard(state, getters) {
    const { rows, cols } = getters
    const shallowLatestBoard = getters.latestBoard
    const deepLatestBoard = matrixify(shallowLatestBoard, rows, cols)

    return deepLatestBoard
  },

  latestGame(state, getters) {
    // console.log('latestgame', JSON.stringify(getters.game))
    // console.log('latestgame', typeof getters.game)
    // console.log('latestgame', getters.game[0])

    return getters.game[0]
  },

  round(state, getters) {
    return getters.game.length
  },

  nextRound(state, getters) {
    return getters.round + 1
  },

  latestBoard(state, getters) {
    const latestGame = getters.latestGame
    // console.log('latestGame', latestGame)
    if (latestGame) {
      return latestGame.history.slice(-1)[0].squares.slice()
    }
    return []
  },

  latestPlayer(state, getters) {
    const latestGame = getters.latestGame
    if (latestGame) {
      return latestGame.history.slice(-1)[0].player || 'PLAYER_1'
    }
    return []
  },

  winner(state, getters) {
    const latestGame = getters.latestGame
    if (latestGame) {
      return latestGame.winner
    }
  },

  willBeNextShallowBoard: (state, getters) => (payload) => {
    const willBeNextBoard = getters.willBeNextDeepBoard(payload)
    const willBeNextShallowBoard = flatten(willBeNextBoard)

    // const nextPiece = getters.turnPlayer === 'PLAYER_1' ? 'X' : 'O'
    return willBeNextShallowBoard
  },

  willBeNextDeepBoard: (state, getters) => (payload) => {
    const { row, col } = payload
    const willBeNextDeepBoard = getters.deepLatestBoard
    willBeNextDeepBoard[row].splice(col, 1, payload)
    return willBeNextDeepBoard
  },

  willBeNextDeepBoardByMove: (state, getters) => (from, to, value) => {
    const willBeNextDeepBoard = getters.deepLatestBoard.concat()
    // const from = { row: 0, col: 0 }
    // const to = { row: 1, col: 1 }
    willBeNextDeepBoard[from.row].splice(from.col, 1, { ...from, value: null })
    willBeNextDeepBoard[to.row].splice(to.col, 1, {
      ...to,
      ...value
    })
    // console.log('ss', willBeNextDeepBoard)

    return willBeNextDeepBoard
  },

  willBeNextShallowBoardByMove: (state, getters) => (from, to, value) => {
    const willBeNextDeepBoardByMove = getters.willBeNextDeepBoardByMove(
      from,
      to,
      value
    )
    const willBeNextShallowBoardByMove = flatten(willBeNextDeepBoardByMove)

    return willBeNextShallowBoardByMove
  },

  turnPlayer(state, getters) {
    return getters.latestPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
  },

  nextTurnPlayer(state, getters) {
    return getters.turnPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
  },

  canPlacePeices(state, getters) {
    // this function is duty.I try to research for good way.
    const result = getters.latestBoard.reduce(
      (accumulator, currentValue, index) => {
        if (currentValue === null) {
          accumulator.push(index)
        }
        return accumulator
      },
      []
    )

    return result
  },

  placeable: (state, getters) => (payload) => {
    return getters.canPlacePeices.includes(payload)
  },

  cannotPlace(state, getters) {
    return !getters.canPlacePeices.length
  },

  playroomId(state, getters, rootState, rootGetters) {
    return rootGetters['playroom/id']
  },

  players(state, getters, rootState, rootGetters) {
    return rootGetters['playroom/players']
  },

  playerName(state, getters, rootState, rootGetters) {
    return rootGetters['player/name']
  },

  readyToStart(state, getters) {
    return getters.players >= 2
  },

  selectingPiece(state) {
    return state.selectingPiece
  },

  generateInitValue: (state, getters) => {
    const { rows, cols } = getters
    return {
      history: [
        {
          squares: generateShallowMatrix(rows, cols)
        }
      ],
      rows,
      cols,
      timestamp,
      readyPlayers: ['PLAYER_1']
    }
  },

  holdingPieces(state) {
    return state.holdingPieces
  },

  isSelecting(state, getters) {
    return !!getters.selectingPiece
  },

  latestPiece: (state, getters) => (row, col) => {
    const deepLatestBoard = getters.deepLatestBoard
    const latestPiece = deepLatestBoard[row][col]
    return latestPiece
  },

  bases: (state, getters) => (playerName) => {
    const deepLatestBoard = flatten(getters.deepLatestBoard)
    if (deepLatestBoard.length === 0) return
    return deepLatestBoard.filter((deep) => {
      return deep.player === playerName
    })
  },

  isWin: (state, getters) => (playerName) => {
    const bases = getters.bases(playerName)
    if (bases.length === 0) return
    return winCombinations.some((winCombination) => {
      return winCombination.every((matrix) => {
        return bases.some((square) => {
          return (
            matrix[0] === square.row &&
            matrix[1] === square.col &&
            !!square.value
          )
        })
      })
    })
  }
}
