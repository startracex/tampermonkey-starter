import esbuild from "esbuild";
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

import { headerOptions, buildHeader } from "./header.js";

const outfile = "dist/iife.js";
await esbuild.build({
  entryPoints: ["src/index.ts"],
  format: "iife",
  outfile,
  bundle: true,
  minify: true,
  legalComments: "none"
});

writeFileSync(outfile, buildHeader(headerOptions) + "\n" + readFileSync(outfile));

headerOptions["require"].push("file://" + join(import.meta.dirname, outfile));
writeFileSync("dist/header", buildHeader(headerOptions));
