import { PLAYER_1, PLAYER_2, ASSIGN, CHANGE } from './mutation-types'

export default {
  [ASSIGN]({ commit }, payload) {
    commit(ASSIGN, payload)
  },

  [CHANGE]({ commit, getters }, payload) {
    const nextPlayer = getters.turnPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1
    commit(CHANGE, nextPlayer)
  }
}
