<template>
  <div>
    <transition name="fade">
      <div class="mask" v-show="display" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div class="picker" v-show="display">
      <div class="picker-title">
        <span class="pt-cancel" @click="hide">取消</span>
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
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'better-picker',
    props: {
      pickerData: {
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
        display: false,
        wheels: [],
      }
    },
    methods: {
      show() {
        this.display = true;
        this.wheels = [];
        this.$nextTick(() => {
          const wheelWrapper = this.$refs.wheelWrapper;
          this.pickerData.forEach((item, index) => {
            this.initWheel(wheelWrapper.children[index], index);
          });
        });
      },
      hide() {
        this.display = false;
        this.wheels.forEach((wheel) => {
          wheel.disable();
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
  }
</script>

<style lang="scss" scoped>
  /* fade */
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }

  /* slide */
  .slide-enter, .slide-leave-to {
    opacity: 0.5;
    transform: translate3d(0, 270px, 0)
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease;
  }

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
      height: 44px;
      line-height: 44px;
      padding: 0 12px;    
      font-size: 14px;
    }

    .pt-cancel {
      left: 0;
      color: #999;
    }

    .pt-submit {
      right: 0;
      color: #f85444;
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