import VueCompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VTimer from '~/components/molecules/VTimer.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

jest.useFakeTimers()

describe('VTimer.vue', () => {
  it('should be default props value is 30', () => {
    const wrapper = shallowMount(VTimer, { localVue })

    expect(wrapper.attributes().value).toBe('30')
  })

  it('should overwrite default props if it gives props', () => {
    const wrapper = shallowMount(VTimer, {
      localVue,
      propsData: {
        count: 10
      }
    })

    expect(wrapper.attributes().value).toBe('10')
  })

  it('should emit if count is 0', () => {
    const wrapper = shallowMount(VTimer, {
      localVue,
      propsData: {
        count: 10,
        isWorking: true
      }
    })
    jest.runAllTimers()

    expect(wrapper.emitted().timeup).toBeTruthy()
  })

  it('should not emit if component is destroyed before count is 0', () => {
    const wrapper = shallowMount(VTimer, {
      localVue
    })
    wrapper.destroy()
    jest.runAllTimers()

    expect(wrapper.emitted().timeup).toBeFalsy()
  })
})
