import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDNkeqmUApjilJj-R09XluRcSpDP4yR0Ss',
  authDomain: 'vobblet-vobblers.firebaseapp.com',
  databaseURL: 'https://vobblet-vobblers.firebaseio.com',
  projectId: 'vobblet-vobblers',
  storageBucket: 'vobblet-vobblers.appspot.com',
  messagingSenderId: '216717069811',
  appId: '1:216717069811:web:c84303e0fedc12b35a5686',
  measurementId: 'G-BCTBVXH00B'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
