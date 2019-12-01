import { ADD_WINNER } from './mutation-types'

export default {
  INITIALIZE(state) {
    state.history = [
      {
        squares: Array(9).fill(null)
      }
    ]
    state.winner = null
  },

  [ADD_WINNER](state, payload) {
    state.winner = payload
  },

  ADD_PLAYER(state, payload) {
    state.players.push(payload)
  }
}
