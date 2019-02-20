## ⚠️ **DEPRECATED** ⚠️
内部逻辑 💩

# vue-awesome-picker [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url]
基于 [Vue.js](https://github.com/vuejs/vue) & [Better-Scroll](https://github.com/ustbhuangyi/better-scroll) 的移动端 picker 组件

## Features
* 支持单列、多列和联级数据
* 内置时间、日期数据
* 滚轮 3D 效果
* 颜色可配置

## Demo
>PS：Demo 已启用 Service Worker

![](./static/img/qr-code.png)

## Installation
``` bash
npm install vue-awesome-picker --save
```

## Usage
``` javascript
/* main.js */
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);
```
``` javascript
/* 详细使用方法参照源码 App.vue */
<awesome-picker
  ref="picker"
  :data="picker.data"
  :anchor="picker.anchor"
  :textTitle="picker.textTitle"
  :textConfirm="picker.textConfirm"
  :textCancel="picker.textCancel"
  :colorTitle="picker.colorTitle"
  :colorConfirm="picker.colorConfirm"
  :colorCancel="picker.colorCancel"
  :swipeTime="picker.swipeTime"
  @cancel="handlePickerCancel"
  @confirm="handlePickerConfirm">
</awesome-picker>
```
``` javascript
methods: {
  show() {
    this.$refs.picker.show();
  }
}
```

## Props

| 参数 | 描述 | 可选 | 类型 | 默认
| ----- | ----- | ----- | ----- | ----- |
| data | 详细描述见下文 || Array |
| anchor | 详细描述见下文 || Array |
| type | 内置 picker 类型<br>无需传入 data | date, time | String |
| textTitle | title 文案 || String |
| textConfirm | confirm 文案 || String | 确定
| textCancel | cancel 文案 || String | 取消
| colorTitle | title 颜色 || String | #000000
| colorConfirm | confirm 颜色 || String | #42b983
| colorCancel | cancel 颜色 || String | #999999
| swipeTime | 滚动速度([better-scroll swipeTime](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#swipetime)) | | Number | 1800

### data
>vue-awesome-picker 通过数据结构不同来区分是普通 picker 还是联级 picker, 所以请严格按照以下数据结构进行配置

单列、多列 picker 以双层数组的形式传入 data
``` javascript
[
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z']
]
```

联级 picker 通过 children 构造出具有层级关系的数据
```javascript
[
  {
    value: 'A',
    children: [
      { value: 'A-a' },
      { value: 'A-b' },
      { value: 'A-c' }
    ]
  },
  {
    value: 'B',
    children: [
      { value: 'B-a' },
      { value: 'B-b' }
    ]
  },
]
```
### anchor
>anchor 是 picker 展开时每一列默认滚动的锚点位置或值的数组, 兼容两种数据结构, 未匹配到默认选中第0项

[推荐]数组对象形式: 与事件 confirm 返回的参数数据结构相同, 对象里可以只存在 index 或 value, 当存在 index 时优先匹配 index
```javascript
[
  { 
    index: 0,
    value: 'A'
  },
  {
    index: 0,
    value: 'A-a'
  } 
]
```
单层数组形式: index 组成的数组
```javascript
[0, 0]
```

## Methods
| 方法 | 描述 |
| ----- | ----- |
| show | 展开显示 picker | 

## Events
| 事件 | 描述 | 参数
| ----- | ----- | -----
| confirm | 点击 confirm 按钮后触发 | [{ index: xxx, value: xxx }...] <br> index: 当前选中的 item 在当列的 index <br> value: 当前选中 item 的 value
| cancel | 点击 cancel 按钮后触发 |

## Development

``` bash
git clone git@github.com:Fyerl/vue-awesome-picker.git
cd vue-awesome-picker
npm install
npm run dev
```

[npm-image]: https://img.shields.io/npm/v/vue-awesome-picker.svg?style=flat
[npm-url]: https://npmjs.org/package/vue-awesome-picker
[downloads-image]: https://img.shields.io/npm/dt/vue-awesome-picker.svg?style=flat
[downloads-url]: https://npmjs.org/package/vue-awesome-picker
