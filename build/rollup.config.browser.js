import base from "./rollup.config.base";
import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";

const config = Object.assign({}, base, {
  output: {
    name: "VTrack",
    file: "dist/v-track.min.js",
    format: "umd"
  }
});

config.plugins = [
  ...config.plugins,
  uglify({}),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production")
  })
];

export default config;
