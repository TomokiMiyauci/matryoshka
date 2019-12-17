import {
  ASSIGN,
  ENTER_ROOM,
  LEAVE_ROOM,
  CREATE_ROOM,
  SURRENDER,
  PLACE_PIECE,
  MOVE_PIECE
} from './mutation-types'

export default {
  async [ASSIGN]({ commit, dispatch }, payload) {
    commit(ASSIGN, payload)
    await dispatch('playroom/bindPlayroomRef', payload, { root: true })
    await dispatch('game/bindGameRef', payload, { root: true })
  },

  async [ENTER_ROOM]({ dispatch }, payload) {
    await dispatch('playroom/ENTER', payload, { root: true })
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
  },

  [PLACE_PIECE]({ dispatch }, payload) {
    dispatch('game/PLACE_PIECE', payload, { root: true })
  },

  [MOVE_PIECE]({ dispatch }, payload) {
    dispatch('game/MOVE_PIECE', payload, { root: true })
  }
}
