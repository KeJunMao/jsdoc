import fs from "fs-extra";

import { sourceContentPath, tempPath, moveFilesWithGlob } from "./define";

fs.copySync(sourceContentPath, tempPath);

// move content
await moveFilesWithGlob("./temp/tags-inline*.md", "./tags-inline/");
await moveFilesWithGlob("./temp/tags*.md", "./tags-block/");
await moveFilesWithGlob("./temp/howto*.md", "./howto/");
await moveFilesWithGlob("./temp/*.md", "./about/");
fs.removeSync(tempPath);
