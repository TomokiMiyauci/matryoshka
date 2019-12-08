<template>
  <v-row :justify="justify" no-gutters>
    <v-col :order="order" cols="auto">
      <v-avatar>
        <img :src="require('~/assets/img/anonymous.jpg')" alt="John" />
      </v-avatar>
    </v-col>

    <v-col order="1" align-self="center" cols="auto">
      <span style="padding:10px;">{{ name }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    profileImg: {
      type: String,
      default: '~/assets/img/anonymous.jpg'
    },

    name: {
      type: String,
      required: true
    },

    reverse: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    justify() {
      return this.reverse ? 'end' : 'start'
    },

    order() {
      return this.reverse ? 2 : 0
    }
  }
}
</script>

<style scoped></style>
