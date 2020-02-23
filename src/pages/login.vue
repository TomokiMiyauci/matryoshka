<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-card color="white">
        <h1 class="black text-center display-1 font-weight-medium">WELCOME</h1>
        <div id="firebaseui-auth-container"></div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
// import firebase from '~/plugins/firebase'

export default {
  layout: 'landing'
  // mounted() {
  //   this.init()
  // },

  // methods: {
  //   init() {
  //     const uiConfig = {
  //       signInOptions: [
  //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //         // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //         // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  //         // firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //         firebase.auth.EmailAuthProvider.PROVIDER_ID
  //         // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  //       ],
  //       signInSuccessUrl: '/'
  //     }
  //     const firebaseui = require('firebaseui')
  //     const ui =
  //       firebaseui.auth.AuthUI.getInstance() ||
  //       new firebaseui.auth.AuthUI(firebase.auth())
  //     ui.start('#firebaseui-auth-container', uiConfig)
  //   }
  // }
}
</script>
