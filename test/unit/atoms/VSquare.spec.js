import { shallowMount } from '@vue/test-utils'
import VSquare from '~/components/atoms/VSquare'

describe('VSquare', () => {
  it('should trigger onClick method when it clicked', () => {
    const wrapper = shallowMount(VSquare)
    const stub = jest.fn()
    wrapper.setMethods({ onClick: stub })

    wrapper.trigger('click')

    expect(stub).toHaveBeenCalled()
  })

  it('should emit when onClick called', () => {
    const wrapper = shallowMount(VSquare)

    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('should have something value between props', () => {
    const value = 'test'
    const wrapper = shallowMount(VSquare, {
      propsData: {
        value
      }
    })

    expect(wrapper.text()).toBe(value)
  })
})
