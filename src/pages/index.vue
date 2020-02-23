<template>
  <v-container style="height: 100%; padding: 0;">
    <v-row class="a" align="center" justify="center">
      <v-btn
        absolute
        top
        left
        icon
        large
        href="https://github.com/TomokiMiyauci/matryoshka"
      >
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
      <h1 class="text-center titler white--text">
        Matryoshka
      </h1>
    </v-row>
    <v-row class="b" align="center" justify="center">
      <v-matrix-object></v-matrix-object>
    </v-row>
    <v-btn absolute top right icon large to="/login">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>

    <v-row class="c" justify="center" align-content="center" align="center">
      <v-col cols="auto"
        ><v-btn
          to="/playrooms/vscpu"
          max-width="500px"
          min-width="200px"
          width="50vw"
          color="cyan"
          rounded
          class="white--text"
        >
          <span class="mr-3" style="color: #ffc107;">VS</span>CPU</v-btn
        ></v-col
      >
      <v-col cols="auto">
        <v-btn
          disabled
          to="/playrooms"
          max-width="500px"
          min-width="200px"
          width="50vw"
          rounded
          color="success"
          ><span class="mr-3" style="color: #ffc107;">VS</span>Online</v-btn
        >
      </v-col>
      <v-col cols="auto"
        ><v-btn
          disabled
          color="warning"
          max-width="500px"
          min-width="200px"
          width="50vw"
          rounded
          >{{ $t('HOW_TO_PLAY') }}</v-btn
        ></v-col
      >
    </v-row>
    <!-- <v-icon class="bb" size="300px">
      mdi-star-circle
    </v-icon> -->
  </v-container>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import VMatrixObject from '~/components/atoms/VMatrixObject.vue'
export default createComponent({
  layout: 'landing',

  components: {
    VMatrixObject
  }
})
</script>

<style lang="scss" scoped>
@import url('//fonts.googleapis.com/css?family=Pacifico&text=Pure');
@import url('//fonts.googleapis.com/css?family=Roboto:700&text=css');
@import url('//fonts.googleapis.com/css?family=Kaushan+Script&text=!');

.bb {
  position: absolute;
  top: 10%;
  left: calc(50vw - 150px);
  animation: rotate 1s infinite alternate;
}

.titler {
  font: 10vw 'Pacifico', 'Kaushan Script', Futura, 'Roboto', 'Trebuchet MS',
    Helvetica, sans-serif;
  animation: fuwafuwa 3s infinite linear alternate;
}

@media (min-width: 800px) {
  .titler {
    font-size: 124px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    color: black;
    transform: rotate(360deg);
  }
}

.btn-vscpu {
  top: 60%;
  transform: translateX(calc(50vw - 50%));
}

@keyframes fuwafuwa {
  0% {
    transform: translate(0, 0) rotate(-5deg);
  }

  50% {
    transform: translate(0, -5px) rotate(0deg);
  }

  100% {
    transform: translate(0, 0) rotate(5deg);
  }
}

.a {
  height: 10%;
  margin: 0;
}

.b {
  height: 55%;
  margin: 0;
}

.c {
  flex-direction: column;
  height: 33%;
  margin: 0;
}
</style>
