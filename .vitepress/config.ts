import { readFileSync } from "fs";
import path from "path";
import url from "url";
import { defineConfig } from "vitepress";
import grayMatter from "gray-matter";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JSDoc",
  description: "Unofficial documentation for JSDoc 3.",
  themeConfig: {
    search: {
      provider: "algolia",
      options: {
        apiKey: "6ce0ed0583b2bfa1bf7ce6d169f34943",
        appId: "KWJHO3S8KZ",
        indexName: "vjsnetlify",
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
  srcExclude: ["jsdoc.github.io"],
  ignoreDeadLinks: true,
  markdown: {
    config(md) {
      md.use((md) => {
        md.core.ruler.before("normalize", "tag-header", (state) => {
          const { frontmatter = {} } = state.env;

          if (
            frontmatter.synonyms &&
            frontmatter.synonyms.length
          ) {
            state.src = `## Synonyms\n${frontmatter.synonyms.map(
              (v) => `- \`${v}\``
            ).join('\n')}${state.src}`;
          }

          if (frontmatter.tag) {
            state.src = `# @${frontmatter.tag}\n${frontmatter.description}\n${state.src}`;
          }
          if (frontmatter.inlineTag) {
            state.src = `# \\{@${frontmatter.inlineTag}\\}\n${frontmatter.description}\n${state.src}`;
          }
        });

        const render = md.render.bind(md);
        md.render = (src, env = {}) => {
          const { data } = grayMatter(src);
          if (!data.title) {
            if (data.tag || data.inlineTag) {
              data.title = `@${data.tag || data.inlineTag}`;
            }
          }
          env.frontmatter = {
            ...env.frontmatter,
            ...data,
          };
          return render(src, env);
        };
      });
    },
  },
});
