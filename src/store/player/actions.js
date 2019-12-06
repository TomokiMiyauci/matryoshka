import {
  ASSIGN,
  ACTION,
  ENTER_ROOM,
  LEAVE_ROOM,
  CREATE_ROOM,
  SURRENDER
} from './mutation-types'

export default {
  [ASSIGN]({ commit }, payload) {
    commit(ASSIGN, payload)
  },

  [ACTION]({ dispatch }, payload) {
    dispatch('game/turnAction', payload, { root: true })
  },

  [ENTER_ROOM]({ dispatch }, payload) {
    dispatch('playroom/ENTER', payload, { root: true })
  },

  [LEAVE_ROOM]({ dispatch }) {
    dispatch('playroom/fluctuatePlayers', 'LEAVE', { root: true })
  },

  async [CREATE_ROOM]({ dispatch }) {
    const docRef = await dispatch('playroom/CREATE', null, { root: true })
    return docRef
  },

  [SURRENDER]({ dispatch }) {
    dispatch('game/SURRENDER', null, { root: true })
  }
}
