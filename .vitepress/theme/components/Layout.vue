<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { computed } from "vue";
const { Layout } = DefaultTheme;
import { useData } from "vitepress";
const { frontmatter } = useData();
const related = computed(() =>
  frontmatter.value.related?.map((source) => {
    const splited = source.split("-");
    const type = splited[0];
    let label = splited.slice(1).join(" ");
    let href = `${type}/${source}`;

    if (source.startsWith("plugins")) {
      href = `about/${source}`;
    }
    if (source.startsWith("tags")) {
      label = `@${label}`;
    }
    if (source.startsWith("tags-inline")) {
      label = `@${splited.slice(2).join(" ")}`;
    }
    label = label.replace(".html", "");
    href = `/${href}`;
    return {
      source,
      label,
      href,
    };
  })
);
</script>

<template>
  <Layout>
    <template v-if="related" #doc-footer-before>
      <div class="vp-doc">
        <h2>Related Links</h2>
        <ul>
          <li v-for="item in related">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>
