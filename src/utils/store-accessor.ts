import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Firestore from '~/store/firestore'

// eslint-disable-next-line import/no-mutable-exports
let firestore: Firestore

function initializeStores(store: Store<any>): void {
  firestore = getModule(Firestore, store)
}

export { initializeStores, firestore }
