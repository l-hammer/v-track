const path = require("path");

module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  outputDir: "./docs/dist",
  publicPath: "./dist",
  indexPath: "../index.html",

  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, "./docs/main.js")
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./docs")
      }
    }
  },

  chainWebpack: config => {
    config.module.rule("js").include.add(path.resolve(__dirname, "./docs"));

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  },

  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/index.scss";`
      }
    }
  }
};
