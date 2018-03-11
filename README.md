# vue-awesome-picker [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url]

> 基于 [Vue.js](https://github.com/vuejs/vue) & [Better-Scroll](https://github.com/ustbhuangyi/better-scroll) 的移动端 picker 组件

### Features
* 支持单列、多列和联级数据
* 内置时间、日期数据
* 滚轮 3D 效果
* 颜色可配置

### DEMO
![](./static/img/qr-code.png)

### Options
| 字段 | 描述 | 可选 | 类型 | 默认
| ----- | ----- | ----- | ----- | ----- |
| anchor | 滚轮滚动锚点 || Array | [0, 0...] (选中每列第0项)
| type | 内置 picker 类型, 无需传入 data | date, time | String |
| textTitle | title 文案 || String |
| textConfirm | confirm 文案 || String | 确定
| textCancel | cancel 文案 || String | 取消
| colorTitle | title 颜色 || String | #000000
| colorConfirm | confirm 颜色 || String | #42b983
| colorCancel | cancel 颜色 || String | #999999

### Events
| 名称 | 描述 | 参数
| ----- | ----- | -----
| confirm | 点击 confirm 按钮后触发 | [{ index: xxx, value: xxx }...] <br> index: 当前选中的 item 在当列的 index <br> value: 当前选中 item 的 value
| cancel | 点击 cancel 按钮后触发 |

### Development

``` bash
git clone git@github.com:fyerl/vue-awesome-picker.git
cd vue-awesome-picker
npm install
npm run dev
```

[npm-image]: https://img.shields.io/npm/v/vue-awesome-picker.svg?style=flat
[npm-url]: https://npmjs.org/package/vue-awesome-picker
[downloads-image]: https://img.shields.io/npm/dt/vue-awesome-picker.svg?style=flat
[downloads-url]: https://npmjs.org/package/vue-awesome-picker