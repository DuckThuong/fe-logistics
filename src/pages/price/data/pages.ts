import { ROUTER_PATH } from "@/routers/Route";
import { OrderHtml } from "./html/order";
import { KyGuiHtml } from "./html/kygui";
import { ChinhNgachHtml } from "./html/chinhngach";

export type PricePageMeta = {
  title: string;
  date: string;
  contentHtml: string;
};

const normalizeHtml = (html: string) => html.trim();

export const PRICE_ORDER_PAGE: PricePageMeta = {
  title: "Bảng Giá Dịch Vụ Order Hàng Trung Quốc",
  date: "09.03.2019",
  contentHtml: normalizeHtml(OrderHtml),
};

export const PRICE_KY_GUI_PAGE: PricePageMeta = {
  title: "Bảng Giá Dịch Vụ Ký Gửi Hàng Hoá",
  date: "29.05.2024",
  contentHtml: normalizeHtml(KyGuiHtml),
};

export const PRICE_CHINH_NGACH_PAGE: PricePageMeta = {
  title: "Bảng Giá Dịch Vụ Vận Chuyển Chính Ngạch Trung Quốc - Việt Nam",
  date: "03.11.2025",
  contentHtml: normalizeHtml(ChinhNgachHtml),
};

export const PRICE_SIDEBAR_LINKS = [
  { title: PRICE_ORDER_PAGE.title, href: ROUTER_PATH.PRICE_ORDER },
  { title: PRICE_KY_GUI_PAGE.title, href: ROUTER_PATH.PRICE_KY_GUI },
  { title: PRICE_CHINH_NGACH_PAGE.title, href: ROUTER_PATH.PRICE_CHINH_NGACH },
];
