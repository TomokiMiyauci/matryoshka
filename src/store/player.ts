import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Player } from '~/types/player'

@Module({
  name: 'player',
  stateFactory: true,
  namespaced: true
})
export default class PlayerStore extends VuexModule {
  private _player: Player | '' = ''

  @Mutation
  setPlayer(player: Player) {
    this._player = player
  }

  @Mutation
  removePlayer() {
    this._player = ''
  }

  get player(): Player | '' {
    return this._player
  }
}
