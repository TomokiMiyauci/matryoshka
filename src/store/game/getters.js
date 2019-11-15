export default {
  latestMove(state) {
    return state.history[state.turn].squares
  },

  fullHistory(state) {
    return state.history
  }
}
