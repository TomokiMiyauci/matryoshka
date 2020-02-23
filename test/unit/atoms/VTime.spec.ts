import { shallowMount, mount } from '@vue/test-utils'
import VTime from '~/components/atoms/VTime.vue'

describe('VTime.vue', () => {
  it('should have props of value', () => {
    const wrapper = shallowMount(VTime, {
      propsData: {
        value: 10,
        beat: false
      }
    })

    expect(wrapper.props().value).toBe(10)
  })

  it('should have props value at child if it gives props of value', () => {
    const wrapper = mount(VTime, {
      propsData: {
        value: 10,
        beat: false
      }
    })

    expect(wrapper.text()).toBe('10')
  })

  it('should return empty class if it gives props of value what is higher than 10', () => {
    const wrapper = shallowMount(VTime, {
      propsData: {
        value: 30,
        beat: false
      }
    })

    expect(wrapper.classes()).not.toContain('before-ten-sec')
    expect(wrapper.classes()).not.toContain('before-three-sec')
  })

  it('should return before-ten-sec class if it gives props of value what is between 4 and 9', () => {
    const wrapper = shallowMount(VTime, {
      propsData: {
        value: 4,
        beat: false
      }
    })

    expect(wrapper.classes()).toContain('before-ten-sec')
    expect(wrapper.classes()).not.toContain('before-three-sec')
  })

  it('should return before-ten-sec and before-three-sec class if it gives props of value what is less then 3', () => {
    const wrapper = shallowMount(VTime, {
      propsData: {
        value: 3,
        beat: false
      }
    })

    expect(wrapper.classes()).toContain('before-ten-sec')
    expect(wrapper.classes()).toContain('before-three-sec')
  })
})
