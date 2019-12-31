import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue'
import { configure, addDecorator } from '@storybook/vue'
import 'vuetify/dist/vuetify.css'
import Vuetify from 'vuetify'

const vuetifyConfig = new Vuetify({
	theme: {
		dark: false
	}
})

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

