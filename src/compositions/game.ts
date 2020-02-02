import { ref, computed } from '@vue/composition-api'
import { Player } from '~/types/player'
import { Game } from '~/types/game'

export const useGame = (player: Player) => {
  const gameRef = ref<Game[]>([])

  const setGame = (game: Game[]): void => {
    gameRef.value = game
  }

  const isYourTurn = computed(() => {
    if (!gameRef.value.length) return false
    return gameRef.value[0].nextPlayer === 'PLAYER1'
  })

  const nextPlayer = computed(() => {
    if (!gameRef.value.length) {
      return player === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1'
    }

    return gameRef.value[0].nextPlayer
  })

  const winner = computed(() => {
    if (!gameRef.value.length || !('winner' in gameRef.value[0])) {
      return ''
    }

    return gameRef.value[0].winner
  })

  return {
    gameRef,
    setGame,
    isYourTurn,
    nextPlayer,
    winner
  }
}
