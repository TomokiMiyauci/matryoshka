<template>
  <div>
    <h1>{{ turnPlayer }}</h1>
    <the-playground></the-playground>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThePlayground from '~/components/organisms/ThePlayground'
export default {
  components: {
    ThePlayground
  },

  computed: {
    ...mapGetters('player', ['turnPlayer'])
  }
}
</script>

<style scoped></style>
