import { configure } from '@storybook/vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; 

Vue.use(Vuetify);

configure(require.context('../stories', true, /\.stories\.js$/), module);
