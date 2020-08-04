<template>
  <div class="page-home page">
    <section class="nav">
      <router-link :to="{ name: 'STARTED' }">
        Getting Started
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        Event Behavior Tracking
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        Return
      </router-link>
      <router-link :to="{ name: 'TRACK_VIEW' }">
        Page Behavior Tracking
      </router-link>
      <router-link :to="{ name: 'BLOCK_SHOW' }">
        Regional Display Tracking
      </router-link>
      <a href="https://github.com/l-hammer/v-track/issues">Open an issue</a>
    </section>

    <!----------------------- DEMO 1 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a custom event behavior tracking"
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

    <!----------------------- DEMO 2 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a custom event behavior tracking with parameters"
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

    <!----------------------- DEMO 3 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a tracking that occurs after the custom event, which is executed before the custom event by default.As shown, the initial value of activeName is Feedback and which will updated by custom event.ThereFore, the value obtained from the tracking to activeName should be the name of the current activation panel."
        :closable="false"
      >
      </el-alert>
      <div class="section-content collapse-wrapper">
        <el-collapse
          accordion
          v-model="activeName"
          v-track:18020.change.delay="handleChange"
        >
          <el-collapse-item title="Feedback" name="Feedback">
            <div>
              Control Feedback: Users can clearly perceive their operations through interface styles and interactive effects
            </div>
            <div>Page Feedback: After operation, the current state is clearly displayed through the changes of page elements.</div>
          </el-collapse-item>
          <el-collapse-item title="Efficiency" name="Efficiency">
            <div>Simplified process: design simple and intuitive operation process;</div>
            <div>
              Clear and Explicit: Clear language and explicit expression, so that users can quickly understand and make decisions.
            </div>
            <div>
              Help users identify: The simple interface allows users to quickly identify rather than recall, and will reduce the burden of user memory.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Controllability" name="Controllability">
            <div>
              User decision-making: according to the scenario, users can be given operational suggestions or security tips, but can not replace the user for decision-making.
            </div>
            <div>
              Controllable results: Users can operate freely, including revocation, backoff and termination of the current operation.
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

    <!----------------------- DEMO 4 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a custom event tracking with asynchronous behavior. As shown, rest is initially null, and custom events will fetch success.Therefore, the rest obtained from tracking should be success"
        :closable="false"
      >
      </el-alert
      ><el-alert
        center
        type="warning"
        title="Note: Like normal DOM event tracking, tracking will triggered only when rest changes"
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
  <el-collapse-item title="Feedback" name="Feedback">...</el-collapse-item>
  <el-collapse-item title="Efficiency" name="Efficiency">...</el-collapse-item>
  <el-collapse-item title="Controllability" name="Controllability">...</el-collapse-item>
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
        }, 300);
      });

      this.rest = response.data;
    }
  }
}
`;

export default {
  name: "CustomEvents",
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
      this.$message.success("Successful execution of custom events");
    },
    handleCustomEventWithParam(item, { target }) {
      this.$message.success(
        `Successful execution of custom events and the parameters are as follows ${JSON.stringify(item)}--${target}`
      );
    },
    handleChange(val) {
      this.activeName = val;
    },
    async fetchRest() {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: "success" });
        }, 300);
      });

      if (this.rest === response.data) {
        this.$message.success(
          "The asynchronous event returns successfully, but the result is the same as the previous one, and the track point will not be reported."
        );
      } else {
        this.rest = response.data;
        this.$message.success("The asynchronous event return successful");
      }
    }
  }
};
</script>
