import { readFileSync } from "fs";
import path from "path";
import url from "url";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JSDoc",
  description: "Unofficial documentation for JSDoc 3.",
  themeConfig: {
    search: {
      provider: "algolia",
      options: {
        apiKey: "",
        appId: "",
        indexName: "",
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Getting Started",
        link: "/about/about-getting-started",
      },
      {
        text: "Plugins",
        link: "/about/plugins-markdown",
      },
      {
        text: "JSDoc Examples",
        link: "/howto/howto-es2015-classes",
      },
      {
        text: "Tags",
        items: [
          { text: "Block Tags", link: "/tags-block/tags-abstract" },
          { text: "Inline Tags", link: "/tags-inline/tags-inline-link" },
        ],
      },
    ],
    sidebar: JSON.parse(
      readFileSync(
        path.resolve(
          path.dirname(url.fileURLToPath(import.meta.url)),
          "./sidebar.json"
        ),
        "utf-8"
      )
    ),
    socialLinks: [
      { icon: "github", link: "https://github.com/kejunmao/jsdoc" },
    ],
  },
  srcExclude: [
    'jsdoc.github.io'
  ],
  ignoreDeadLinks: true
});
