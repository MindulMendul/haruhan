/**
 * content/cs-interview/topics/*.md → src/content/cs/contents.json
 * 마크다운 수정 후: pnpm run content:cs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const topicsDir = path.join(root, "content", "cs-interview", "topics");
const outFile = path.join(root, "src", "content", "cs", "contents.json");

const files = fs.readdirSync(topicsDir).filter((f) => f.endsWith(".md"));
const o = {};
for (const f of files) {
  const id = f.replace(/\.md$/, "");
  o[id] = fs.readFileSync(path.join(topicsDir, f), "utf8");
}
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(o), "utf8");
console.log("bundled", Object.keys(o).length, "topics →", path.relative(root, outFile));
