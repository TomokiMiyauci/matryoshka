import { Ref, computed } from '@vue/composition-api'
import { Player } from '~/types/player'
import { Game } from '~/types/game'

export const useGame = (game: Ref<Game | undefined>, player: Player) => {
  const isYourTurnRef = computed(() => {
    if (!game.value) return false
    return game.value.nextPlayer === player
  })

  const nextPlayerRef = computed(() => {
    if (!game.value) {
      return player === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1'
    }

    return game.value.nextPlayer
  })

  const winnerRef = computed(() => {
    if (!game.value || !('winner' in game.value)) {
      return
    }

    return game.value.winner
  })

  return {
    isYourTurnRef,
    nextPlayerRef,
    winnerRef
  }
}
