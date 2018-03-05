<template>
  <div>
    <transition name="fade">
      <div class="mask" v-show="display" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div class="picker" v-show="display">
      <div class="picker-title">
        <span class="pt-cancel" @click="cancel">取消</span>
        <span class="pt-submit" @click="confirm">确认</span>
        <h4>{{title}}</h4>
      </div>
      <div class="picker-panel">
        <div class="picker-mask-top"></div>
        <div class="picker-mask-bottom"></div>
        <div class="picker-wheel-wrapper" ref="wheelWrapper">
          <div class="picker-wheel" v-for="(wheel, index) in data" :key="index">
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

  const MAX_WHEEL_NUM = 3;

  const EVENT_CHANEG = 'change';
  const EVENT_CONFIRM = 'confirm';
  const EVENT_CANCEL = 'cancel';

  export default {
    name: 'awesome-picker',
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      defaultSelected: {
        type: Array,
        default() {
          return [];
        },
      },
      title: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        isCascadePicker: false,
        display: false,
        wheels: [],
      }
    },
    methods: {
      show() {
        this.display = true;
        this.initPicker();
      },
      hide() {
        this.wheels.forEach((wheel) => {
          wheel.disable();
        });
        this.display = false;
      },
      initPicker() {
        this.wheels = [];
        this.$nextTick(() => {
          const wheelWrapper = this.$refs.wheelWrapper;
          this.data.forEach((item, index) => {
            this.createWheel(wheelWrapper, index);
          });
          this.setValue(this.defaultSelected);
        });
      },
      createWheel(wheelWrapper, i) {
        if (!this.wheels[i]) {
          const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: 0,
              rotate: 30,
            },
            swipeTime: 2500,
          });
          wheel.on('scrollEnd', () => {
            const currentValue = this.getCurrentValue();
            this.isCascadePicker && this.setData(i);
            this.$emit(EVENT_CHANEG, currentValue);
          });
        } else {
          this.wheels[i].refresh();
        }
      },
      setValue(data) {
        this.wheels.forEach((wheel, i) => {
          wheel.wheelTo(data[i] && this.data[i].indexOf(data[i]) !== -1 ? this.data[i].indexOf(data[i]) : 0);
        });
      },
      getCurrentValue() {
        const value = [];
        this.wheels.forEach((wheel, i) => {
          value.push(this.data[i][wheel.getSelectedIndex()]);
        });
        return value;
      },
      confirm() {
        const isInTransition = this.wheels.some((wheel) => {
          return wheel.isInTransition;
        });
        if (isInTransition) {
          return;
        }
        const selectedValues = this.getCurrentValue();
        this.$emit(EVENT_CONFIRM, selectedValues);
        this.hide();
      },
      cancel() {
        this.$emit(EVENT_CANCEL);
        this.hide();
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
      background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,.5));

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
      background: linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,.5));

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