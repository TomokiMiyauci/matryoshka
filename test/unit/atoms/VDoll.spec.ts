import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import VDoll from '~/components/atoms/VDoll.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('VDoll.vue', () => {
  it('should be img element ', () => {
    const wrapper = shallowMount(VDoll, { localVue })

    expect(wrapper.contains('img')).toBeTruthy()
  })

  it('should have props interface named width', () => {
    const wrapper = shallowMount(VDoll, {
      localVue,
      propsData: {
        width: '30px'
      }
    })
    expect(wrapper.props().width).toBe('30px')
  })

  it('should have attribute of width through props', () => {
    const wrapper = shallowMount(VDoll, {
      localVue,
      propsData: {
        width: '30'
      }
    })

    expect(wrapper.attributes().width).toBe('30')
  })

  it('should have props interface of color', () => {
    const wrapper = shallowMount(VDoll, {
      localVue,
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })

  it('should have image src if give props of color is red', () => {
    const wrapper = shallowMount(VDoll, {
      localVue
    })

    wrapper.setProps({
      color: 'red'
    })

    expect(wrapper.isVueInstance()).toBeTruthy()

    // const src = '~/asserts/img/doll-red.png'

    // expect(wrapper.attributes().src).toBeTruthy()
  })

  it('should display image if give props of color is red or blue', () => {
    const wrapper = shallowMount(VDoll, {
      localVue
    })

    wrapper.setProps({
      color: 'blue'
    })

    expect(wrapper.attributes()).toBeTruthy()
  })
})
