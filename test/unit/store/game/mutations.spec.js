import mutation from '~/store/game/mutations.js'

describe('mutations', () => {
  it('adds a winner to the state', () => {
    const { ADD_WINNER } = mutation
    const player = 'PLAYER_1'
    const state = { winner: undefined }

    ADD_WINNER(state, player)

    expect(state).toStrictEqual({ winner: player })
  })
})
