import { ROUTER_PATH } from "@/routers/Route";
import { TaoDonHtml } from "./html/taoDon";
import { NapTienHtml } from "./html/napTien";
import { ShipNoiDiaHtml } from "./html/shipNoiDia";
import { OrderTaobaoHtml } from "./html/orderTaobao";
import { TaoTaiKhoanHtml } from "./html/taoTaiKhoan";

export type TaticPageMeta = {
  title: string;
  date: string;
  image: string;
  href: string;
  contentHtml: string;
};

const IMG_BASE = "https://hongkylogistics.vn";

const normalizeHtml = (html: string) =>
  html
    .trim()
    .replace(/https:\/\/hongkylogistics\.vn\/dang-ky/g, ROUTER_PATH.SIGNIN)
    .replace(/https:\/\/hongkylogistics\.vn\/dang-nhap/g, ROUTER_PATH.LOGIN)
    .replace(/target="\/Users[^"]*"/g, 'target="_blank" rel="noopener noreferrer"');

export const TATIC_TAO_DON_PAGE: TaticPageMeta = {
  title: "Hướng dẫn tạo đơn hàng trên máy tính",
  date: "11-05-2024",
  image: `${IMG_BASE}/img/cs.jpg`,
  href: ROUTER_PATH.HUONG_DAN_TAO_DON,
  contentHtml: normalizeHtml(TaoDonHtml),
};

export const TATIC_NAP_TIEN_PAGE: TaticPageMeta = {
  title: "Hướng dẫn nạp tiền đặt cọc và sử dụng ví điện tử",
  date: "28-06-2024",
  image: `${IMG_BASE}/frontend/web/img/images/NAPTIEN.jpg`,
  href: ROUTER_PATH.HUONG_DAN_NAP_TIEN,
  contentHtml: normalizeHtml(NapTienHtml),
};

export const TATIC_SHIP_NOI_DIA_PAGE: TaticPageMeta = {
  title: "Cách xem và tính phí ship nội địa Trung Quốc",
  date: "28-06-2024",
  image: "https://www.thuongdo.com/sites/default/files/u165605/ship-noi-dia-taobao-8.jpg",
  href: ROUTER_PATH.HUONG_DAN_SHIP_NOI_DIA,
  contentHtml: normalizeHtml(ShipNoiDiaHtml),
};

export const TATIC_ORDER_TAOBAO_PAGE: TaticPageMeta = {
  title: "Hướng dẫn cách Order Taobao 1688 Tmall giá rẻ, chất lượng",
  date: "28-06-2024",
  image: "https://dhdlogistics.com/wp-content/uploads/2022/11/order-taobao-1688-tmall.jpg",
  href: ROUTER_PATH.HUONG_DAN_ORDER_TAOBAO,
  contentHtml: normalizeHtml(OrderTaobaoHtml),
};

export const TATIC_TAO_TAI_KHOAN_PAGE: TaticPageMeta = {
  title: "Hướng dẫn tạo tài khoản taobao, 1688 nhanh chóng",
  date: "27-07-2024",
  image: `${IMG_BASE}/frontend/web/img/images/%E1%BA%A2nh1.jpg`,
  href: ROUTER_PATH.HUONG_DAN_TAO_TAI_KHOAN,
  contentHtml: normalizeHtml(TaoTaiKhoanHtml),
};

export const TATIC_PAGES: TaticPageMeta[] = [
  TATIC_TAO_DON_PAGE,
  TATIC_NAP_TIEN_PAGE,
  TATIC_SHIP_NOI_DIA_PAGE,
  TATIC_ORDER_TAOBAO_PAGE,
  TATIC_TAO_TAI_KHOAN_PAGE,
];

export const TATIC_SIDEBAR_LINKS = TATIC_PAGES.map((page) => ({
  title: page.title,
  href: page.href,
}));
