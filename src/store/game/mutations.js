export default {
  history(state, payload) {
    state.history.push(payload)
  },

  turn(state, payload) {
    state.turn = payload
  }
}
