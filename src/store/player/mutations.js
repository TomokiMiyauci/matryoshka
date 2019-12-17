import { ASSIGN } from './mutation-types'
export default {
  [ASSIGN](state, payload) {
    state.player = payload
  }
}
