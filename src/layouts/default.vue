<template>
  <v-app>
    <v-navigation-drawer app absolute permanent right>
      <the-history></the-history>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import TheHistory from '~/components/organisms/TheHistory'
export default {
  components: {
    TheHistory
  }
}
</script>

<style scoped></style>
