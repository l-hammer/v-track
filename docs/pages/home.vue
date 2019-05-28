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

    <!----------------------- DEMO 1 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
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

    <!----------------------- DEMO 2 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="通过增加 .native 修饰符，我们可以监听组件原生click事件行为的埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <Button v-track:18015.click.native="handleNativeEvent"></Button>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackNativeClickSnippet"
      />
    </section>

    <!----------------------- DEMO 3 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="这个一个带参数点击事件行为的埋点，默认最后一个参数为 event 事件对象"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <div
          class="track-button"
          v-track:18016.click="{ handleClickWithParam, item }"
        >
          click me
        </div>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackClickWithParamSnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="js"
        :code="jsTrackClickWithParamSnippet"
      />
    </section>

    <!----------------------- DEMO 4 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个发生在事件之后的埋点，默认先执行埋点再执行事件，如示例所示：index初始值为0，点击事件会将index加1，所以埋点获取到的index值应该为1，依次点击则累加"
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
      <CodeSnippet class="snippet" lang="html" :code="trackClickDelaySnippet" />
      <CodeSnippet class="snippet" lang="js" :code="jsTrackClickDelaySnippet" />
    </section>

    <!----------------------- DEMO 5 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个有异步行为的事件埋点，如示例所示：rest 初始值为 null，点击事件会 fetch 为 success，所以埋点获取到的 rest 值应该为 success"
        :closable="false"
      >
      </el-alert
      ><el-alert
        center
        type="warning"
        title="备注：①修饰符 async 是基于 Vue 实例提供的 vm.$watch 方法，所以只有在返回结果 rest 发生变化时才会触发埋点；②当有多个参数时，.async 会把最后一个参数当做监听对象"
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
      <CodeSnippet class="snippet" lang="html" :code="trackClickAsyncSnippet" />
      <CodeSnippet class="snippet" lang="js" :code="jsTrackClickAsyncSnippet" />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";
import Button from "../components/button";

const trackClickSnippet = `
<div class="track-button" v-track:18015.click="handleClick">click me</div>
`;
const trackNativeClickSnippet = `
<Button v-track:18015.click.native="handleNativeEvent"></Button>
`;
const trackClickWithParamSnippet = `
<div class="track-button" v-track:18016.click="{ handleClickWithParam, item }">click me</div>
`;
const jsTrackClickWithParamSnippet = `
export default {
  data: () => ({
    item: {
      id: Date.now().toString(36)
    },
  })
}
`;
const trackClickDelaySnippet = `
<div class="track-button" v-track:18017.click.delay="handleClickDelay">click me</div>
`;
const jsTrackClickDelaySnippet = `
export default {
  data() {
    return {
      index: 0
    };
  },
  methods: {
    handleClickDelay() {
      this.index++;
    },
  }
}
`;
const trackClickAsyncSnippet = `
<div class="track-button" v-track:18018.click.async="handleClickAsync">click me</div>
`;
const jsTrackClickAsyncSnippet = `
export default {
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
        }, 300);
      });

      this.rest = response.data;
    }
  }
}
`;

export default {
  name: "Home",
  components: {
    Button,
    CodeSnippet
  },
  data() {
    return {
      trackClickSnippet,
      trackNativeClickSnippet,
      trackClickWithParamSnippet,
      jsTrackClickWithParamSnippet,
      trackClickDelaySnippet,
      trackClickAsyncSnippet,
      jsTrackClickDelaySnippet,
      jsTrackClickAsyncSnippet,
      item: {
        id: Date.now().toString(36)
      },
      index: 0,
      rest: null
    };
  },
  methods: {
    handleClick() {
      this.$message.success("事件执行成功");
    },
    handleNativeEvent() {
      this.$message.success("组件原生事件执行成功");
    },
    handleClickWithParam(item, { target }) {
      this.$message.success(
        `事件执行成功，参数为${JSON.stringify(item)}--${target}`
      );
    },
    handleClickDelay() {
      this.index++;
    },
    async handleClickAsync() {
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
        this.rest = response.data;
        this.$message.success("异步事件返回成功");
      }
    }
  }
};
</script>
