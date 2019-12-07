export default {
  playrooms(state) {
    return state.playrooms
  },

  competingPlayrooms(state, getters) {
    return getters.playrooms.filter((playroom) => playroom.players >= 2)
  },

  waitingPlayrooms(state, getters) {
    return getters.playrooms.filter((playroom) => playroom.players === 1)
  },

  numberOfWaitingPlayrooms(state, getters) {
    return getters.waitingPlayrooms.length
  },

  numberOfCompetingPlayrooms(state, getters) {
    return getters.waitingPlayrooms.length
  },

  id(state) {
    return state.id
  },

  players(state) {
    return state.playroom.players
  }
}
