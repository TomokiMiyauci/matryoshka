import { shallowMount } from '@vue/test-utils'
import TheGameRules from '~/components/organisms/TheGameRules.vue'

describe('TheGameRules.vue', () => {
  it('should have props of enableClose', () => {
    const wrapper = shallowMount(TheGameRules, {
      propsData: {
        enableClose: false
      }
    })

    expect(wrapper.props().enableClose).toBeFalsy()
  })
})
