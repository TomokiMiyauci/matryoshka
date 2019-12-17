import { firestoreAction } from 'vuexfire'
import {
  ADD_WINNER,
  RESTART,
  ASSESS_STATUS,
  END_OF_GAME,
  TIME_UP
} from './mutation-types'
import firebase, { firestore } from '~/plugins/firebase'

export default {
  bindGameRef: firestoreAction(async ({ bindFirestoreRef, getters }) => {
    await bindFirestoreRef(
      'game',
      firestore
        .collection('playrooms')
        .doc(getters.playroomId)
        .collection('games')
        .orderBy('timestamp', 'desc')
    )
  }),

  [ASSESS_STATUS]({ getters, dispatch }) {
    const isWin = getters.isWin(getters.playerName)
    // console.log(isWin)

    if (isWin) {
      dispatch(END_OF_GAME, 'FINISH')
    } else if (getters.cannotPlace) {
      dispatch(END_OF_GAME, 'DRAW')
    }
  },

  async PLACE_PIECE({ dispatch, getters }, payload) {
    const latestBoard = getters.willBeNextShallowBoard(payload)

    await dispatch('addHistoryRecord', latestBoard)
    dispatch(ASSESS_STATUS)
    if (getters.selectingPiece.type === 'PLACE') {
      await dispatch('TAKE_HOLDING_PIECE')
    }
    dispatch('TAKE_SELECTING_PIECE')
  },

  async MOVE_PIECE({ dispatch, getters }, payload) {
    const latestBoard = getters.willBeNextShallowBoardByMove(
      payload.from,
      payload.to,
      payload.value
    )

    await dispatch('addHistoryRecord', latestBoard)
    dispatch(ASSESS_STATUS)

    dispatch('TAKE_SELECTING_PIECE')
  },

  [END_OF_GAME]({ dispatch }, payload) {
    switch (payload) {
      case 'FINISH':
        dispatch(ADD_WINNER)
        break
      case 'DRAW':
        dispatch('ADD_DRAW')
        break
    }
    dispatch('modal/SHOW', 1, { root: true })
  },

  [RESTART]({ commit, dispatch }) {
    commit('INITIALIZE')
    dispatch('modal/HIDE', 1, { root: true })
  },

  addHistoryRecord({ getters, rootGetters }, payload) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: payload,
          player: rootGetters['player/name']
        })
      })
  },

  [ADD_WINNER]({ getters }) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        winner: getters.playerName
      })
  },

  ADD_DRAW({ commit }) {
    commit(ADD_WINNER, 'DRAW')
  },

  NEXT_GAME({ getters, dispatch }) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.nextRound.toString())
      .set({ ...getters.generateInitValue })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    dispatch('INIT_HOLDING_PIECE')
  },

  INIT_HOLDING_PIECE({ commit }) {
    commit('INIT_HOLDING_Piece')
  },

  SURRENDER({ commit, dispatch, getters, rootGetters }) {
    firestore
      .collection('playrooms')
      .doc(getters.playroomId)
      .collection('games')
      .doc(getters.round.toString())
      .update({
        winner: rootGetters['player/opponent'],
        history: firebase.firestore.FieldValue.arrayUnion({
          squares: getters.latestBoard,
          player: rootGetters['player/name']
        })
      })
    commit(ADD_WINNER, rootGetters['player/opponent'])
    dispatch('modal/SHOW', 1, { root: true })
  },

  async RANDOM_ACTION({ getters, dispatch }) {
    if (getters.cannotPlace) {
      return
    }
    const canPlacePeices = getters.canPlacePeices
    const index =
      canPlacePeices[Math.floor(Math.random() * canPlacePeices.length)]
    const latestBoard = getters.willBeNextBoard(index)
    await dispatch('addHistoryRecord', latestBoard)
  },

  [TIME_UP]({ dispatch }) {
    dispatch('RANDOM_ACTION')
  },

  ADD_SELECTING_PIECE({ commit }, payload) {
    commit('ADD_SELECTING_PIECE', payload)
  },

  TAKE_SELECTING_PIECE({ commit }) {
    commit('TAKE_SELECTING_PIECE')
  },

  TAKE_HOLDING_PIECE({ commit, getters }) {
    commit('TAKE_HOLDING_PIECE', getters.selectingPiece)
  }
}
