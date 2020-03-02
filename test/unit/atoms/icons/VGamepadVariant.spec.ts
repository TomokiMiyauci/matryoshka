import { shallowMount, mount } from '@vue/test-utils'
import { mdiGamepadVariant } from '@mdi/js'
import VGamepadVariant from '~/components/atoms/icons/VGamepadVariant.vue'

describe('VGamepadVariant.vue', () => {
  it('should have icon of mdiGamepadVariant', () => {
    const wrapper = shallowMount(VGamepadVariant)

    expect(wrapper.text()).toBe(mdiGamepadVariant)
  })

  it('should emit if it clicked', () => {
    const wrapper = mount(VGamepadVariant)

    wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
