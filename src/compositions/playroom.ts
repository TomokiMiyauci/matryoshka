import { Ref, computed } from '@vue/composition-api'
import { Playroom } from '~/types/playroom'
import { Player } from '~/types/player'
import { usePlayer } from '~/compositions/player'
export const usePlayroom = (
  playroom: Ref<Playroom | undefined>,
  player: Player
) => {
  const { youRef, enemyRef } = usePlayer(player)

  const yourWinsRef = computed((): Playroom['player1Wins'] => {
    if (!playroom.value) return 0
    return playroom.value[
      `${youRef.value}Wins` as 'player1Wins' | 'player2Wins'
    ]
  })

  const enemyWinsRef = computed((): Playroom['player2Wins'] => {
    if (!playroom.value) return 0
    return playroom.value[
      `${enemyRef.value}Wins` as 'player1Wins' | 'player2Wins'
    ]
  })

  const roundRef = computed((): Playroom['round'] => {
    if (!playroom.value) return 1
    return playroom.value.round
  })

  const orderRef = computed((): Playroom['order'] => {
    if (!playroom.value) return 'RANDOM'
    return playroom.value.order
  })

  return {
    yourWinsRef,
    enemyWinsRef,
    roundRef,
    orderRef
  }
}
