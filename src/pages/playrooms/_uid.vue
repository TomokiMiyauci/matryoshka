<template>
  <div>
    <h1>{{ name }}</h1>
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
    ...mapGetters('player', ['name'])
  }
}
</script>

<style scoped></style>
