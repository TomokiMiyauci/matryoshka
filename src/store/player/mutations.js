import { ASSIGN, CHANGE } from './mutation-types'
export default {
  [ASSIGN](state, payload) {
    state.player = payload
  },

  [CHANGE](state, payload) {
    state.turnPlayer = payload
  }
}
