export default {
  latestMove(state) {
    return state.history[state.turn].squares
  },

  fullHistory(state) {
    return state.history
  },

  latestBoard(state) {
    return state.history.slice(-1)[0].squares.slice()
  },

  willBeNextBoard: (state, getters) => (payload) => {
    const willBeNextBoard = getters.latestBoard
    const nextPiece = getters.turnPlayer === 'PLAYER_1' ? 'X' : 'O'
    willBeNextBoard.splice(payload, 1, nextPiece)
    return willBeNextBoard
  },

  turnPlayer(state) {
    return state.turnPlayer
  },

  nextTurnPlayer(state, getters) {
    return getters.turnPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
  },

  canPlacePeices(state, getters) {
    const canPlacePeices = getters.latestBoard.map((element, index, array) => {
      return !element ? index : null
    })
    return canPlacePeices
  },

  placeable: (state, getters) => (payload) => {
    return getters.canPlacePeices.includes(payload)
  }
}
