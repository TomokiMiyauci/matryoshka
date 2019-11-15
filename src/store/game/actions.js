import {} from './mutation-types'

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

export default {
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

  addHistoryRecord({ state, commit }, payload) {
    const array = state.history[state.turn].squares.slice()
    console.log(array)
    if (array[payload]) {
      return
    }
    array.splice(payload, 1, state.player === '1' ? 'X' : 'O')
    // state.history.push({ squares: array })
    commit('history', { squares: array })
    commit('turn', state.history.length - 1)
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

    // calculateWinner(squares) {
    //   const lines = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6]
    //   ]
    //   for (let i = 0; i < lines.length; i++) {
    //     const [a, b, c] = lines[i]
    //     console.log(a, b, c)
    //     if (
    //       squares[a] &&
    //       squares[a] === squares[b] &&
    //       squares[a] === squares[c]
    //     ) {
    //       // setTimeout(() => {
    //       //   this.squares = Array(9).fill(null)
    //       // }, 1000)
    //       return true
    //     }
    //   }
    // }
  }
}
