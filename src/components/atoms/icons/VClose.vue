<template>
  <v-btn outlined icon @click="$emit('click')">
    <v-icon>{{ mdiClose }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiClose } from '@mdi/js'
import { createComponent } from '@vue/composition-api'
export default createComponent({
  setup() {
    return {
      mdiClose
    }
  }
})
</script>
