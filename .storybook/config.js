import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue'
import { configure, addDecorator,addParameters } from '@storybook/vue'
import 'vuetify/dist/vuetify.css'
import Vuetify from 'vuetify'

const vuetifyConfig = new Vuetify({
  theme: {
    dark: false
  }
})
import { create } from '@storybook/theming';
const theme = create({
  base: 'dark',

  colorPrimary: 'red',
  colorSecondary: '#58487b',
  brandTitle: 'matryoshka',
  appContentBg: '#211c2e',
  appBg: '#6d608a',
  barBg: '#3b3152',
  barSelectedColor: 'white',
  background: { content: 'red' },

  addonActionsTheme: {
    // ...chromeLight,
    // BASE_FONT_FAMILY: typography.fonts.mono,
    BASE_BACKGROUND_COLOR: 'black',
  },
});

addParameters({
  options: {
    theme,
  },
  backgrounds: [{ name: 'default', value: '#e7e2f3', default: true }],
});

addDecorator(() => ({
  vuetify: vuetifyConfig,
  template: '<v-app><v-content><story/></v-content></v-app>',
}))


Vue.use(VueCompositionApi)
Vue.use(Vuetify)

// automatically import all files ending in *.stories.js
// const req = require.context('../stories', true, /\.stories\.js$/)
// function loadStories() {
//   req.keys().forEach((filename) => req(filename))
// }

// configure(loadStories, module)
// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.ts$/), module);

