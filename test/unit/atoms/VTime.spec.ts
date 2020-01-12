import VueCompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import VTime from '~/components/atoms/VTime.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('VTime.vue', () => {
  it('should have props of value', () => {
    const wrapper = shallowMount(VTime, {
      localVue,
      propsData: {
        value: 10
      }
    })

    expect(wrapper.props().value).toBe(10)
  })

  it('should have props value at child if it gives props of value', () => {
    const wrapper = mount(VTime, {
      localVue,
      propsData: {
        value: 10
      }
    })

    expect(wrapper.text()).toBe('10')
  })

  it('should return empty class if it gives props of value what is higher than 10', () => {
    const wrapper = shallowMount(VTime, {
      localVue,
      propsData: {
        value: 30
      }
    })

    expect(wrapper.classes()).not.toContain('before-ten-sec')
    expect(wrapper.classes()).not.toContain('before-three-sec')
  })

  it('should return before-ten-sec class if it gives props of value what is between 4 and 9', () => {
    const wrapper = shallowMount(VTime, {
      localVue,
      propsData: {
        value: 4
      }
    })

    expect(wrapper.classes()).toContain('before-ten-sec')
    expect(wrapper.classes()).not.toContain('before-three-sec')
  })

  it('should return before-ten-sec and before-three-sec class if it gives props of value what is less then 3', () => {
    const wrapper = shallowMount(VTime, {
      localVue,
      propsData: {
        value: 3
      }
    })

    expect(wrapper.classes()).toContain('before-ten-sec')
    expect(wrapper.classes()).toContain('before-three-sec')
  })
})
