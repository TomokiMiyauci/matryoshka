import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import VThemeColors from '~/components/molecules/VThemeColors.vue'
import vuetifyOptions from '~/../vuetify.options'
const { light } = vuetifyOptions.theme.themes

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('VThemeColors', () => {
  it('should have props of theme', () => {
    const theme = Object.entries(light).map(([key, value]) => ({
      color: value,
      title: key
    }))
    const wrapper = shallowMount(VThemeColors, {
      localVue,
      propsData: {
        theme
      }
    })
    expect(wrapper.props().theme).toEqual(theme)
  })
})
