import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue'
import { configure, addDecorator,addParameters } from '@storybook/vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { create } from '@storybook/theming';
import { withKnobs } from '@storybook/addon-knobs'

const vuetifyConfig = new Vuetify({
  theme: {
    dark: false
  }
})

const theme = create({
  base: 'dark',
  colorPrimary: 'red',
  colorSecondary: '#58487b',
  brandTitle: 'matryoshka',
  appContentBg: '#211c2e',
  appBg: '#6d608a',
  barBg: '#3b3152',
  barSelectedColor: 'white',
});

addParameters({
  options: {
    theme,
  },

  backgrounds: [
  { name: 'default', value: '#e7e2f3', default: true },
  { name: 'twitter', value: '#00aced' },
  { name: 'facebook', value: '#3b5998' }]
});

addDecorator(withKnobs)

addDecorator(() => ({
  vuetify: vuetifyConfig,
  template: '<v-app><v-content><story /></v-content></v-app>',
}))

if (typeof jest === "undefined") {
  // TODO: Dirty workaround
  const { withInfo } = require('storybook-addon-vue-info');
  addDecorator(withInfo({ info: true }));
}

Vue.use(VueCompositionApi)
Vue.use(Vuetify)

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.ts$/)
// function loadStories() {
//   req.keys().forEach((filename) => req(filename))
// }

// configure(loadStories, module)
// automatically import all files ending in *.stories.js
configure(req, module)
