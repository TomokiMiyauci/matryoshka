export default {
  name(state) {
    return state.player
  },

  opponent(state, getters) {
    return getters.name === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
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
      case getters.opponent:
        return 'LOSE'
      default:
        return ''
    }
  }
}
