<template>
  <td @click="click" :class="{ placeable: isValidClass }" class="square">
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
    click() {
      if (!this.value) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped>
.square {
  width: 100px;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  font-size: 60px;
  border: 1px solid #ccc;
  text-align: center;
}

@keyframes active {
  0% {
    background: red;
  }
  100% {
    background: blue;
  }
}
.placeable {
  animation-name: active;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
