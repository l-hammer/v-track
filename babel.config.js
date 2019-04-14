module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ]
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
  env: {
    test: {
      presets: ["@babel/preset-env"]
    }
  }
};
