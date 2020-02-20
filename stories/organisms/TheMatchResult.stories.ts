import { number, radios } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import TheMatchResult from '~/components/organisms/TheMatchResult.vue'
export default {
  title: 'organisms|TheMatchResult',
  parameters: {
    info: {
      summary: 'Organisms of TheMatchResult display result of match.'
    }
  }
}

const template = `<the-match-result @ready="onReady" :player="player" :winner="winner" :your-wins="yourWins" :enemy-wins="enemyWins"></the-match-result>`

const players = {
  PLAYER1: 'PLAYER1',
  PLAYER2: 'PLAYER2'
}
const options = {
  ...players,
  NONE: 'NONE',
  DRAW: 'DRAW'
}

export const Default = () => ({
  components: { TheMatchResult },
  template,
  props: {
    player: {
      default: radios('player', players, 'PLAYER1')
    },

    winner: {
      default: radios('winner', options, 'NONE')
    },

    yourWins: {
      default: number('yourWins', 0)
    },

    enemyWins: {
      default: number('enemyWins', 0)
    }
  },
  methods: {
    onReady: action('onReady')
  },

  description: {
    TheMatchResult: {
      props: {
        player: 'It accepts PLAYER1 or PLAYER2.',
        winner: 'It accepts which player did win.',
        yourWins: 'Number of yours wins.',
        enemyWins: "Number of enemy' wins."
      },
      events: {
        ready: 'Event for ready notice.'
      }
    }
  }
})
