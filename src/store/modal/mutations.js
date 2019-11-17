import { SHOW, HIDE, HIDE_ALL } from './mutation-types'
export default {
  [SHOW](state, payload) {
    state.modals.push(payload)
  },

  [HIDE](state, payload) {
    state.modals.pop(payload)
  },

  [HIDE_ALL](state) {
    state.modals = []
  }
}
