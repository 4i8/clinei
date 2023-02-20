#!/usr/bin/env node
const { Build } = require("../../dist/index.js");
new Build({
  path: __dirname + "/commands",
  prefix: "cjs",
});
