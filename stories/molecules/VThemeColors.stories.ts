import VThemeColors from '~/components/molecules/VThemeColors.vue'
import vuetifyOptions from '~/../vuetify.options'
export default {
  title: `theme|Color`,
  parameters: {
    info: {
      summary: `molecules of VThemeColors is great component.`
    }
  }
}

const template = `<v-theme-colors :theme="theme" />`
const { dark, light } = vuetifyOptions.theme.themes

export const Light = () => ({
  components: { VThemeColors },
  template,

  props: {
    theme: {
      default: [
        { title: '#primary', color: light.primary },
        { title: '#secondary', color: light.secondary },
        { title: '#accent', color: light.accent },
        { title: '#error', color: light.error },
        { title: '#info', color: light.info },
        { title: '#success', color: light.success },
        { title: '#warning', color: light.warning }
      ]
    }
  },

  decorator: {
    template: '<div><h1>Light Colors </h1>'
  }
})

export const Dark = () => ({
  components: { VThemeColors },
  template,

  props: {
    theme: {
      default: [
        { title: '#primary', color: dark.primary },
        { title: '#secondary', color: dark.secondary },
        { title: '#accent', color: dark.accent },
        { title: '#error', color: dark.error },
        { title: '#info', color: dark.info },
        { title: '#success', color: dark.success },
        { title: '#warning', color: dark.warning }
      ]
    }
  }
})
