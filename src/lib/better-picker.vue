<template>
  <div>
    <div class="mask" v-show="show"></div>
    <div class="picker" v-show="show">
      <div class="picker-title">
        <span class="pt-cancel">取消</span>
        <span class="pt-submit">确认</span>
        <h4>picker</h4>
      </div>
      <div class="picker-panel">
        <div class="picker-mask-top"></div>
        <div class="picker-mask-bottom"></div>
        <div class="picker-wheel-wrapper" ref="wheelWrapper">
          <div class="picker-wheel" v-for="(wheel, index) in pickerData" :key="index">
            <ul class="wheel-scroll">
              <li class="wheel-item" v-for="(item, index) in wheel" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'better-picker',
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      selectedIndex: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data () {
      return {
        show: false,
        pickerData,
        wheels: [],
      }
    },
    methods: {
      show() {
        this.wheels = [];
        this.$nextTick(() => {
          const wheelWrapper = this.$refs.wheelWrapper;
          this.pickerData.forEach((item, index) => {
            this.initWheel(wheelWrapper.children[index], index);
          });
        });
      },
      initWheel(wheelDom, i) {
        if (!this.wheels[i]) {
          const wheel = this.wheels[i] = new BScroll(wheelDom, {
            wheel: {
              selectedIndex: 0,
              rotate: 25,
            },
            swipeTime: 2500,
          });
        }
      },
    },
    created() {
      this.show();
    },
  }
</script>

<style lang="scss" scoped>

  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0,0,0,.2);
  }

  .picker {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 270px;
    z-index: 10000;
    background: #fff;
  }

  .picker-title {
    position: relative;
    height: 44px;

    &:after {
      content: '';
      display: block;
      border-bottom: 1px solid #ebebeb;
      left: 0;
      right: 0;
      transform: scaleY(.5);
    }

    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
    }

    .pt-cancel {
      left: 12px;
      color: #999;
    }

    .pt-submit {
      right: 12px;
    }

    h4 {
      margin: 0;
      height: 44px;
      line-height: 44px;
      text-align: center;
    }
  }

  .picker-panel {
    position: relative;
    height: 226px;
    padding: 24px 12px;
    box-sizing: border-box;

    .picker-mask-top, .picker-mask-bottom {
      position: absolute;
      left: 0;
      right: 0;
      height: 73px;
      background: #fff;
      transform: translateZ(0);
      z-index: 1;
      pointer-events: none;
    }

    .picker-mask-top {
      top: 24px;
      background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,.2));

      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #ebebeb;
        transform: scaleY(.5);
      }
    }

    .picker-mask-bottom {
      bottom: 24px;
      background: linear-gradient(to top, rgba(255,255,255,.9), rgba(255,255,255,.6));

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        border-bottom: 1px solid #ebebeb;
        transform: scaleY(.5);
      }
    }
  }

  .picker-wheel-wrapper {
    display: flex;
    align-items: stretch;
    height: 100%;

    .picker-wheel {
      flex: 1;
      overflow: hidden;
    }

    .wheel-scroll {
      margin-top: 73px;

      .wheel-item {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        text-align: center;
      }
    }
  }
</style>