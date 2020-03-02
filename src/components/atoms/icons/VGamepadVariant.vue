<template>
  <v-btn class="scale" fab @click="$emit('click')">
    <v-icon>{{ mdiGamepadVariant }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { mdiGamepadVariant } from '@mdi/js'

export default createComponent({
  setup() {
    return { mdiGamepadVariant }
  }
})
</script>

<style lang="scss" scoped>
.scale:hover {
  transform: scale(1.15);
  transition: transform 0.5s;
}
</style>
