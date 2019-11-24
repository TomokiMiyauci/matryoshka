export default {
  game(state) {
    return state.game
  },

  latestGame(state, getters) {
    return getters.game[0]
  },

  round(state, getters) {
    return getters.game.length
  },

  nextRound(state, getters) {
    return getters.round + 1
  },

  // fullHistory(state, getters) {
  //   if (state.game) {
  //     return state.game.games.rounds[getters.round].history
  //   }
  //   return []
  // },

  latestBoard(state, getters) {
    const latestGame = getters.latestGame
    if (latestGame) {
      return latestGame.history.slice(-1)[0].squares.slice()
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
  },

  playroomId(state, getters, rootState, rootGetters) {
    return rootGetters['playroom/id']
  }
}
