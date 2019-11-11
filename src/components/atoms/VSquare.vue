<template>
  <td class="square" @click="click">{{ value }}</td>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
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
</style>
