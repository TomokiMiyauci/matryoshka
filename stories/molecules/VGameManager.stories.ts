import { boolean, radios } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import VGameManager from '~/components/molecules/VGameManager.vue'

export default {
  title: 'Molecules|VGameManager',
  parameters: {
    info: {
      summary: 'Molecules of VGameManager is managed timer, player counter.'
    }
  }
}

const options = { PLAYER1: 'PLAYER1', PLAYER2: 'PLAYER2' }
const template = `<v-game-manager @timeup="onTimeup" :is-your-turn="isYourTurn" :enable-timer="enableTimer" :player="player" :next-player="nextPlayer"></v-game-manager>`

export const Default = () => ({
  components: { VGameManager },
  template,
  props: {
    isYourTurn: {
      default: boolean('isYourTurn', false)
    },

    enableTimer: {
      default: boolean('enableTimer', false)
    },

    player: {
      default: radios('player', options, 'PLAYER1')
    },

    nextPlayer: {
      default: radios('nextPlayer', options, 'PLAYER2')
    }
  },
  methods: {
    onTimeup: action('timeup')
  }
})
