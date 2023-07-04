import { EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";
// @ts-expect-error ignroe
import Example from "./components/Example.vue";
// @ts-expect-error ignroe
import Layout from './components/Layout.vue'


export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.component("Example", Example);
  },
  Layout
};
