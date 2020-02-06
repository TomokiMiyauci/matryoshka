<template>
  <v-app>
    <the-app-bar-default />
    <v-content>
      <nuxt />
    </v-content>
    <v-bottom-navigation v-model="btmNav" app>
      <v-btn to="/" value="/home">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/playrooms" value="playrooms">
        <span>Playrooms</span>
        <v-icon>mdi-playstation</v-icon>
      </v-btn>

      <v-btn to="/share" value="share">
        <span>Share</span>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  components: {
    TheAppBarDefault: () => import('~/components/organisms/TheAppBarDefault')
  },

  data() {
    return {
      btmNav: null
    }
  }
}
</script>
