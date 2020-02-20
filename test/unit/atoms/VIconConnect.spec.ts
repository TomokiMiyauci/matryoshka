import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import VIconConnect from '~/components/atoms/VIconConnect.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('VIconConnect', () => {
  it('should have icon', () => {
    const wrapper = shallowMount(VIconConnect, { localVue })
    expect(wrapper.text()).toBe('mdi-cog-clockwise')
  })

  it('should have attribute of size', () => {
    const wrapper = shallowMount(VIconConnect, { localVue })

    expect(wrapper.attributes().size).toBe('60')
  })
  it('should have props of size', () => {
    const wrapper = shallowMount(VIconConnect, {
      localVue,
      propsData: {
        size: 200
      }
    })

    expect(wrapper.attributes().size).toBe('200')
  })
})
