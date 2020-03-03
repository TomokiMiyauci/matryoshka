import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'playstore',
  stateFactory: true,
  namespaced: true
})
export default class PlayStore extends VuexModule {
  private _playroomId = ''
  private _playroomPath = ''
  private _gameId = ''
  private _gamePath = ''
  private _gameRecordId = ''
  private _gameRecordPath = ''

  @Mutation
  setPlayroomId(id: string) {
    this._playroomId = id
  }

  @Mutation
  setPlayroomPath(path: string) {
    this._playroomPath = path
  }

  @Mutation
  removePlayroomId() {
    this._playroomId = ''
  }

  @Mutation
  removePlayroomPath() {
    this._playroomPath = ''
  }

  @Mutation
  setGameId(id: string) {
    this._gameId = id
  }

  @Mutation
  setGamePath(path: string) {
    this._gamePath = path
  }

  @Mutation
  removeGameId() {
    this._gameId = ''
  }

  @Mutation
  removeGamePath() {
    this._gamePath = ''
  }

  @Mutation
  setGameRecordId(id: string) {
    this._gameRecordId = id
  }

  @Mutation
  setGameRecordPath(path: string) {
    this._gameRecordPath = path
  }

  @Mutation
  removeGameRecordId() {
    this._gameRecordId = ''
  }

  @Mutation
  removeGameRecordPath() {
    this._gameRecordPath = ''
  }

  get playroomId() {
    return this._playroomId
  }

  get playroomPath() {
    return this._playroomPath
  }

  get gameId() {
    return this._gameId
  }

  get gamePath() {
    return this._gamePath
  }

  get gameRecordId() {
    return this._gameRecordId
  }

  get gameRecordPath() {
    return this._gameRecordPath
  }
}
