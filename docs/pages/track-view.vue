<template>
  <div class="page-home page">
    <section class="nav">
      <router-link :to="{ name: 'STARTED' }">
        快速开始
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        事件行为埋点
      </router-link>
      <router-link :to="{ name: 'CUSTOM_EVENTS' }">
        自定义事件埋点
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        返回
      </router-link>
      <router-link :to="{ name: 'BLOCK_SHOW' }">
        区域展现埋点
      </router-link>
      <a href="https://github.com/l-hammer/v-track/issues">打开一个 issue</a>
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个页面初始化埋点"
        :closable="false"
      >
      </el-alert>
      <el-alert
        center
        type="warning"
        title="备注：v-track指令可用于任何元素，此行为埋点建议绑定到页面的根元素或者v-track提供的track-view组件上"
        :closable="false"
      >
      </el-alert>
      <div v-track:18022 class="section-content"></div>
    </section>
    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackViewComponentSnippet"
      />
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="配合 v-if 指令控制埋点上报次数，即 show 为真时，会再次触发埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <track-view v-track:18023 v-if="show"></track-view>
        <div class="track-button" @click="() => (show = !show)">
          click me -> {{ show }}
        </div>
      </div>
    </section>
    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackViewComponentVIfSnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="js"
        :code="jsTrackViewComponentVIfSnippet"
      />
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个监听页面行为的埋点，同事件行为埋点一样，只有当返回结果发生变化时才会上报埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <track-view v-track:18025.watch="{ rest1 }" />
        <div class="track-button" @click="fetchRest(false)">
          click me
        </div>
      </div>
    </section>
    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackViewComponentWatchSnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="js"
        :code="jsTrackViewComponentWatchSnippet"
      />
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个监听页面行为并延时的埋点，不同于事件延时埋点，这里可通过delay设置具体的延长时间"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <track-view v-track:18026.watch.delay="{ rest2, delay: 2000 }" />
        <div class="track-button" @click="fetchRest(true)">
          click me
        </div>
      </div>
    </section>
    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackViewComponentWatchDelaySnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="js"
        :code="jsTrackViewComponentWatchDelaySnippet"
      />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";

const trackViewComponentSnippet = `
<track-view v-track:18022></track-view>
`;
const trackViewComponentVIfSnippet = `
<track-view v-track:18023 v-if="show"></track-view>
<div class="track-button" @click="show = !show">click me -> {{ show }}</div>
`;
const jsTrackViewComponentVIfSnippet = `
export default {
  data: () => ({ show: false })
}
`;
const trackViewComponentWatchSnippet = `
<track-view v-track:18015.watch="{ rest }" />
<div class="track-button" @click="fetchRest">click me</div>
`;
const jsTrackViewComponentWatchSnippet = `
export default {
  data: () => ({ rest: null }),
  methods: {
    async fetchRest() {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: "success" });
        }, 300);
      });
  
      if (this.rest === response.data) {
        this.$message.success(
          "异步事件返回成功，但返回结果和上一次相等，埋点不会上报"
        );
      } else {
        this.$message.success("异步事件返回成功");
        this.rest = response.data;
      }
    }
  },
}
`;
const trackViewComponentWatchDelaySnippet = `
<track-view v-track:18025.watch.delay="{ rest, delay: 2000 }" />
<div class="track-button" @click="fetchRest()">click me</div>
`;
const jsTrackViewComponentWatchDelaySnippet = `
export default {
  data: () => ({ rest: null }),
  methods: {
    async fetchRest() {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: "success" });
        }, 300);
      });
  
      if (this.rest === response.data) {
        this.$message.success(
          "异步事件返回成功，但返回结果和上一次相等，埋点不会上报"
        );
      } else {
        this.$message.success("异步事件返回成功");
        this.rest = response.data;
      }
    }
  },
}
`;

export default {
  name: "TrackViews",
  components: {
    CodeSnippet
  },
  data() {
    return {
      trackViewComponentSnippet,
      trackViewComponentVIfSnippet,
      jsTrackViewComponentVIfSnippet,
      trackViewComponentWatchSnippet,
      jsTrackViewComponentWatchSnippet,
      trackViewComponentWatchDelaySnippet,
      jsTrackViewComponentWatchDelaySnippet,
      show: false,
      rest1: null,
      rest2: null
    };
  },
  methods: {
    async fetchRest(delay) {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: "success" });
        }, 300);
      });

      if (
        (!delay && this.rest1 === response.data) ||
        (delay && this.rest2 === response.data)
      ) {
        this.$message.success(
          "异步事件返回成功，但返回结果和上一次相等，埋点不会上报"
        );
      } else {
        this.$message.success("异步事件返回成功");
        !delay ? (this.rest1 = response.data) : (this.rest2 = response.data);
      }
    }
  }
};
</script>
