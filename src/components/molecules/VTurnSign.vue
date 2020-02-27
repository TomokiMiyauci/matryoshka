<template>
  <v-autohide ref="autohide" style="position: relative;" :delay="500">
    <v-icon
      color="grey darken-1"
      :class="classStyle"
      class="position turn-sign"
      size="200px"
      >{{ turnIcon }}</v-icon
    >
    <div class="position turn-text">{{ turnText }}</div>
  </v-autohide>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import { mdiSwordCross, mdiShieldSun } from '@mdi/js'
import VAutohide from '~/components/molecules/VAutohide.vue'

type Props = {
  player: 'PLAYER_1' | 'PLAYER_2'
  nextPlayer: string
}

export default createComponent({
  props: {
    player: {
      type: String,
      require: true
    },

    nextPlayer: {
      type: String,
      require: true
    }
  },

  components: {
    VAutohide
  },

  setup(props: Props) {
    const isYourTurn = computed(() => {
      return props.player === props.nextPlayer
    })

    const autohide = ref<any>()
    const show = () => {
      autohide.value.show()
    }

    const turnIcon = computed(() => {
      return isYourTurn.value ? mdiSwordCross : mdiShieldSun
    })

    const turnText = computed(() => {
      return isYourTurn.value ? 'Your Turn' : 'Enemy Turn'
    })

    const classStyle = computed(() => {
      if (isYourTurn.value) {
        switch (props.player) {
          case 'PLAYER_1': {
            return 'your-turn-red'
          }
          case 'PLAYER_2': {
            return 'your-turn-blue'
          }
        }
      }
      return isYourTurn.value ? 'your-turn' : 'enemy-turn'
    })

    return {
      turnIcon,
      turnText,
      show,
      autohide,
      classStyle
    }
  }
})
</script>

<style scoped>
.position {
  position: absolute;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%); /* Safari用 */
  transform: translate(-50%, -50%);
}

.turn-sign {
  padding: 20px;
  border: 1px solid rgba(87, 85, 85, 0.822);
  border-radius: 20%;
}

.your-turn-red {
  background: rgba(223, 37, 37, 0.8);
}

.your-turn-blue {
  background: rgba(37, 71, 223, 0.8);
}

.enemy-turn {
  background: rgba(20, 19, 18, 0.795);
}

.turn-text {
  display: inline-block;
  font-weight: bold;
  font-size: 45px;
  white-space: nowrap;
  -webkit-text-stroke: 1px rgba(87, 85, 85, 0.822);
}
</style>
