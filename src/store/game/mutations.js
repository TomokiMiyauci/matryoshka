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
  },

  ADD_SELECTING_PIECE(state, payload) {
    state.selectingPiece = payload
  },

  TAKE_SELECTING_PIECE(state) {
    state.selectingPiece = null
  },

  TAKE_HOLDING_PIECE(state, payload) {
    const index = state.holdingPieces.findIndex((n) => n.id === payload.id)
    state.holdingPieces.splice(index, 1)
  }
}
