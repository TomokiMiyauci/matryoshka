import firebase from '~/plugins/firebase'

const timestamp = firebase.firestore.FieldValue.serverTimestamp()

function generateShallowMatrix(row, col) {
  const matrix = []
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      matrix.push({ row: r, col: c, value: null })
    }
  }
  return matrix
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
    const rows = getters.rows
    const cols = getters.cols
    const deepLatestBoard = []
    const shallowLatestBoard = getters.latestBoard

    let count = 0

    for (let r = 0; r < rows; r++) {
      deepLatestBoard.push([])
      for (let c = 0; c < cols; c++) {
        deepLatestBoard[r].push(shallowLatestBoard[count])
        count++
      }
    }
    // console.log(deepLatestBoard)

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
    const willBeNextShallowBoard = []

    willBeNextBoard.forEach((rows) => {
      rows.forEach((cols) => {
        willBeNextShallowBoard.push(cols)
      })
    })
    // const nextPiece = getters.turnPlayer === 'PLAYER_1' ? 'X' : 'O'
    return willBeNextShallowBoard
  },

  willBeNextDeepBoard: (state, getters) => (payload) => {
    const { row, col } = payload
    const willBeNextDeepBoard = getters.deepLatestBoard
    willBeNextDeepBoard[row].splice(col, 1, payload)
    return willBeNextDeepBoard
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

  readyToStart(state, getters) {
    return getters.players >= 2
  },

  selectedPiece(state) {
    return state.selectedPiece
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
  }
}
