import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

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
