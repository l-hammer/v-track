<template>
  <div class="page-home page">
    <section class="nav">
      <router-link :to="{ name: 'STARTED' }">
        Getting Started
      </router-link>
      <router-link :to="{ name: 'HOME' }">
        Event Behavior Tracking
      </router-link>
      <router-link :to="{ name: 'CUSTOM_EVENTS' }">
        Custom Event Tracking
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
        title="This is a tracking of click event behavior."
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
        title="By adding the .native modifier, we can listen for the tracking of native click event behavior in component"
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
        title="This is a tracking for click event behavior with parameters, and the last parameter is the event object by default."
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
        title="This is a tracking that occurs after an event. By default, the tracking is executed before the event. As shown in the example, the initial value of index is 0, and clicking event will add index to 1, so the value of index obtained by tracking should be 1, and then click in turn will add up."
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
        title="This is an asynchronous event tracking. As the example shows, the initial value of rest is null, and the click event  will fetch successful, so the tracking should get a rest value of success."
        :closable="false"
      >
      </el-alert
      ><el-alert
        center
        type="warning"
        title="TIPS:①async is a modifier based on vm. $watch method that provided by Vue instance，so the tracking is triggered only when the return result rest changes；②When there are multiple parameters, async will use the last parameter as a listener"
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
      this.$message.success("Successful execution of events");
    },
    handleNativeEvent() {
      this.$message.success("Component native event execution successful");
    },
    handleClickWithParam(item, { target }) {
      this.$message.success(
        `The event was successfully executed with the following parameters${JSON.stringify(item)}--${target}`
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
