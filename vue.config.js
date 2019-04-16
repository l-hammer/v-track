const path = require("path");
const isProd = process.env.NODE_ENV !== "production";

module.exports = {
  lintOnSave: isProd,
  outputDir: "./docs/dist",
  publicPath: isProd ? "./" : "./dist/",
  indexPath: "../index.html",

  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, "./docs/main.js")
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./docs")
      }
    },
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000
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
