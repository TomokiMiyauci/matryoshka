import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { useFirestorePlayroom } from '~/repositories/playroom'
import { useFirestoreGame } from '~/repositories/game'
import { useFirestoreGameRecord } from '~/repositories/game-record'
import { generateShallow } from '~/functions/matrix'
import { generatePieces } from '~/functions/piece'

@Module({
  name: 'firestore',
  stateFactory: true,
  namespaced: true
})
export default class Firestore extends VuexModule {
  playroomId = ''
  gameId = ''
  gameRecordId = ''

  @Mutation
  setGameRecordId(gameRecordId: string) {
    this.gameRecordId = gameRecordId
  }

  @Mutation
  setGameId(gameId: string) {
    this.gameId = gameId
  }

  @Mutation
  setPlayroomId(playroomId: string) {
    this.playroomId = playroomId
  }

  @Action
  async initialize() {
    const { createPlayroom } = useFirestorePlayroom()
    const playroomDocumentData = await createPlayroom({})
    this.context.commit('setPlayroomId', playroomDocumentData.id)

    const { createGame } = useFirestoreGame(this.context.getters.getPlayroomId)
    const gameDocumentData = await createGame({
      rows: 3,
      cols: 3,
      nextPlayer: 'PLAYER1',
      readyPlayers: ['PLAYER1']
    })
    this.context.commit('setGameId', gameDocumentData.id)

    const { createGameRecord } = useFirestoreGameRecord(
      this.context.getters.getPlayroomId,
      this.context.getters.getGameId
    )
    const shallowArray = generateShallow(3, 3)
    const player1Hands = generatePieces(3, 3, 3, 'PLAYER1')
    const player2Hands = generatePieces(3, 3, 3, 'PLAYER2')
    const gameRecordDocumentData = await createGameRecord({
      board: shallowArray,
      player1Hands,
      player2Hands
    })
    this.context.commit('setGameRecordId', gameRecordDocumentData.id)
  }

  get getPlayroomId() {
    return this.playroomId
  }

  get getGameId() {
    return this.gameId
  }

  get getGameRecordId() {
    return this.gameRecordId
  }
}
