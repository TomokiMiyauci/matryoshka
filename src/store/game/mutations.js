import { ADD_WINNER, PASS_THE_TURN, CHANGE_TURN_PLAYER } from './mutation-types'

export default {
  INITIALIZE(state) {
    state.history = [
      {
        squares: Array(9).fill(null)
      }
    ]
    state.turn = 0
    state.turnPlayer = 'PLAYER_1'
    state.winner = null
  },

  turn(state, payload) {
    state.turn = payload
  },

  [PASS_THE_TURN](state, payload) {
    state.turn = payload
  },

  [CHANGE_TURN_PLAYER](state, payload) {
    state.turnPlayer = payload
  },

  [ADD_WINNER](state, payload) {
    state.winner = payload
  },

  ADD_PLAYER(state, payload) {
    state.players.push(payload)
  }
}
