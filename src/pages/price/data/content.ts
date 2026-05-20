import { ROUTER_PATH } from "@/routers/Route";

const IMG_BASE = "https://hongkylogistics.vn/img";

export const PRICE_HUB_ITEMS = [
  {
    title: "Bảng Giá Dịch Vụ Order Hàng Trung Quốc",
    tag: "Bảng giá",
    image: `${IMG_BASE}/cs.jpg`,
    href: ROUTER_PATH.PRICE_ORDER,
  },
  {
    title: "Bảng Giá Dịch Vụ Ký Gửi Hàng Hoá",
    tag: "Bảng giá",
    image: `${IMG_BASE}/HK.jpg`,
    href: ROUTER_PATH.PRICE_KY_GUI,
  },
  {
    title: "Bảng Giá Dịch Vụ Vận Chuyển Chính Ngạch Trung Quốc - Việt Nam",
    tag: "Bảng giá",
    image: `${IMG_BASE}/%E1%BA%A2NH%20CH%C3%8DNH%20NG%E1%BA%A0CH.png`,
    href: ROUTER_PATH.PRICE_CHINH_NGACH,
  },
];
