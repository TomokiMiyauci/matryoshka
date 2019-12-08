<template>
  <div>
    <div :class="{ second: second }" class="d">{{ text }}</div>
    <v-btn @click="a = true">fsja</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: false,
      text: 'Ready',
      second: false
    }
  },

  mounted() {
    window.addEventListener('animationend', () => {
      this.second = true
      this.text = 'Go'
      console.log(1)
    })
  }
}
</script>

<style>
.d {
  position: absolute;
  top: 40%;
  font-size: 40px;
  animation: i 1s 1 2s ease;
  transform: translateX(calc(50vw - 50%));
}
@keyframes i {
  100% {
    opacity: 0;
    font-size: 50px;
  }
}
.second {
  animation: k 1s 0s ease-in;
  visibility: hidden;
}
@keyframes k {
  0% {
    visibility: visible;
    transform: translateX(calc(50vw - 50%));
  }
  100% {
    opacity: 0;
    font-size: 100px;
    visibility: visible;
  }
}
</style>
