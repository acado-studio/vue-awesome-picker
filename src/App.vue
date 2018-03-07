<template>
  <div id="app" class="main-wrapper">
    <textarea v-model="value"></textarea>
    <p class="btn" @click="showPicker0">多列</p>
    <p class="btn" @click="showPicker1">联级</p>
    <p class="btn" @click="showPicker2">时间</p>
    <p class="btn">日期</p>
    <p class="btn" @click="showPicker4">区域</p>
    <awesome-picker 
      ref="picker0"
      :title="picker0.title"
      :data="picker0.data"
      :index="picker0.index"
      @confirm="handlePickerConfirm">
    </awesome-picker>

    <awesome-picker 
      ref="picker1"
      :title="picker1.title"
      :data="picker1.data"
      :index="picker1.index"
      @confirm="handlePickerConfirm">
    </awesome-picker>

    <awesome-picker 
      ref="picker2"
      :title="picker2.title"
      :type="picker2.type"
      @confirm="handlePickerConfirm">
    </awesome-picker>

    <awesome-picker 
      ref="picker4"
      :title="picker4.title"
      :type="picker4.type"
      @confirm="handlePickerConfirm">
    </awesome-picker>
  </div>
</template>

<script>
import areaData from './lib/data/area';

export default {
  name: 'app',
  data () {
    return {
      value: null,
      picker0: {
        title: '多列选择器',
        data: [
          ['上海', '北京', '天津', '呼和浩特', '成都','上海', '北京', '天津', '呼和浩特', '成都','上海', '北京', '天津', '呼和浩特', '成都'],
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
          {
            value: 3,
            children: [
              { value: 'g' },
              { value: 'j' },
            ],
          },
          {
            value: 4,
            children: [
              { value: 'g' },
              { value: 'j' },
            ],
          }
        ],
      },
      picker2: {
        title: '时间选择器',
        type: 'time',
      },
      picker4: {
        title: '区域选择器',
        type: 'area',        
      },
    }
  },
  methods: {
    showPicker0() {
      this.$refs.picker0.show();
      setTimeout(() => {
        this.picker0.data = [['测试']];
      }, 5000);
    },
    showPicker1() {
      this.$refs.picker1.show();
    },
    showPicker2() {
      this.$refs.picker2.show();
    },
    showPicker4() {
      this.$refs.picker4.show();
    },
    handlePickerConfirm(v) {
      this.value = v ? JSON.stringify(v) : null;
    },
  }
}
</script>

<style lang="scss">
  .main-wrapper {
    padding: 12px;
  }

  textarea {
    height: 80px;
    width: 100%;
    margin-bottom: 12px;
    padding: 12px;
    border: 2px solid #35495d;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    color: #35495d;
    font-size: 14px;
    resize: none;
  }

  .btn {
    width: 100%;
    height: 44px;
    margin-bottom: 12px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #42b983;
  }
</style>
