<template>
  <v-container>
    <v-layout row>
      <v-color-picker
        v-for="color in theme"
        :key="color.title"
        class="ma-3"
        :title="color.title"
        :color="color.color"
        :hex="color.color"
      ></v-color-picker>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import VColorPicker from '~/components/molecules/VColorPicker.vue'
export default createComponent({
  components: {
    VColorPicker
  },

  props: {
    theme: {
      type: Array,
      required: true
    }
  }
})
</script>
