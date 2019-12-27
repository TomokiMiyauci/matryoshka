<template>
  <v-card width="140px" height="140px" @click="$emit('click')">
    <v-avatar-with-name name="aaa"></v-avatar-with-name>
    <v-playroom-tag :text="playroom.id | hashing"> </v-playroom-tag>
  </v-card>
</template>

<script>
export default {
  components: {
    VAvatarWithName: () => import('~/components/molecules/VAvatarWithName'),
    VPlayroomTag: () => import('~/components/atoms/VPlayroomTag')
  },

  filters: {
    hashing(val) {
      return `#${val.substr(0, 3)}`
    }
  },

  props: {
    playroom: {
      type: Object,
      required: true
    }
  },

  methods: {
    goto(payload) {
      this.ENTER_ROOM(payload.id)
      this.ASSIGN('PLAYER_2')
      this.$router.push(`/playrooms/${payload.id}`)
    }
  }
}
</script>

<style scoped></style>
