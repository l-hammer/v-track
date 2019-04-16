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
        完整示例可参考
        <a href="https://github.com/l-hammer/v-track/tree/master">GitHub</a>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" :code="eventsSnippet" lang="js" />
      <div class="plus">+</div>
      <CodeSnippet class="snippet" :code="mainSnippet" lang="js" />
      <div class="plus">+</div>
      <CodeSnippet class="snippet" :code="componentSnippet" lang="html" />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";

const eventsSnippet = `
import trackAction from "./action";

export default {
  /**
   * @name UVPV 固定名称不支持修改
   * @desc UV、PV埋点
   */
  UVPV() {
    trackAction("1,3");
  },
  /**
   * @name TONP 固定名称不支持修改
   * @desc 页面停留时间埋点（Time on Page）
   * @param {String} stt 进入页面时长，单位为秒
   */
  TONP({ stt }) {
    trackAction("2", { stt });
  },
  /**
   * @desc 测试埋点
   * @param {*} { $route: { name } }
   * @param {*} { item: { id, level4Tag }, index }
   */
  19058(
    {
      $route: { name }
    },
    {
      item: { id },
      index
    }
  ) {
    trackAction("19058", {
      knowledge_id: id, // 知识ID
      click_position: index + 1, // 点击位置
      source_page: name // 页面来源
    });
  }
};
`;
const mainSnippet = `
import Vue from "vue";
import VTrack from "v-track";
import trackEvents from "./tracks";

Vue.use(VTrack, {
  trackEvents, // 埋点事件对象
  trackEnable: {
    UVPV: false, // 是否开启UVPV统计，默认为false
    TONP: true // 是否开启页面停留时长统计，默认为false
  }
})
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
      mainSnippet,
      eventsSnippet,
      componentSnippet
    };
  }
};
</script>
