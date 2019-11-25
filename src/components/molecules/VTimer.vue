<template>
  <div>
    <v-time :time="time"></v-time>
    {{ intervalID }}
  </div>
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
      setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.reset()
        }
      }, 1000)
    },
    reset() {
      this.time = 30
      console.log('reset')
    }
  }
}
</script>

<style scoped></style>
