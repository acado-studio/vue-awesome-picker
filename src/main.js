import Vue from 'vue';
import App from './App.vue';
import BetterPicker from './lib/index.js';
import 'reset-css';

Vue.use(BetterPicker);
new Vue({
  el: '#app',
  render: h => h(App)
})
