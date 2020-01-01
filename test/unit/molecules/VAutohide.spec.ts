import { mount, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import VAutohide from '~/components/molecules/VAutohide.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('VAutohide.vue', () => {
  it('should cannot be visible with false when initialize', () => {
    const wrapper = mount(VAutohide, { localVue })

    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('should have props of delay', () => {
    const wrapper = mount(VAutohide, { localVue })
    wrapper.setProps({ delay: 1000 })

    expect(wrapper.props().delay).toBe(1000)
  })
})
