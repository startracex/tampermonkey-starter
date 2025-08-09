import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { rolldown } from "rolldown";
import { createRequire } from "node:module";

const outfile = "dist/output.js";
const bundle = await rolldown({
  input: "src/index.ts",
});

await bundle.write({
  file: outfile,
  format: "iife",
});

export function buildHeader(options) {
  return `// ==UserScript==\n${Object.entries(options)
    .map(([key, value]) =>
      (Array.isArray(value) ? value : [value]).map(
        //
        (v) => `// @${key.padEnd(13)}${v}\n`
      )
    )
    .join("")}// ==/UserScript==\n`;
}

const require = createRequire(import.meta.url);

const pkgJson = require("./package.json");

const headerOptions = {
  name: pkgJson.name,
  description: pkgJson.description,
  version: pkgJson.version,
  author: pkgJson.author,
  ...pkgJson.tampermonkey,
};

writeFileSync(outfile, buildHeader(headerOptions) + "\n" + readFileSync(outfile));

headerOptions["require"].push(pathToFileURL(join(import.meta.dirname, outfile)));
writeFileSync("dist/header.js", buildHeader(headerOptions));
