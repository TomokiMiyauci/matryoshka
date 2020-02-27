import { shallowMount } from '@vue/test-utils'
import { mdiCogClockwise } from '@mdi/js'
import VIconConnect from '~/components/atoms/VIconConnect.vue'
describe('VIconConnect', () => {
  it('should have icon', () => {
    const wrapper = shallowMount(VIconConnect, {
      propsData: {
        size: 200
      }
    })

    expect(wrapper.text()).toBe(mdiCogClockwise)
  })

  it('should have attribute of size', () => {
    const wrapper = shallowMount(VIconConnect, {
      propsData: {
        size: 60
      }
    })

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
