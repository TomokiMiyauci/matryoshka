import { shallowMount, mount } from '@vue/test-utils'
import { mdiClose } from '@mdi/js'
import VClose from '~/components/atoms/icons/VClose.vue'

describe('VClose.vue', () => {
  it('should have icon of mdiClose', () => {
    const wrapper = shallowMount(VClose)

    expect(wrapper.find('v-icon-stub').text()).toBe(mdiClose)
  })

  it('should emit when it click', () => {
    const wrapper = mount(VClose)

    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
