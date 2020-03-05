import { shallowMount, mount } from '@vue/test-utils'
import VConnectionLoader from '~/components/molecules/VConnectionLoader.vue'

describe('VConnectionLoader.vue', () => {
  it('should have props of isCenter', () => {
    const wrapper = shallowMount(VConnectionLoader, {
      propsData: {
        isCenter: false
      }
    })

    expect(wrapper.props('isCenter')).toBeFalsy()
  })

  it('should have spin class', () => {
    const wrapper = mount(VConnectionLoader)
    const svg = wrapper.find('svg')

    expect(svg.classes('spin')).toBeTruthy()
  })

  it('should width and height is 300px when props of isCenter is true', () => {
    const wrapper = mount(VConnectionLoader, {
      propsData: {
        isCenter: true
      }
    })
    const svg = wrapper.find('svg')

    expect(svg.attributes('width')).toBe('300px')
    expect(svg.attributes('height')).toBe('300px')
  })

  it('should width and height is 50px when props of isCenter is false', () => {
    const wrapper = mount(VConnectionLoader, {
      propsData: {
        isCenter: false
      }
    })
    const svg = wrapper.find('svg')

    expect(svg.attributes('width')).toBe('50px')
    expect(svg.attributes('height')).toBe('50px')
  })

  it('should not have moved-position class when props of isCenter is true', () => {
    const wrapper = shallowMount(VConnectionLoader, {
      propsData: {
        isCenter: true
      }
    })

    expect(wrapper.classes('moved-position')).toBeFalsy()
  })

  it('should have moved-position class when props of isCenter is false', () => {
    const wrapper = shallowMount(VConnectionLoader, {
      propsData: {
        isCenter: false
      }
    })

    expect(wrapper.classes('moved-position')).toBeTruthy()
  })
})
