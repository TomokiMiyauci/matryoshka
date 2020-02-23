import { shallowMount } from '@vue/test-utils'
import VIconConnect from '~/components/atoms/VIconConnect.vue'

describe('VIconConnect', () => {
  it('should have icon', () => {
    const wrapper = shallowMount(VIconConnect)
    expect(wrapper.text()).toBe('mdi-cog-clockwise')
  })

  it('should have attribute of size', () => {
    const wrapper = shallowMount(VIconConnect)

    expect(wrapper.attributes().size).toBe('60')
  })
  it('should have props of size', () => {
    const wrapper = shallowMount(VIconConnect, {
      propsData: {
        size: 200
      }
    })

    expect(wrapper.attributes().size).toBe('200')
  })
})
