import { ADD_ID } from './mutation-types'

export default {
  [ADD_ID](state, payload) {
    state.id = payload
  }
}
