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
      <router-link :to="{ name: 'TRACK_VIEW' }">
        页面行为埋点
      </router-link>
      <router-link :to="{ name: 'BLOCK_SHOW' }">
        区域展现埋点
      </router-link>
      <a href="https://github.com/l-hammer/v-track/issues">打开一个 issue</a>
    </section>

    <section class="demo">
      <el-alert
        center
        type="warning"
        title="这是一个点击事件行为的埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <div class="track-button" v-track:18015.click="handleClick">
          click me
        </div>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" lang="html" :code="trackClickSnippet" />
    </section>

    <section class="demo">
      <el-alert
        center
        type="warning"
        title="这个一个带参数点击事件行为的埋点，默认最后一个参数为event事件对象"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <div
          class="track-button"
          v-track:18016.click="{ handleClickParam, item }"
        >
          click me
        </div>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" lang="html" :code="trackClickSnippetParam" />
    </section>

    <section class="demo">
      <el-alert
        center
        type="warning"
        title="这是一个发生在事件之后的埋点，默认先执行埋点再执行事件，比如index初始值为0，点击事件会将index加1，所以埋点获取到的index值应该为1，依次点击则累加"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <div class="track-button" v-track:18017.click.delay="handleClickDelay">
          click me
        </div>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" lang="js" :code="jsTrackClickSnippetDelay" />
      <CodeSnippet class="snippet" lang="html" :code="trackClickSnippetDelay" />
    </section>

    <section class="demo">
      <el-alert
        center
        type="warning"
        title="这是一个有异步行为的事件埋点，比如rest初始值为null，点击事件会fetch为success，所以埋点获取到的rest值应该为success"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <div
          class="track-button"
          v-track:18018.click.async="{ handleClickAsync, rest }"
        >
          click me
        </div>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" lang="js" :code="jsTrackClickSnippetAsync" />
      <CodeSnippet class="snippet" lang="html" :code="trackClickSnippetAsync" />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";

const trackClickSnippet = `
<div class="track-button" v-track:18015.click="handleClick">click me</div>
`;
const trackClickSnippetParam = `
<div class="track-button" v-track:18016.click="{ handleClickParam, item }">click me</div>
`;
const trackClickSnippetDelay = `
<div class="track-button" v-track:18017.click.delay="handleClickParam">click me</div>
`;
const jsTrackClickSnippetDelay = `
data() {
  return {
    index: 0
  };
},
methods: {
  handleClickDelay() {
    this.index++;
    this.$message.success("事件执行成功");
  },
}
`;
const trackClickSnippetAsync = `
<div class="track-button" v-track:18018.click.delay="handleClickAsync">click me</div>
`;
const jsTrackClickSnippetAsync = `
data() {
  return {
    rest: null
  };
},
methods: {
  async handleClickAsync() {
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: "success" });
        this.$message.success("异步事件返回成功");
      }, 300);
    });
    this.rest = response.data;
  }
}
`;

export default {
  name: "Home",
  components: {
    CodeSnippet
  },
  data() {
    return {
      trackClickSnippet,
      trackClickSnippetParam,
      trackClickSnippetDelay,
      trackClickSnippetAsync,
      jsTrackClickSnippetDelay,
      jsTrackClickSnippetAsync,
      item: {
        id: Math.random()
          .toString(36)
          .substr(2)
      },
      index: 0,
      rest: null
    };
  },
  methods: {
    handleClick() {
      this.$message.success("事件执行成功");
    },
    handleClickParam(item) {
      this.$message.success(`事件执行成功，参数为${JSON.stringify(item)}`);
    },
    handleClickDelay() {
      this.index++;
      this.$message.success("事件执行成功");
    },
    async handleClickAsync() {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: "success" });
          this.$message.success("异步事件返回成功");
        }, 300);
      });
      this.rest = response.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.close {
  text-align: center;
  margin-top: 12px;
}
.track-button {
  width: 229px;
  height: 39px;
  background: $primary-color;
  border-radius: 5px;
  color: white;
  line-height: 39px;
  margin: auto;
}
</style>
