/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import PlayerStore from '~/store/player'
import PlayStore from '~/store/playstore'

let playerStore: PlayerStore
let playStore: PlayStore

function initializeStores(store: Store<any>): void {
  playerStore = getModule(PlayerStore, store)
  playStore = getModule(PlayStore, store)
}

export { initializeStores, playerStore, playStore }
