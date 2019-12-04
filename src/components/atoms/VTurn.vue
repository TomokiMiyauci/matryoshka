<template>
  <div class="appear">
    <span class="headline">Turn Change</span><br />

    <v-icon size="200px" color="indigo">mdi-shield-sun</v-icon>
  </div>
  <!-- <h1 clas s="a">sffnkfnkl</h1>
    <transition>
      <p v-if="isYourTurn">jj</p>
    </transition> -->
</template>

<script>
export default {
  props: {
    isYourTurn: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      animation: false
    }
  },

  watch: {
    isYourTurn() {
      this.animation = true
      console.log(1)
    }
  },

  mounted() {
    window.addEventListener('animationend', this.stopAnimation)
  },

  destroyed() {
    window.removeEventListener('animationend', this.stopAnimation)
  },

  methods: {
    stopAnimation() {
      this.animation = false
      console.log(2)
    }
  }
}
</script>

<style scoped>
.appear {
  /* display: inline-block;
  position: absolute; */

  text-align: center;
  animation-name: appear;
  animation-duration: 2s;
  opacity: 0;
}
@keyframes appear {
  0% {
    opacity: 1;
    transform: scale(1.3, 1.3);
  }
  100% {
    opacity: 0;
  }
}
</style>
