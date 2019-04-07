const rollup = require("rollup");
const config = require("./rollup.config");

async function build(option) {
  const bundle = await rollup.rollup(option.input);
  await bundle.write(option.output);
}

build(config);
