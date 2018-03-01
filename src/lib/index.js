import BetterPicker from './better-picker.vue';
const picker = {
  install(Vue) {
    Vue.component(BetterPicker.name, BetterPicker);
  }
}
if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(picker);
}
export default picker;