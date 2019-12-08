<template>
  <div
    :class="{
      'before-ten-sec': beforeTenSec,
      'before-three-sec': beforeThreeSec
    }"
    class="time"
  >
    {{ time }}
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    beforeTenSec() {
      return this.time < 10
    },

    beforeThreeSec() {
      return this.beforeTenSec && this.time <= 3
    }
  }
}
</script>

<style scoped lang="scss">
$warning: #e53935;
$weak-warning: #fdd835;

.time {
  text-align: center;
  font-size: 20px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: inline-block;
  line-height: 55px;
  border: solid 10px #ffffff;
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

@keyframes strong {
  0% {
    font-size: 20px;
  }

  100% {
    font-size: 50px;
    font-weight: bold;
  }
}
.before-ten-sec {
  color: $weak-warning;
  border: solid 10px $weak-warning;
}
.before-three-sec {
  color: $warning;
  border: solid 10px $warning;
  animation: strong 1s;
  animation-iteration-count: infinite;
}
</style>
