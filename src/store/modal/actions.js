import { SHOW, HIDE, HIDE_ALL } from './mutation-types'

export default {
  [SHOW]({ commit, getters }, payload) {
    if (!getters.isHas(payload)) {
      commit(SHOW, payload)
    }
  },

  [HIDE]({ commit }, payload) {
    commit(HIDE, payload)
  },

  [HIDE_ALL]({ commit }) {
    commit(HIDE_ALL)
  }
}
