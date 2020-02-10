<template>
  <div class="loader">Loading...</div>
</template>

<script>
export default {}
</script>

<style scoped>
.loader,
.loader::before,
.loader::after {
  width: 1em;
  height: 4em;
  background: #fff;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
}

.loader {
  position: relative;
  margin: 0 auto;
  color: #fff;
  font-size: 11px;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader::before,
.loader::after {
  position: absolute;
  top: 0;
  content: '';
}

.loader::before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader::after {
  left: 1.5em;
}

@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    height: 4em;
    box-shadow: 0 0;
  }

  40% {
    height: 5em;
    box-shadow: 0 -2em;
  }
}

@keyframes load1 {
  0%,
  80%,
  100% {
    height: 4em;
    box-shadow: 0 0;
  }

  40% {
    height: 5em;
    box-shadow: 0 -2em;
  }
}
</style>
