<template>
  <span class="playroom-id">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.playroom-id {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.8);
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background: rgba(76, 21, 228, 0.699);
}
</style>
