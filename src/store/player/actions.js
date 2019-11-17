import { ASSIGN, ACTION, ENTER } from './mutation-types'

export default {
  [ASSIGN]({ commit }, payload) {
    commit(ASSIGN, payload)
  },

  [ACTION]({ dispatch }, payload) {
    dispatch('game/turnAction', payload, { root: true })
  },

  [ENTER]({ dispatch }, payload) {
    dispatch(ASSIGN, payload)
  }
}
