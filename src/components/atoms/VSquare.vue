<template>
  <td
    @click="onClick"
    :class="{ placeable: isValidClass, bounce: value }"
    class="square"
  >
    {{ value }}
  </td>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },

    isValidClass: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick() {
      if (!this.value) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.square {
  width: 100px;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  font-size: 60px;
  border: 1px solid rgba(128, 128, 128, 0.781);
  text-align: center;
  background-color: rgb(80, 80, 80);
}

@keyframes active {
  0% {
    background: rgba(88, 21, 212, 0.226);
  }
  100% {
    background: rgba(88, 21, 212, 0.671);
    border: 2px solid rgba(241, 226, 15, 0.767);
    box-shadow: 1px 1px 8px 5px rgba(255, 255, 0, 0.8) inset;
  }
}
.placeable {
  animation-name: active;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
}
.placeable:hover {
  opacity: 0.5;
}
.bounce {
  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
}
@keyframes bounce {
  0% {
    transform: translateY(0);
    background: yellow;
  }

  30% {
    transform: translateY(-100px);
  }

  50% {
    transform: translateY(0px);
  }

  60% {
    transform: translateY(-30px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
