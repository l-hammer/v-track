<template>
  <div class="code-snippet">
    <div class="language">{{ lang }}</div>
    <div class="line-numbers">
      <div class="line-number" v-for="n in lineCount" :key="n">{{ n }}</div>
    </div>
    <div class="render" v-html="result"></div>
  </div>
</template>

<script>
import hljs from "highlight.js";
export default {
  name: "code-snippet",
  props: {
    code: String,
    lang: String
  },
  computed: {
    result() {
      const highlighted = hljs.highlight(this.lang, this.code.trim());
      return highlighted.value;
    },
    lineCount() {
      const str = this.result;
      let length = 0;
      for (var i = 0; i < str.length; ++i) {
        if (str[i] === "\n") {
          length++;
        }
      }
      return length + 1;
    }
  }
};
</script>

<style lang="scss">
.code-snippet {
  @include h-box;
  background: #2e3440;
  border-radius: 3px;
  font-family: "Roboto Mono", monospace;
  font-size: 10pt;
  overflow: auto;
  position: relative;
  .line-numbers,
  .render {
    color: #d8dee9;
    padding: 20px;
    padding-right: 0;
  }
  .line-numbers {
    background: #2e3440;
    color: $md-grey-400;
    border-radius: 2px 0 0 2px;
    line-height: 18px;
  }
  .render {
    white-space: pre;
    line-height: 18px;
  }
  .language {
    position: absolute;
    top: 0;
    right: 0;
    color: $md-grey-400;
    padding: 4px 4px 6px 6px;
    border-radius: 0 0 0 2px;
  }
}
</style>
