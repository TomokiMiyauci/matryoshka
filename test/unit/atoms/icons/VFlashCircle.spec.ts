import { shallowMount } from '@vue/test-utils'
import { mdiFlashCircle } from '@mdi/js'
import VFlashCircle from '~/components/atoms/icons/VFlashCircle.vue'

describe('VFlashCircle.vue', () => {
  it('should have icon of mdiFlashCircle', () => {
    const wrapper = shallowMount(VFlashCircle)

    expect(wrapper.text()).toMatch(mdiFlashCircle)
  })
})
