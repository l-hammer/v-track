# v-track

<a href="https://unpkg.com/v-track/dist/v-track.min.js"><img src="http://img.badgesize.io/https://unpkg.com/v-track/dist/v-track.min.js?compression=gzip&style=flat-square" alt="Gzip Size" /></a>
<a href="https://www.npmjs.com/package/v-track"><img src="https://img.shields.io/npm/v/v-track.svg?colorB=brightgreen&style=flat-square"></a>

v-track通过 Vue [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)的方式将埋点代码与业务代码完全解耦~

## 安装

### NPM

```bash
$ npm install v-track --save
```

### YARN

```bash
$ yarn add v-track
```

## 用法

```js
import Vue from 'vue'
import VTrack from 'v-track'

Vue.use(VTrack, {
  trackEvents, // 埋点事件对象
  trackAction, // 埋点公用方法
})
```

## 指令修饰符

- `.click` 表示事件行为的埋点，支持自定义事件
- `.watch` 表示监听异步行为的埋点
- `.async` 表示异步事件行为的埋点
- `.delay` 表示埋点是否延迟执行，默认先执行埋点再执行回调
- `.show` 表示区域曝光埋点
- `.once` 配合`.show`指令，只执行一次埋点
- `.custom` 配合`.show`指令，表示使用自定义scroll事件

## 示例

```js
/* track-events.js */
export default {
  /* UP、PV埋点 */
  UVPV() {
    ...
  },
  /**
   * @desc 页面停留时间埋点（Time on Page）
   * @param {String} stt 进入页面时长，单位为秒
   */
  TONP({ stt }) {
    ...
  },
  /**
   * @param {Object} context 当前上下文
   * @param {Object} args 剩余参数
   */
  18015(context, args) {
    ...
  }
  18016(context, args) {
    ...
  }
  ...
}
```

```HTML
<!-- 页面行为埋点（track-view为v-track全局注册的组件） -->
<track-view v-track:18015></track-view>
<track-view v-track:18015.watch="{ result }"></track-view>
<track-view v-track:18015.watch.delay="{ result }"></track-view>
<track-view v-if v-track:18015="{ result }"></track-view>

<!-- 事件行为埋点（DOM） -->
<div v-track:18015.click="handleClick"></div>
<div v-track:18015.click="{ handleClick, item, index }"></div>
<div v-track:18015.click.async="{ handleSearch, searchResult }"></div>
<div v-track:18015.click.delay="handleClick"></div>

<!-- 事件行为埋点（组件） -->
<cmp v-track:18015.click="handleClick"></cmp>
<cmp v-track:18015.[自定义事件名]="handleSearch"></cmp>
<cmp v-track:18015.[自定义事件名].delay="handleSearch"></cmp>
<cmp v-track:18015.[自定义事件名].async="{ handleSearch, searchResult }"></cmp>

<!-- 区域展现埋点 -->
<cmp v-track:18015.show></cmp>
<cmp v-track:18015.show.once></cmp>
<cmp v-track:18015.show.custom="{ ref: 'scroll' }"></cmp>
<cmp v-track:18015.show.custom.once="{ ref: 'scroll' }"></cmp>
```

## license

[MIT](https://github.com/l-hammer/v-track/blob/master/LICENSE) © 2019-present, LHammer
