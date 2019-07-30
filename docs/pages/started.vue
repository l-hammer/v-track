<template>
  <div class="page-started page">
    <section class="nav">
      <router-link :to="{ name: 'HOME' }">
        返回
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        事件行为埋点
      </router-link>
      <router-link :to="{ name: 'CUSTOM_EVENTS' }">
        自定义事件埋点
      </router-link>
      <router-link :to="{ name: 'TRACK_VIEW' }">
        页面行为埋点
      </router-link>
      <router-link :to="{ name: 'BLOCK_SHOW' }">
        区域展现埋点
      </router-link>
      <a href="https://github.com/l-hammer/v-track/issues">打开一个 issue</a>
    </section>

    <section class="snippets">
      <div class="section-content small">
        v-track通过
        <a href="https://cn.vuejs.org/v2/guide/custom-directive.html"
          >Vue 自定义指令</a
        >的方式将埋点代码与业务代码完全解耦，完整示例可参考
        <a href="https://github.com/l-hammer/v-track/tree/master">GitHub</a>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" :code="installSnippet" lang="shell" />
      <div class="plus">+</div>
      <CodeSnippet class="snippet" :code="mainSnippet" lang="js" />
      <div class="plus">+</div>
      <CodeSnippet class="snippet" :code="eventsSnippet" lang="js" />
      <div class="plus">+</div>
      <CodeSnippet class="snippet" :code="componentSnippet" lang="html" />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";

const installSnippet = `
# YARN
$ yarn add v-track

# NPM
$ npm install v-track --save
`;
const mainSnippet = `
import Vue from "vue";
import VTrack from "v-track";
import trackEvents from "./track-events";

Vue.use(VTrack, {
  trackEvents, // 埋点事件对象
  trackEnable: {
    UVPV: true, // 是否开启UVPV统计，v0.8.3新增routeUpdate，即在当前路由参数发生改变时埋点，默认为false
    TONP: true // 是否开启页面停留时长统计，默认为false
  }
})
`;
const eventsSnippet = `
import trackAction from "./action"; // 自定义埋点上报的方法

export default {
  /**
   * @name UVPV 固定名称不支持修改
   * @desc UV、PV埋点
   * @param {Object} context 当前上下文
   */
  UVPV(_) {
    trackAction("1");
  },
  /**
   * @name TONP 固定名称不支持修改
   * @desc 页面停留时间埋点（Time on Page）
   * @param {Object} context 当前上下文
   * @param {Timestamp} et 进入页面时间
   * @param {Timestamp} dt 离开页面时间
   */
  TONP(_, { et, dt }) {
    trackAction("2", {
      stt: dt - et
    });
  },
  /**
   * @param {Object} context 当前上下文
   * @param {Object} item 事件参数
   * @param {Object} event 事件对象
   */
  18015(
    {
      $route: { name }
    },
    { id },
    { target }
  ) {
    trackAction("18015", {
      id,
      source_page: name,
      target
    });
  },
};
`;
const componentSnippet = `
<!-- 页面行为埋点（track-view为v-track全局注册的组件） -->
<track-view v-track:18015></track-view>
<track-view v-track:18015.watch="{ result }"></track-view>
<track-view v-track:18015.watch.delay="{ result }"></track-view>
<track-view v-if="result" v-track:18015></track-view>

<!-- 事件行为埋点（DOM） -->
<div v-track:18015.click="handleClick"></div>
<div v-track:18015.click="{ handleClick, item, index }"></div>
<div v-track:18015.click.async="{ handleSearch, rest }"></div>
<div v-track:18015.click.delay="handleClick"></div>

<!-- 事件行为埋点（组件） -->
<cmp v-track:18015.click="handleClick"></cmp>
<cmp v-track:18015.[自定义事件名]="handleSearch"></cmp>
<cmp v-track:18015.[自定义事件名].delay="handleSearch"></cmp>
<cmp v-track:18015.[自定义事件名].async="{ handleSearch, rest }"></cmp>

<!-- 区域展现埋点（block 可以是 DOM 或者组件） -->
<block v-track:18015.show></block>
<block v-track:18015.show.once></block>
<block v-track:18015.show.custom="{ ref: 'scroll' }"></block>
<block v-track:18015.show.custom.once="{ ref: 'scroll' }"></block>
`;

export default {
  name: "Started",
  components: {
    CodeSnippet
  },
  data() {
    return {
      installSnippet,
      mainSnippet,
      eventsSnippet,
      componentSnippet
    };
  }
};
</script>
