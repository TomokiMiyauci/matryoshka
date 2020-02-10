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
  transform: translateX(calc(50vw - 50%));
  animation: i 1s 1 2s ease;
}

@keyframes i {
  100% {
    font-size: 50px;
    opacity: 0;
  }
}

.second {
  visibility: hidden;
  animation: k 1s 0s ease-in;
}

@keyframes k {
  0% {
    transform: translateX(calc(50vw - 50%));
    visibility: visible;
  }

  100% {
    font-size: 100px;
    visibility: visible;
    opacity: 0;
  }
}
</style>
