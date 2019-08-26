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
      <router-link :to="{ name: 'HOME' }">
        Return
      </router-link>
      <a href="https://github.com/l-hammer/v-track/issues">Open an issue</a>
    </section>

    <!----------------------- DEMO 1 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a regional display tracking that will only be reported once"
        :closable="false"
      >
      </el-alert>
      <div class="section-content large">
        <el-card shadow="always" v-track:18028.show.once>
          I just want to be exposed once
        </el-card>
      </div>
    </section>
    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackViewComponentOnceSnippet"
      />
    </section>

    <!----------------------- DEMO 2 ------------------------>
    <section class="demo">
      <el-alert
        center
        type="info"
        title="This is a regional display tracking that will be continuously reported."
        :closable="false"
      >
      </el-alert>
      <div class="section-content large">
        <el-card shadow="always" v-track:18027.show>
          I want to be exposed countless times
        </el-card>
      </div>
    </section>
    <section class="snippets">
      <CodeSnippet
        class="snippet"
        lang="html"
        :code="trackViewComponentSnippet"
      />
    </section>
  </div>
</template>

<script>
import CodeSnippet from "../components/code-snippet";

const trackViewComponentSnippet = `
<el-card shadow="always" v-track:18027.show>I want to be exposed countless times</el-card>
`;
const trackViewComponentOnceSnippet = `
<el-card shadow="always" v-track:18027.show.once>I just want to be exposed once</el-card>
`;

export default {
  name: "BlockShow",
  components: {
    CodeSnippet
  },
  data() {
    return {
      trackViewComponentSnippet,
      trackViewComponentOnceSnippet,
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
