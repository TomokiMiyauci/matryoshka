import { Playroom } from '~/types/playroom'
import { Player } from '~/types/player'
import { useFirestoreGameRecord } from '~/repositories/game-record'
import { useFirestorePlayroom } from '~/repositories/playroom'
import { useFirestoreGame } from '~/repositories/game'
import { generateShallow } from '~/functions/matrix'
import { generatePieces } from '~/functions/piece'

const { createPlayroom, documentReferenceRef } = useFirestorePlayroom()
const { createGame: cg, documentReferenceRef: cr } = useFirestoreGame()
const { createGameRecord: cgr } = useFirestoreGameRecord()

export const initialize = async (order: Playroom['order']) => {
  await createPlayroom({
    player1Wins: 0,
    player2Wins: 0,
    round: 1,
    order
  })

  const playFirst = order === 'RANDOM' ? 'PLAYER1' : order
  await createGame(playFirst)
  await createGameRecord()
}

export const createGame = async (playFirst: Player) => {
  await cg(documentReferenceRef.value, {
    rows: 3,
    cols: 3,
    nextPlayer: playFirst,
    playFirst,
    readyPlayers: ['PLAYER1']
  })
}

export const createGameRecord = async () => {
  const shallowArray = generateShallow(3, 3)
  const player1Hands = generatePieces(3, 3, 3, 'PLAYER1')
  const player2Hands = generatePieces(3, 3, 3, 'PLAYER2')
  await cgr(cr.value, {
    board: shallowArray,
    player1Hands,
    player2Hands
  })
}
