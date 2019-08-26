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
      <router-link :to="{ name: 'HOME' }">
        Return
      </router-link>
      <router-link :to="{ name: 'BLOCK_SHOW' }">
        Regional Display Tracking
      </router-link>
      <a href="https://github.com/l-hammer/v-track/issues">打开一个 issue</a>
    </section>

    <!----------------------- DEMO 1 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a page initialization tracking"
        :closable="false"
      >
      </el-alert>
      <el-alert
        center
        type="warning"
        title="TIPS:The v-track command can be used for any element, and the behavior tracking suggests binding to the root element of the page or the track-view component provided by v-track"
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

    <!----------------------- DEMO 2 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="With v-if command to control the number of tracking reports, the tracking will be triggered again when show is true."
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

    <!----------------------- DEMO 3 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a tracking for listening page behavior. Like the tracking for event behavior, it will be reported only when the return result changes."
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

    <!----------------------- DEMO 4 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a tracking for listening page behavior and delays where you can set specific delays, it is different from the tracking for event delays"
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
  
      this.rest = response.data;
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
  
      this.rest = response.data;
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
          "The asynchronous event returns successfully, but the result is the same as the previous one, and the track point will not be reported."
        );
      } else {
        this.$message.success("The asynchronous event return successful");
        !delay ? (this.rest1 = response.data) : (this.rest2 = response.data);
      }
    }
  }
};
</script>
