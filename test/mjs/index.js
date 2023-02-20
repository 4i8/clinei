#!/usr/bin/env node
import { Build } from "../../dist/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
new Build({
  path: __dirname + "/commands",
  prefix: "mjs",
});
