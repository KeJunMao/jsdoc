import fs from "fs-extra";
import path from "path";
import { sourcePath } from "./define";
import fg from "fast-glob";
import grayMatter from "gray-matter";

const toc = JSON.parse(
  fs.readFileSync(path.join(sourcePath, "data/toc.json"), {
    encoding: "utf-8",
  })
);

function getWithTocSidebar(key: string, dir: string) {
  const files: any[] = toc[key].map((v) =>
    path.basename(v.filename, path.extname(v.filename))
  );
  return files.map((v) => {
    const matter = grayMatter(fs.readFileSync(`./${dir}/${v}.md`, "utf-8"));
    const title = matter.data.title;
    return {
      text: title,
      link: `/${dir}/${v}`,
    };
  });
}

async function getTagSidebar(dir: string) {
  const files = await fg(`${dir}/**/*.md`);
  return files.map((v) => {
    const matter = grayMatter(fs.readFileSync(v, "utf-8"));
    const title = matter.data.inlineTag || matter.data.tag;
    return {
      text: `@${title}`,
      link: `/${v.replace(".md", "")}`,
    };
  });
}

const aboutSidebar = getWithTocSidebar("gettingStarted", "about");
const howtoSidebar = getWithTocSidebar("examples", "howto");
const tagsInlineSidebar = await getTagSidebar("tags-inline");
const tagsBlockSidebar = await getTagSidebar("tags-block");

console.log(tagsBlockSidebar);

fs.writeJSONSync("./.vitepress/sidebar.json", {
  "/about/": aboutSidebar,
  "/howto/": howtoSidebar,
  "/tags-inline/": tagsInlineSidebar,
  "/tags-block/": tagsBlockSidebar,
});
