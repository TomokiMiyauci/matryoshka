import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import VGameAppBar from '~/components/molecules/VGameAppBar.vue'

describe('VGameAppBar.vue', () => {
  it('should emit if button clicked', () => {
    const wrapper = mount(VGameAppBar, { vuetify: new Vuetify() })

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
