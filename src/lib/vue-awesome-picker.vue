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
  import timeData from './data/time.js';
  import areaData from './data/area.js';

  const DATA_NORMAL = 'normal';
  const DATA_CASCADE = 'cascade';

  const TYPE_NORMAL = 'normal';
  const TYPE_TIME = 'time';
  const TYPE_DATE = 'date';
  const TYPE_AREA = 'area';

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
      type: {
        type: String,
        default: TYPE_NORMAL,
      },
      index: {
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
        display: false,
        pickerData: this.dataGetter(),
        pickerIndex: this.index.slice(),
        wheels: [],
      }
    },
    computed: {
      proxyData() {
        return this.dataGetter();
      },
      dataType() {
        return !Array.isArray(this.proxyData[0]) || this.type === TYPE_AREA ? DATA_CASCADE : DATA_NORMAL;
      },
    },
    methods: {
      show() {
        this.display = true;
        this.dataType === DATA_CASCADE && this.updatePickerData();
        this.initPicker();
      },

      hide() {
        this.wheels.forEach((wheel) => {
          wheel.disable();
        });
        this.display = false;
      },

      dataGetter() {
        let data = null;
        switch (this.type) {
          case TYPE_TIME:
            data = timeData; break;
          case TYPE_AREA:
            data = areaData; break;
          case TYPE_NORMAL:
          default:
            data = this.data; break;
        }
        return data.slice();
      },

      initPicker() {
        this.wheels = [];
        this.$nextTick(() => {
          const wheelWrapper = this.$refs.wheelWrapper;
          this.pickerData.forEach((item, index) => {
            this.createWheel(wheelWrapper, index);
          });
          this.wheelToIndex(this.pickerIndex);
        });
      },

      createWheel(wheelWrapper, i) {
        if (!this.wheels[i]) {
          const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: 0,
              rotate: 25,
            },
            bounceTime: 500,
            swipeTime: 1800,
          });
          wheel.on('scrollEnd', () => {
            this.cascadePickerChange(i);
          });
        } else {
          this.wheels[i].refresh();
        }
        return this.wheels[i];
      },

      cascadePickerChange(i) {
        if (this.dataType !== DATA_CASCADE) {
          return
        }
        const newIndex = this.getCurrentValue()[i].index;
        if (newIndex !== this.pickerIndex[i]) {
          this.pickerIndex.splice(i, 1, newIndex);
          this.updatePickerData(i + 1);
        }
      },

      wheelToIndex(data) {
        this.wheels.forEach((wheel, i) => {
          wheel.wheelTo(data[i] || 0);
        });
      },

      getCurrentValue() {
        const value = [];
        this.wheels.forEach((wheel, i) => {
          const j = wheel.getSelectedIndex();
          value.push({
            index: j, 
            value: this.pickerData[i][j],
          });
        });
        return value;
      },

      updatePickerData(wheelIndex = 0) {
        let data = this.proxyData.slice();
        let i = 0;
        while(data) {
          if (i >= wheelIndex) {
            let wheelData = [];
            data.forEach((item) => {
              wheelData.push(item.value);
            });
            this.pickerData[i] = wheelData;
            this.pickerIndex[i] = wheelIndex === 0
              ? (this.pickerIndex[i] < data.length ? this.pickerIndex[i] || 0 : 0)
              : this.reloadWheel(i, wheelData);
          }
          data = data.length ? data[this.pickerIndex[i]].children : null;
          i++;
        }
        this.pickerData = this.pickerData.slice(0, i);
      },

      reloadWheel(index, data) {
        const wheelWrapper = this.$refs.wheelWrapper;
        let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll');
        let wheel = this.wheels ? this.wheels[index] : false;
        let dist = 0;
        if (scroll && wheel) {
          this.$set(this.pickerData, index, data);
          this.pickerIndex[index] = dist;
          this.$nextTick(() => {
            wheel = this.createWheel(wheelWrapper, index)
            wheel.wheelTo(dist)
          })
        }
        return dist;
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
      color: #42b983;
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
      height: 72px;
      background: #fff;
      transform: translateZ(0);
      z-index: 1;
      pointer-events: none;
    }

    .picker-mask-top {
      top: 24px;
      background: linear-gradient(to bottom, rgba(255,255,255,.9), rgba(255,255,255,.5));

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
      background: linear-gradient(to top, rgba(255,255,255,.9), rgba(255,255,255,.5));

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
      margin-top: 72px;

      .wheel-item {
        height: 34px;
        line-height: 34px;
        font-size: 18px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>