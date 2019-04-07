import base from "./rollup.config.base";
import { uglify } from "rollup-plugin-uglify";

const config = Object.assign({}, base, {
  output: {
    name: "vue-track",
    file: "dist/vue-track.min.js",
    format: "umd"
  }
});

config.plugins.push(uglify({}));

export default config;
