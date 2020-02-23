<template>
  <transition-group name="cell" tag="div" class="container">
    <div
      v-for="cell in state"
      :key="cell.id"
      class="cell"
      :style="`background-color:${cell.color}`"
    >
      <div style="position: absolute; display: inline-block;">
        {{ cell.text }}
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { createComponent, ref, onUnmounted } from '@vue/composition-api'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'

type ShallowArray = {
  id: number
  number: number
  color: string
  text?: string
}

function generateShallowArray(length: number): ShallowArray[] {
  return Array.apply(null, { length } as unknown[]).map(
    (_: any, index: number) => {
      const color = random(254)
      const color1 = random(254)
      const color2 = random(254)
      const transparent = random(0, 1, true)
      return {
        id: index,
        number: (index % 9) + 1,
        color: `rgba(${color},${color1},${color2},${transparent})`
      }
    }
  )
}

const useShallowArray = () => {
  const shallowArray = generateShallowArray(144)
  const state = ref<ShallowArray[]>(shallowArray)

  const shuffler = (state: any) => {
    shuffle(state)
  }

  return { state, shuffler }
}

const setText = (shallowArray: any): void => {
  const text = 'Matryoshka'
  const deviation = 13
  Array.prototype.forEach.call(text, (letter, index) => {
    shallowArray.value[index + deviation].text = letter
  })
}

export default createComponent({
  setup() {
    const { state } = useShallowArray()

    const intervalId = setInterval(() => {
      state.value = shuffle(state.value)
    }, 4000)

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    setText(state)

    return { state }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 312px;
  margin-top: 10px;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 25px;
  height: 25px;
  margin-right: -1px;
  margin-bottom: -1px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid #aaa;
  border-radius: 50%;
}

.cell:hover {
  position: relative;
  color: black;
  transition: all 1s;
  animation: buruburu 0.1s infinite;
}

@keyframes buruburu {
  50% {
    transform: translate(-1px, -1px);
  }

  100% {
    transform: translate(1px, 1px);
  }
}

.cell-move {
  transition: all 1s;
}

.cell::before {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: reflect 3s ease-in-out infinite;
  animation: reflect 3s ease-in-out 0.1s infinite;
  content: '';
}

@keyframes reflect {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  80% {
    transform: scale(0);
    opacity: 0.5;
  }

  81% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@-webkit-keyframes reflect {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  80% {
    transform: scale(0);
    opacity: 0.5;
  }

  81% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
