<template>
  <div id="app">
    <p class="btn" @click="showPicker0">多列</p>
    <!--
    <p class="btn">联级</p>
    <p class="btn">时间</p>
    <p class="btn">日期</p>
    <p class="btn">城区</p>
    -->
    <awesome-picker 
      ref="picker0"
      :data="picker0.data"
      :title="picker0.title"
      @confirm="handlePicker0Confirm">
    </awesome-picker>
  </div>
</template>

<script>
const DEMO_DATA_0 = [1,2,3,4,5,6,7,8,9];
const DEMO_DATA_1 = ['a','b','c','d','e','f','g','h','i'];
const DEMO_DATA_2 = ['A','B','C','D','E','F','G','H','I'];
export default {
  name: 'app',
  data () {
    return {
      picker0: {
        title: '多列选择器',
        data: [
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5],
        ],
      },
      picker1: {
        title: '联级选择器',
        data: [
          {
            value: 1,
            children: [
              { value: 'a' },
              { value: 'b' },
              { value: 'c' },
            ],
          },
          {
            value: 2,
            children: [
              { value: 'd' },
              { value: 'e' },
            ],
          },
        ],
      },
    }
  },
  methods: {
    showPicker0() {
      this.$refs.picker0.show();
      this.picker0.data = [DEMO_DATA_0,DEMO_DATA_1,DEMO_DATA_2];
    },
    handlePicker0Confirm(v) {
      console.log(v);
    },
  }
}
</script>

<style lang="scss">
  .btn {
    margin: 12px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #f85444;
  }
</style>
