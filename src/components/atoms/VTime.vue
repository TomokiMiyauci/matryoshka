<template>
  <transition>
    <div class="time">{{ time }}</div>
  </transition>
</template>

<script>
export default {
  props: {
    time: {
      type: [String, Number],
      required: true
    }
  }

  // watch: {
  //   time() {
  //     console.log(11)
  //   }
  // }
}
</script>

<style scoped>
.time {
  position: absolute;
  left: 50%;
  top: 20%;
  font-size: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  line-height: 44px;
  border: solid 3px silver;
  animation-name: bold;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
@keyframes bold {
  0% {
    font-size: 20px;
  }

  100% {
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
