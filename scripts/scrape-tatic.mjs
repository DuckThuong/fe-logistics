import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const slugs = {
  taoDon: "huong-dan-tao-don-hang-tren-may-tinh",
  napTien: "huong-dan-nap-tien-dat-coc-va-su-dung-vi-dien-tu",
  shipNoiDia: "cach-xem-va-tinh-phi-ship-noi-dia-trung-quoc",
  orderTaobao: "huong-dan-cach-order-taobao-1688-tmall-gia-re-chat-luong",
  taoTaiKhoan: "huong-dan-tao-tai-khoan-taobao-1688-nhanh-chong",
};

const extract = (html) => {
  const patterns = [
    /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<div[^>]*class="[^"]*sidebar/i,
    /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<aside/i,
    /<div[^>]*class="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<div[^>]*class="[^"]*sidebar/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]?.trim()) return m[1].trim();
  }
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  return article?.[1]?.trim() ?? "";
};

const escapeExport = (s) =>
  s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../src/pages/tatic/data/html");
mkdirSync(outDir, { recursive: true });

for (const [key, slug] of Object.entries(slugs)) {
  const url = `https://hongkylogistics.vn/huong-dan/${slug}`;
  const res = await fetch(url);
  const html = await res.text();
  let content = extract(html);
  content = content
    .replace(/<div class="entry-header">[\s\S]*?<\/div>\s*/i, "")
    .replace(/^<div class="entry-content">\s*/i, "")
    .replace(/\s*<\/div>\s*$/i, "");
  const og = html.match(/property="og:image"[^>]+content="([^"]+)"/i);
  const file = join(outDir, `${key}.ts`);
  writeFileSync(
    file,
    `export const ${key.charAt(0).toUpperCase() + key.slice(1)}Html = \`\n${escapeExport(content)}\n\`;\n`,
    "utf8"
  );
  console.log(key, content.length, og?.[1] ?? "no-og", file);
}
