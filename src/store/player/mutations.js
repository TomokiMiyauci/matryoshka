import { ASSIGN, ACTION, ENTER } from './mutation-types'
export default {
  [ASSIGN](state, payload) {
    state.player = payload
  },

  [ACTION]() {},

  [ENTER]() {}
}
