export default {
  round(state) {
    return state.game.games.rounds
  },

  // latestMove(state) {
  //   if (state.game) {
  //     return state.game.games.rounds[0].history[0].squares
  //   }
  //   return []
  // },

  fullHistory(state) {
    if (state.game) {
      return state.game.games.rounds[0].history
    }
    return []
  },

  latestBoard(state) {
    if (state.game) {
      return state.game.games.rounds[0].history.slice(-1)[0].squares.slice()
    }
    return []
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
