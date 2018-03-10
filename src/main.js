/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import AwesomePicker from './lib/index.js'
import 'reset-css'

Vue.use(AwesomePicker)
new Vue({
  el: '#app',
  render: h => h(App)
})
