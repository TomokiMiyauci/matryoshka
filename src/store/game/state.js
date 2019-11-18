export default () => ({
  name: '',
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  turn: 0,
  turnPlayer: 'PLAYER_1',
  winner: null,
  players: []
})
