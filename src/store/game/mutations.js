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
  },

  INIT_HOLDING_Piece(state, payload) {
    const player = { player: payload }
    state.holdingPieces = [
      { id: 1, value: 1, ...player },
      { id: 2, value: 1, ...player },
      { id: 3, value: 2, ...player },
      { id: 4, value: 2, ...player },
      { id: 5, value: 3, ...player },
      { id: 6, value: 3, ...player }
    ]
  }
}
