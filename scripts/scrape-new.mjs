import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const BASE = "https://hongkylogistics.vn/tin-tuc";

const KNOWN = [
  {
    slug: "bang-gia-van-chuyen-chinh-ngach-trung-quoc-viet-nam-tai-hong-ky-logisitcs",
    title: "BẢNG GIÁ VẬN CHUYỂN CHÍNH NGẠCH TRUNG QUỐC- VIỆT NAM TẠI HỒNG KỲ LOGISITCS",
    date: "07-07-2025",
  },
  {
    slug: "tim-nguon-hang-tan-goc-tai-trung-quoc",
    title: "Tìm nguồn hàng tận gốc tại Trung Quốc",
    date: "11-04-2019",
  },
  {
    slug: "sale-khung-tren-tmal-len-den-70-nhan-ngay-quoc-te-phu-nu-83",
    title: "SALE KHỦNG TRÊN TMAL LÊN ĐẾN 70% NHÂN NGÀY QUỐC TẾ PHỤ NỮ 8/3",
    date: "09-04-2019",
  },
  {
    slug: "san-my-pham-hang-hieu-gia-hap-dan-tren-tmal-dip-sale-83",
    title: "SĂN MỸ PHẨM HÀNG HIỆU GIÁ HẤP DẪN TRÊN TMAL DỊP SALE 8/3",
    date: "28-09-2018",
  },
];

const extractArticleBody = (html) => {
  const article = html.match(/<article class="post-article">([\s\S]*?)<\/article>/i);
  if (!article) return "";

  let content = article[1].match(/<div class="entry-content">\s*([\s\S]*?)\s*<\/div>/i)?.[1]?.trim() ?? "";
  if (!content) {
    const desc = article[1].match(/<p class="description">([\s\S]*?)<\/p>/i)?.[1]?.trim();
    if (desc) content = `<p>${desc}</p>`;
  }
  return content;
};

const escapeExport = (s) =>
  s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${}");

const toKey = (slug) =>
  slug
    .split("-")
    .map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1)))
    .join("");

const __dirname = dirname(fileURLToPath(import.meta.url));
const outHtmlDir = join(__dirname, "../src/pages/new/data/html");
mkdirSync(outHtmlDir, { recursive: true });

const listHtml = await (await fetch(BASE)).text();

for (const article of KNOWN) {
  const html = await (await fetch(`${BASE}/${article.slug}`)).text();
  let content = extractArticleBody(html);

  const cardImg = listHtml.match(
    new RegExp(
      `/tin-tuc/${article.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]{0,1200}?<img[^>]+src="([^"]+)"`,
      "i"
    )
  );
  const og = html.match(/property="og:image"[^>]+content="([^"]+)"/i);
  article.image = cardImg?.[1] || og?.[1] || "https://hongkylogistics.vn/img/cs.jpg";
  if (!article.image.startsWith("http")) {
    article.image = `https://hongkylogistics.vn${article.image}`;
  }

  const exportName = toKey(article.slug).charAt(0).toUpperCase() + toKey(article.slug).slice(1);
  article.key = toKey(article.slug);
  article.exportName = exportName;

  writeFileSync(
    join(outHtmlDir, `${article.key}.ts`),
    `export const ${exportName}Html = \`\n${escapeExport(content)}\n\`;\n`,
    "utf8"
  );
  console.log(article.slug, content.length);
}

writeFileSync(
  join(__dirname, "../src/pages/new/data/scraped-meta.json"),
  JSON.stringify(KNOWN, null, 2),
  "utf8"
);
