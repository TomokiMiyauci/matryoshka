import { computed } from '@vue/composition-api'
import { Player, LowerCasePlayer } from '~/types/player'

export const usePlayer = (player: Player) => {
  const YOURef = computed(
    (): Player => {
      return player === 'PLAYER1' ? 'PLAYER1' : 'PLAYER2'
    }
  )
  const youRef = computed(
    (): LowerCasePlayer => {
      return player === 'PLAYER1' ? 'player1' : 'player2'
    }
  )

  const ENEMYRef = computed(
    (): Player => {
      return YOURef.value === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1'
    }
  )

  const enemyRef = computed(
    (): LowerCasePlayer => {
      return youRef.value === 'player1' ? 'player2' : 'player1'
    }
  )

  return { YOURef, youRef, ENEMYRef, enemyRef }
}
