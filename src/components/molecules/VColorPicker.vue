<template>
  <v-card class="card">
    <v-card-text>
      <div v-show="!!title" class="title mb-3">{{ title }}</div>
      <div class="color-preview" :style="{ backgroundColor: color }" />

      <div class="hex">
        {{ hex }}
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-2" icon>
              <v-icon v-on="on">mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>Copy</span>
        </v-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    title: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: 'rgba(255,255,255,1)',
      required: true
    },

    hex: {
      type: String,
      default: 'rgba(255,255,255,1)'
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  display: inline-flex;
}
.color-preview {
  width: 150px;
  height: 150px;
  border: 1px solid grey;
  border-radius: 50%;
}
.hex {
  padding: 10px 5px 0 5px;
  font-size: 1rem;
}
</style>
