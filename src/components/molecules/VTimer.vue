<template>
  <v-time :time="time"></v-time>
</template>

<script>
import VTime from '~/components/atoms/VTime'
export default {
  components: {
    VTime
  },

  data() {
    return {
      time: 30,
      intervalID: null
    }
  },

  created() {
    this.countdown()
  },

  destroyed() {
    clearInterval(this.intervalID)
  },

  methods: {
    countdown() {
      this.intervalID = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.reset()
        }
      }, 1000)
    },

    reset() {
      this.time = 30
      this.$emit('up')
      // alert()
      console.log('reset')
    }
  }
}
</script>

<style scoped></style>
