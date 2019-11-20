import { ASSIGN, ACTION, ENTER_ROOM, CREATE_ROOM } from './mutation-types'

export default {
  [ASSIGN]({ commit }, payload) {
    commit(ASSIGN, payload)
  },

  [ACTION]({ dispatch }, payload) {
    dispatch('game/turnAction', payload, { root: true })
  },

  [ENTER_ROOM]({ dispatch }, payload) {
    dispatch(ASSIGN, payload)
  },

  async [CREATE_ROOM]({ dispatch }) {
    const docRef = await dispatch('playroom/CREATE', null, { root: true })
    return docRef
  }
}
