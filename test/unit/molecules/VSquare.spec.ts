import VueCompositionApi from '@vue/composition-api'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VSquare from '~/components/molecules/VSquare.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('VSquare.vue', () => {
  it('should have props of piece', () => {
    const piece = { row: 0, col: 0, value: [] }
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        piece
      }
    })

    expect(wrapper.props().piece).toEqual(piece)
  })

  it('should recive object type through props of piece', () => {
    const piece = { row: 0, col: 0, value: [] }
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        piece
      }
    })

    expect(typeof wrapper.props().piece).toBe('object')
  })

  it('should have slot at inner child', () => {
    const wrapper = shallowMount(VSquare, {
      localVue,
      slots: {
        default: '<span>test</span>'
      }
    })
    const slotContent = wrapper.find('span')

    expect(slotContent.exists()).toBeTruthy()
    expect(slotContent.text()).toBe('test')
  })

  it('should trigger emit when clicked', () => {
    const wrapper = shallowMount(VSquare, {
      localVue
    })
    wrapper.trigger('click')

    expect(wrapper.emitted('click')).not.toBeUndefined()
  })

  it('should return value when emitted', () => {
    const piece = { row: 0, col: 0, value: [] }
    const wrapper = shallowMount(VSquare, {
      localVue,
      propsData: {
        piece
      }
    })
    wrapper.trigger('click')

    expect(wrapper.emitted('click')[0][0]).toEqual({ ...piece })
  })

  it('should renders the correct markup', () => {
    const wrapper = shallowMount(VSquare, {
      localVue
    })

    expect(wrapper).toMatchSnapshot()
  })
})
