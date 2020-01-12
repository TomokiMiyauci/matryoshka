import VueCompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VSquare from '~/components/molecules/VSquare.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

const element = { row: 0, col: 0, value: [] }

describe('VSquare.vue', () => {
  it('should have props of element', () => {
    const element = { row: 0, col: 0, value: [] }
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        element
      }
    })

    expect(wrapper.props().element).toEqual(element)
  })

  it('should recive object type through props of element', () => {
    const element = { row: 0, col: 0, value: [] }
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        element
      }
    })

    expect(typeof wrapper.props().element).toBe('object')
  })

  it('should have slot at inner child', () => {
    const wrapper = shallowMount(VSquare, {
      localVue,
      slots: {
        default: '<span>test</span>'
      },
      propsData: {
        element
      }
    })
    const slotContent = wrapper.find('span')

    expect(slotContent.exists()).toBeTruthy()
    expect(slotContent.text()).toBe('test')
  })

  it('should trigger emit when clicked', () => {
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        element
      }
    })
    wrapper.trigger('click')

    expect(wrapper.emitted('click')).not.toBeUndefined()
  })

  it('should return value when emitted', () => {
    const element = { row: 0, col: 0, value: [] }
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        element
      }
    })
    wrapper.trigger('click')

    expect(wrapper.emitted('click')[0][0]).toEqual({ ...element })
  })

  it('should renders the correct markup', () => {
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        element
      }
    })

    expect(wrapper).toMatchSnapshot()
  })
})
