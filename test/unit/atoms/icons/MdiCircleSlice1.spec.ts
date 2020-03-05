import { mount } from '@vue/test-utils'
import { mdiCircleSlice1 } from '@mdi/js'
import MdiCircleSlice1 from '~/components/atoms/icons/MdiCircleSlice1.vue'

describe('MdiCircleSlice1.vue', () => {
  it('should have props of w', () => {
    const wrapper = mount(MdiCircleSlice1, { propsData: { w: '50px' } })

    expect(wrapper.props('w')).toMatch('50px')
  })

  it('should have props of h', () => {
    const wrapper = mount(MdiCircleSlice1, { propsData: { h: '50px' } })

    expect(wrapper.props('h')).toMatch('50px')
  })

  it('should have mdiCircleSlice1', () => {
    const wrapper = mount(MdiCircleSlice1)
    const path = wrapper.find('path')

    expect(path.attributes('d')).toMatch(mdiCircleSlice1)
  })
})
