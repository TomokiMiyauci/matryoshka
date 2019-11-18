import {
  ADD_WINNER,
  PASS_THE_TURN,
  ADVANCE_TURN,
  CHANGE_TURN_PLAYER,
  REGISTER_AS_PLAYER,
  RESTART
} from './mutation-types'

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    // console.log(a, b, c)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true
    }
  }
}

export default {
  async turnAction({ dispatch, getters }, payload) {
    const latestBoard = getters.willBeNextBoard(payload)

    await dispatch('addHistoryRecord', latestBoard)
    if (calculateWinner(latestBoard)) {
      dispatch('endOfGame')
    } else {
      dispatch(ADVANCE_TURN)
      dispatch(CHANGE_TURN_PLAYER)
    }
  },

  [ADVANCE_TURN]({ state, commit }) {
    commit(PASS_THE_TURN, state.history.length - 1)
  },

  isSettled({ commit }, squares) {
    lines.forEach((line) => {
      const [a, b, c] = line
      console.log(a, b, c)
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true
      }
    })
  },

  endOfGame({ dispatch }) {
    dispatch(ADD_WINNER)
    dispatch('modal/SHOW', 1, { root: true })
  },

  getWinner({ getters }) {
    if (!calculateWinner(getters.latestMove)) {
    }
  },

  [RESTART]({ commit, dispatch }) {
    commit('INITIALIZE')
    dispatch('modal/HIDE', 1, { root: true })
  },

  addHistoryRecord({ state, commit, rootGetters }, payload) {
    // const array = state.history[state.turn].squares.slice()
    // console.log(array)
    // if (array[payload]) {
    //   return
    // }
    // array.splice(payload, 1, state.player === '1' ? 'X' : 'O')
    // state.history.push({ squares: array })
    commit('history', { squares: payload })
    // commit('turn', state.history.length - 1)
    // state.$nextTick(() => {
    //   const c = state.getWinner(array)
    //   console.log(c)
    //   if (c) {
    //     alert()
    //   }
    // })

    // state.turn = state.history.length - 1
    // state.player = state.player === '1' ? '2' : '1'
    // console.log(c)
    // // state.a[row][col].splice(2, 1, state.b)
    // const b = state.calculateWinner()
    // console.log(b)
    // state.CHANGE()

    // getWinner(squares) {
    //   return this.calculateWinner(squares)
    // },
  },

  [ADD_WINNER]({ commit, getters }) {
    commit(ADD_WINNER, getters.turnPlayer)
  },

  [CHANGE_TURN_PLAYER]({ commit, getters }) {
    commit(CHANGE_TURN_PLAYER, getters.nextTurnPlayer)
  },

  [REGISTER_AS_PLAYER]({ commit }, payload) {
    commit('ADD_PLAYER', payload)
  }
}
