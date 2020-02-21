import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import VColorPicker from '~/components/molecules/VColorPicker.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
describe('VColorPicker.vue', () => {
  it('should have props of title', () => {
    const title = '#Primary'
    const wrapper = shallowMount(VColorPicker, {
      localVue,
      propsData: { title }
    })

    expect(wrapper.props().title).toBe(title)
  })
  it('should have props of color', () => {
    const color = 'rgba(255,255,255,1)'
    const wrapper = shallowMount(VColorPicker, {
      localVue,
      propsData: { color }
    })

    expect(wrapper.props().color).toBe(color)
  })
  it('should have props of hex', () => {
    const hex = 'rgba(255,255,255,1)'
    const wrapper = shallowMount(VColorPicker, {
      localVue,
      propsData: { hex }
    })

    expect(wrapper.props().hex).toBe(hex)
  })
})
