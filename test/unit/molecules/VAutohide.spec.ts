import { mount } from '@vue/test-utils'
import VAutohide from '~/components/molecules/VAutohide.vue'

describe('VAutohide.vue', () => {
  it('should cannot be visible with false when initialize', () => {
    const wrapper = mount(VAutohide)

    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('should have props of delay', () => {
    const wrapper = mount(VAutohide)
    wrapper.setProps({ delay: 1000 })

    expect(wrapper.props().delay).toBe(1000)
  })
})
