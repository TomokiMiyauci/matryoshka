<template>
  <v-app>
    <v-app-bar app> </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-bottom-navigation v-model="btmNav" app fixed>
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
  components: {},

  data() {
    return {
      btmNav: null
    }
  }
}
</script>

<style scoped></style>
