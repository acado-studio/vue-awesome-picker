<template>
  <div id="app"> 
    <p @click="showPicker()">点击展示picker</p>
    <better-picker 
      ref="picker"
      :pickerData="picker.data">
    </better-picker>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      picker: {
        data: [[1,2,3,4,5]],
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showPicker() {
      this.$refs.picker.show();
    },
    hidePicker() {
      this.$refs.picker.hide();
    },
  }
}
</script>

<style lang="scss">

</style>
