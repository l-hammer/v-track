module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ],
  env: {
    test: {
      presets: ["@babel/preset-env"]
    }
  }
};
