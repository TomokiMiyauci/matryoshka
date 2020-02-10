<template>
  <div class="wrapper">
    <div v-for="dot in dots" :key="dot" class="circle"></div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  setup() {
    return {
      dots: 3
    }
  }
})
</script>

<style scoped lang="scss">
.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 5px;
  background-color: turquoise;
  border-radius: 100%;
  animation: move-the-circle 1s infinite;
}

@for $num from 1 through 3 {
  .circle:nth-child(#{$num}) {
    animation-delay: $num * 0.1s;
  }
}

@keyframes move-the-circle {
  0% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    background-color: blue;
    transform: translate(0, 0) scale(0.4);
    opacity: 0.5;
  }

  100% {
    transform: translate(0, 0) scale(1);
  }
}

.wrapper {
  display: inline-block;
}
</style>
