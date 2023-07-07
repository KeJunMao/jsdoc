import { EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";
// @ts-expect-error ignroe
import Layout from './components/Layout.vue'


export default {
  extends: DefaultTheme,
  Layout
};
