export const headerOptions = {
  name: "",
  description: "",
  version: "0.0.0",
  author: "",
  namespace: "http://tampermonkey.net/",
  match: "https://*.*",
  icon: "",
  grant: "none",
  require: [],
};

function format(key, value) {
  return `// @${key.padEnd(13)}${value}\n`;
}

export function buildHeader(options) {
  return `// ==UserScript==\n${Object.entries(options).map(
    ([key, value]) =>
      (Array.isArray(value) ? value : [value]).map(
        (v) => format(key, v)
      )
  ).join("")}// ==/UserScript==\n`;
}

