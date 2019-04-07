module.exports = {
  env: {
    build: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            loose: true
          }
        ]
      ]
    }
  },
  plugins: [
    // "@babel/plugin-transform-async-to-generator",
    // "@babel/plugin-external-helpers",
    // "@babel/plugin-transform-runtime",
    // "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-class-properties"
  ]
};
