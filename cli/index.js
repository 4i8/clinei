#!/usr/bin/env node
const { Build } = require("clinei");
new Build({
  path: `${__dirname}/cmd`, //path to commands folder
  prefix: "cli-test", //prefix your cli program
});
