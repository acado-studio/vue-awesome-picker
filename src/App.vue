<template>
  <div id="app" class="main-wrapper">
    <textarea></textarea>
    <p class="btn" @click="showPicker0">多列</p>
    <p class="btn" @click="showPicker1">联级</p>
    <!--
    <p class="btn">时间</p>
    <p class="btn">日期</p>
    <p class="btn">城区</p>
    -->
    <awesome-picker 
      ref="picker0"
      :data="picker0.data"
      :title="picker0.title"
      :vibrate="picker0.vibrate"
      :index="picker0.index"
      @confirm="handlePicker0Confirm">
    </awesome-picker>

    <awesome-picker 
      ref="picker1"
      :type="picker1.type"
      :data="picker1.data"
      :index="picker1.index"
      :title="picker1.title"
      @confirm="handlePicker1Confirm">
    </awesome-picker>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      picker0: {
        title: '多列选择器',
        vibrate: true,
        index: [0,1,1],
        data: [
          ['上海', '北京', '天津', '呼和浩特', '成都','上海', '北京', '天津', '呼和浩特', '成都','上海', '北京', '天津', '呼和浩特', '成都'],
        ],
      },
      picker1: {
        title: '联级选择器',
        type: 'cascade',
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
    },
    handlePicker0Confirm(v) {
      console.log(v);
    },
    showPicker1() {
      this.$refs.picker1.show();
    },
    handlePicker1Confirm(v) {
      console.log(v);
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
