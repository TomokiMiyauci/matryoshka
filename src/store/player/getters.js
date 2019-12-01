export default {
  name(state) {
    return state.player
  },

  turnPlayer(state, getters, rootState, rootGetters) {
    return rootGetters['game/turnPlayer']
  },

  isYourTurn(state, getters) {
    return getters.name === getters.turnPlayer
  },

  victoryOrDefeat(state, getters, rootState, rootGetters) {
    switch (rootGetters['game/winner']) {
      case getters.name:
        return 'WIN'
      case 'DRAW':
        return 'DRAW'
      default:
        return 'LOSE'
    }
  }
}
