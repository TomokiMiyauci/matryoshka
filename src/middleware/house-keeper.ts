import { Middleware } from '@nuxt/types'
import { firestore } from '~/plugins/firebase'
import { playerStore, playStore } from '~/store'

const houseKeeper: Middleware = async ({ redirect }) => {
  if (
    !playStore.playroomPath ||
    !playerStore.player ||
    !(await isExistsPlayroom(playStore.playroomPath))
  ) {
    redirect('/playrooms')
  }
}

const isExistsPlayroom = async (playroomPath: string): Promise<boolean> => {
  const documentData = await firestore.doc(playroomPath).get()

  return Promise.resolve(documentData.exists)
}

export default houseKeeper
