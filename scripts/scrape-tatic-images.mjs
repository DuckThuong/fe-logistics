const res = await fetch("https://hongkylogistics.vn/huong-dan");
const html = await res.text();
const re = /href="https:\/\/hongkylogistics\.vn\/huong-dan\/([^"]+)"[\s\S]*?src="([^"]+)"/gi;
let m;
while ((m = re.exec(html))) console.log(m[1], m[2]);
