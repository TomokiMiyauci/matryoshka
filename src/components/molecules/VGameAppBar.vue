<template>
  <v-app-bar app>
    <v-toolbar-title style="margin: 0 0 0 60px;"
      >Online Playroom
    </v-toolbar-title>
    <v-gamepad-variant
      style="position:absolute;bottom:-28px;"
      @click="$emit('click')"
    />

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import VGamepadVariant from '~/components/atoms/icons/VGamepadVariant.vue'
export default createComponent({
  components: {
    VGamepadVariant
  }
})
</script>
