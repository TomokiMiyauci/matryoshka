<template>
  <v-container>
    <h1 class="text-center">
      Tic Tac Toe
    </h1>

    <v-btn
      absolute
      top
      icon
      large
      href="https://naruhodo.repop.jp/javascript-animation-events/"
    >
      <v-icon>mdi-github-circle</v-icon>
    </v-btn>

    <v-btn absolute top right icon large to="/login">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>

    <v-btn class="btn-vscpu" absolute rounded>
      VS CPU
    </v-btn>
    <v-btn class="btn-vscpu" absolute style="top:70%;" to="/playrooms" rounded>
      VS Online
    </v-btn>
    <v-btn class="btn-vscpu" absolute style="top:80%;" rounded>
      How to play
    </v-btn>
    <v-icon class="bb" size="300px">
      mdi-star-circle
    </v-icon>
  </v-container>
</template>

<script>
export default {
  layout: 'landing'
}
</script>

<style>
.bb {
  position: absolute;
  top: 10%;
  left: calc(50vw - 150px);
  animation: rotate 1s infinite alternate;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    color: black;
  }
}
.btn-vscpu {
  top: 60%;
  transform: translateX(calc(50vw - 50%));
  color: red;
}
</style>
