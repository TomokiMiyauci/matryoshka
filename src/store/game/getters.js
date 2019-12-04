export default {
  game(state) {
    return state.game
  },

  latestGame(state, getters) {
    return getters.game[0]
  },

  round(state, getters) {
    return getters.game.length
  },

  nextRound(state, getters) {
    return getters.round + 1
  },

  latestBoard(state, getters) {
    const latestGame = getters.latestGame
    if (latestGame) {
      return latestGame.history.slice(-1)[0].squares.slice()
    }
    return []
  },

  latestPlayer(state, getters) {
    const latestGame = getters.latestGame
    if (latestGame) {
      return latestGame.history.slice(-1)[0].player || 'PLAYER_1'
    }
    return []
  },

  winner(state, getters) {
    const latestGame = getters.latestGame
    if (latestGame) {
      return latestGame.winner
    }
  },

  willBeNextBoard: (state, getters) => (payload) => {
    const willBeNextBoard = getters.latestBoard
    const nextPiece = getters.turnPlayer === 'PLAYER_1' ? 'X' : 'O'
    willBeNextBoard.splice(payload, 1, nextPiece)
    return willBeNextBoard
  },

  turnPlayer(state, getters) {
    return getters.latestPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
  },

  nextTurnPlayer(state, getters) {
    return getters.turnPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'
  },

  canPlacePeices(state, getters) {
    // this function is duty.I try to research for good way.
    const result = getters.latestBoard.reduce(
      (accumulator, currentValue, index) => {
        if (currentValue === null) {
          accumulator.push(index)
        }
        return accumulator
      },
      []
    )

    return result
  },

  placeable: (state, getters) => (payload) => {
    return getters.canPlacePeices.includes(payload)
  },

  cannotPlace(state, getters) {
    return !getters.canPlacePeices.length
  },

  playroomId(state, getters, rootState, rootGetters) {
    return rootGetters['playroom/id']
  },

  players(state, getters, rootState, rootGetters) {
    return rootGetters['playroom/players']
  },

  readyToStart(state, getters) {
    return getters.players >= 2
  }
}
