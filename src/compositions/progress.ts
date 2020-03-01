import { reactive, toRefs } from '@vue/composition-api'
type state = { stage: number; layer: number }

export default (layer: number) => {
  const state = reactive<state>({
    stage: 0,
    layer
  })

  const next = (): void => {
    state.stage = state.stage <= state.layer ? state.stage + 1 : state.stage
  }

  const prev = (): void => {
    state.stage = state.stage > 0 ? state.stage - 1 : 0
  }

  const isStage = (
    operator: '=' | '>' | '<' | '>=' | '<=' = '=',
    ...stages: state['stage'][]
  ): boolean => {
    switch (operator) {
      case '=': {
        return stages.some((stage) => state.stage === stage)
      }
      case '<': {
        return stages.every((stage) => state.stage < stage)
      }
      case '<=': {
        return stages.every((stage) => state.stage <= stage)
      }
      case '>': {
        return stages.every((stage) => state.stage > stage)
      }
      case '>=': {
        return stages.every((stage) => state.stage >= stage)
      }
    }
  }

  const goToStage = (to: state['stage']) => {
    state.stage = to <= state.layer ? to : state.stage
  }

  const reset = () => {
    state.stage = 0
  }

  return { ...toRefs(state), isStage, goToStage, next, prev, reset }
}
