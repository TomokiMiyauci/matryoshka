<template>
  <v-app>
    <v-game-app-bar @click="$nuxt.$emit('emit')" />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import VGameAppBar from '~/components/molecules/VGameAppBar.vue'

export default {
  components: {
    VGameAppBar
  }
}
</script>
