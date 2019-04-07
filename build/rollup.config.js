const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify");

module.exports = {
  input: {
    input: "src/index.js",
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      uglify.uglify()
    ]
  },
  output: {
    file: "dist/vue-track.min.js",
    format: "umd",
    name: "vue-track"
  }
};
