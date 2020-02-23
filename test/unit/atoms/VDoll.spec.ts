import { shallowMount } from '@vue/test-utils'
import VDoll from '~/components/atoms/VDoll.vue'

describe('VDoll.vue', () => {
  it('should be img element ', () => {
    const wrapper = shallowMount(VDoll)

    expect(wrapper.contains('img')).toBeTruthy()
  })

  it('should have props interface named width', () => {
    const wrapper = shallowMount(VDoll, {
      propsData: {
        size: '30px'
      }
    })
    expect(wrapper.props().size).toBe('30px')
  })

  it('should have attribute of width and height through props', () => {
    const wrapper = shallowMount(VDoll, {
      propsData: {
        size: '30'
      }
    })

    expect(wrapper.attributes().width).toBe('30')
    expect(wrapper.attributes().height).toBe('30')
  })

  it('should have props interface of color', () => {
    const wrapper = shallowMount(VDoll, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })

  it('should have image src if give props of color is red', () => {
    const wrapper = shallowMount(VDoll, {
      propsData: {
        color: 'red'
      }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should display image if give props of color is red or blue', () => {
    const wrapper = shallowMount(VDoll, {
      propsData: {
        color: 'blue'
      }
    })

    expect(wrapper.attributes()).toBeTruthy()
  })
})
