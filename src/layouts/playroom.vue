<template>
  <v-app>
    <!-- <v-navigation-drawer app fixed right> </v-navigation-drawer> -->
    <v-app-bar app>
      <v-btn to="/playrooms" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {}
</script>

<style scoped></style>
