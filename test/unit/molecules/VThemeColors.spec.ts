import { shallowMount } from '@vue/test-utils'
import VThemeColors from '~/components/molecules/VThemeColors.vue'
import vuetifyOptions from '~/../vuetify.options'
const { light } = vuetifyOptions.theme.themes

describe('VThemeColors', () => {
  it('should have props of theme', () => {
    const theme = Object.entries(light).map(([key, value]) => ({
      color: value,
      title: key
    }))
    const wrapper = shallowMount(VThemeColors, {
      propsData: {
        theme
      }
    })
    expect(wrapper.props().theme).toEqual(theme)
  })
})
