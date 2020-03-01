<template>
  <v-card class="fill-height">
    <v-toolbar dark color="success">
      <v-close v-show="!enableClose" @click="$emit('close')" />
      <v-toolbar-title
        ><v-icon left>{{ mdiCogs }}</v-icon
        >Rules</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-list>
        <v-subheader>
          <v-icon left>{{ mdiAccountSwitch }} </v-icon>Play Order
        </v-subheader>
        <v-radio-group v-model="radio">
          <v-radio
            :off-icon="mdiRadioboxBlank"
            :on-icon="mdiRadioboxMarked"
            label="Random"
            value="RANDOM"
          >
          </v-radio>
          <v-radio
            :on-icon="mdiRadioboxMarked"
            :off-icon="mdiRadioboxBlank"
            label="First"
            value="FIRST"
          ></v-radio>
          <v-radio
            :on-icon="mdiRadioboxMarked"
            :off-icon="mdiRadioboxBlank"
            label="Second"
            value="SECOND"
          ></v-radio>
        </v-radio-group>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="$emit('click', radio)">{{
        enableClose ? 'Play' : 'Update'
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import {
  mdiAccountSwitch,
  mdiCogs,
  mdiRadioboxBlank,
  mdiRadioboxMarked
} from '@mdi/js'

import VClose from '~/components/atoms/icons/VClose.vue'

type Props = {
  enableClose: boolean
}
export default createComponent({
  props: {
    enableClose: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VClose
  },

  setup() {
    const radio = ref('RANDOM')
    return {
      mdiAccountSwitch,
      radio,
      mdiCogs,
      mdiRadioboxBlank,
      mdiRadioboxMarked
    }
  }
})
</script>
