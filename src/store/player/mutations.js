import { ASSIGN, ACTION } from './mutation-types'
export default {
  [ASSIGN](state, payload) {
    state.player = payload
  },

  [ACTION]() {}
}
