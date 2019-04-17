<template>
  <div class="page-home page">
    <section class="nav">
      <router-link :to="{ name: 'STARTED' }">
        快速开始
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        事件行为埋点
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        返回
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
        type="info"
        title="这是一个自定义事件行为埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <Button v-track:18015.custom-event="handleCustomEvent"></Button>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet class="snippet" lang="html" :code="ButtonComponentSnippet" />
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackCustomEventSnippet"
      />
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个有带参数的自定义事件埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <Button
          v-track:18019.custom-event="handleCustomEventWithParam"
        ></Button>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="ButtonComponentWithParamSnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackCustomEventWithParamSnippet"
      />
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个发生在自定义事件之后的埋点，默认先执行埋点再执行自定义事件。如示例所示：activeName初始值为Feedback，自定义事件会更新该值，所以埋点获取到activeName的值应为当前激活面板的name"
        :closable="false"
      >
      </el-alert>
      <div class="section-content collapse-wrapper">
        <el-collapse
          accordion
          v-model="activeName"
          v-track:18020.change.delay="handleChange"
        >
          <el-collapse-item title="反馈 Feedback" name="Feedback">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="Efficiency">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="Controllability">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackCustomEventDelaySnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="js"
        :code="jsTrackCustomEventDelaySnippet"
      />
    </section>

    <section class="demo">
      <el-alert
        center
        type="info"
        title="这是一个有异步行为的自定义事件埋点。如示例所示：rest初始值为null，自定义事件会fetch为success，所以埋点获取到的rest值应该为success"
        :closable="false"
      >
      </el-alert
      ><el-alert
        center
        type="warning"
        title="备注：同普通DOM事件埋点一样，只有在 rest 发生变化时才会触发埋点"
        :closable="false"
      >
      </el-alert>
      <div class="section-content">
        <Button v-track:18021.custom-event.async="{ fetchRest, rest }"></Button>
      </div>
    </section>

    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackCustomEventAsyncSnippet"
      />
      <CodeSnippet
        class="snippet"
        lang="js"
        :code="jsTrackCustomEventAsyncSnippet"
      />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";
import Button from "../components/button";

const ButtonComponentSnippet = `
<!-- button 组件 -->
<div class="track-button" @click="$emit('custom-event')">
  click me
</div>
`;
const ButtonComponentWithParamSnippet = `
<!-- button 组件 -->
<div class="track-button" @click="e => $emit('custom-event', { id: Date.now().toString(36) }, e)">
  click me
</div>
`;
const trackCustomEventSnippet = `
<Button v-track:18015.custom-event="handleCustomEvent"></Button>
`;
const trackCustomEventWithParamSnippet = `
<Button v-track:18019.custom-event="handleCustomEventWithParam"></Button>
`;
const trackCustomEventDelaySnippet = `
<el-collapse
  accordion
  v-model="activeName"
  v-track:18020.change.delay="handleChange"
>
  <el-collapse-item title="反馈" name="Feedback">...</el-collapse-item>
  <el-collapse-item title="效率" name="Efficiency">...</el-collapse-item>
  <el-collapse-item title="可控" name="Controllability">...</el-collapse-item>
</el-collapse>
`;
const jsTrackCustomEventDelaySnippet = `
export default {
  data() {
    return {
      activeName: "Feedback",
    };
  },
  methods: {
    handleChange(val) {
      this.activeName = val;
    }
  }
}
`;
const trackCustomEventAsyncSnippet = `
<Button v-track:18021.custom-event.async="{ fetchRest, rest }"></Button>
`;
const jsTrackCustomEventAsyncSnippet = `
export default {
  data() {
    return {
      rest: null
    };
  },
  methods: {
    async fetchRest() {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: "success" });
          this.$message.success("异步事件返回成功");
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
      ButtonComponentSnippet,
      ButtonComponentWithParamSnippet,
      trackCustomEventSnippet,
      trackCustomEventWithParamSnippet,
      trackCustomEventDelaySnippet,
      trackCustomEventAsyncSnippet,
      jsTrackCustomEventDelaySnippet,
      jsTrackCustomEventAsyncSnippet,
      item: {
        id: Math.random()
          .toString(36)
          .substr(2)
      },
      activeName: "Feedback",
      rest: null
    };
  },
  methods: {
    handleCustomEvent() {
      this.$message.success("自定义事件执行成功");
    },
    handleCustomEventWithParam(item, { target }) {
      this.$message.success(
        `自定义事件执行成功，参数为${JSON.stringify(item)}--${target}`
      );
    },
    handleChange(val) {
      this.activeName = val;
    },
    async fetchRest() {
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
