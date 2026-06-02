import { ROUTER_NAME, ROUTER_PATH, getNewsDetailPath } from "@/routers/Route";
import { BangGiaVanChuyenChinhNgachTrungQuocVietNamTaiHongKyLogisitcsHtml } from "./html/bangGiaVanChuyenChinhNgachTrungQuocVietNamTaiHongKyLogisitcs";
import { TimNguonHangTanGocTaiTrungQuocHtml } from "./html/timNguonHangTanGocTaiTrungQuoc";
import { SaleKhungTrenTmalLenDen70NhanNgayQuocTePhuNu83Html } from "./html/saleKhungTrenTmalLenDen70NhanNgayQuocTePhuNu83";
import { SanMyPhamHangHieuGiaHapDanTrenTmalDipSale83Html } from "./html/sanMyPhamHangHieuGiaHapDanTrenTmalDipSale83";

export type NewsPageMeta = {
  id: number;
  url: string;
  title: string;
  date: string;
  image: string;
  contentHtml: string;
};

const normalizeHtml = (html: string) =>
  html
    .trim()
    .replace(/https:\/\/hongkylogistics\.vn\/dang-ky/g, ROUTER_PATH.SIGNIN)
    .replace(/https:\/\/hongkylogistics\.vn\/dang-nhap/g, ROUTER_PATH.LOGIN)
    .replace(/target="\/Users[^"]*"/g, 'target="_blank" rel="noopener noreferrer"');

export const NEW_STATIC_PAGES: NewsPageMeta[] = [
  {
    id: 1,
    url: ROUTER_NAME.TIN_TUC_BANG_GIA,
    title: "BẢNG GIÁ VẬN CHUYỂN CHÍNH NGẠCH TRUNG QUỐC- VIỆT NAM TẠI HỒNG KỲ LOGISITCS",
    date: "07-07-2025",
    image: "https://hongkylogistics.vn/img/%E1%BA%A2NH%20CH%C3%8DNH%20NG%E1%BA%A0CH.png",
    contentHtml: normalizeHtml(
      BangGiaVanChuyenChinhNgachTrungQuocVietNamTaiHongKyLogisitcsHtml,
    ),
  },
  {
    id: 2,
    url: ROUTER_NAME.TIN_TUC_TIM_NGUON,
    title: "Tìm nguồn hàng tận gốc tại Trung Quốc",
    date: "11-04-2019",
    image:
      "https://hongkylogistics.vn/img/1-15531431874351532836476-crop-1553143223839385511346.jpg",
    contentHtml: normalizeHtml(TimNguonHangTanGocTaiTrungQuocHtml),
  },
  {
    id: 3,
    url: ROUTER_NAME.TIN_TUC_SALE_TMAL,
    title: "SALE KHỦNG TRÊN TMAL LÊN ĐẾN 70% NHÂN NGÀY QUỐC TẾ PHỤ NỮ 8/3",
    date: "09-04-2019",
    image: "https://hongkylogistics.vn/img/happy-3-8-women-s-day-ppt-template.jpg",
    contentHtml: normalizeHtml(SaleKhungTrenTmalLenDen70NhanNgayQuocTePhuNu83Html),
  },
  {
    id: 4,
    url: ROUTER_NAME.TIN_TUC_SAN_MY_PHAM,
    title: "SĂN MỸ PHẨM HÀNG HIỆU GIÁ HẤP DẪN TRÊN TMAL DỊP SALE 8/3",
    date: "28-09-2018",
    image: "https://hongkylogistics.vn/img/san-sale-my-pham-hot-tren-tmall-8-3-768x311.jpg",
    contentHtml: normalizeHtml(SanMyPhamHangHieuGiaHapDanTrenTmalDipSale83Html),
  },
];

export const NEW_SIDEBAR_LINKS = NEW_STATIC_PAGES.map((page) => ({
  title: page.title,
  href: getNewsDetailPath(page.url),
}));

export const resolveNewsPageById = (id?: number) =>
  NEW_STATIC_PAGES.find((page) => page.id === id);

export const resolveNewsPageByUrl = (url?: string) =>
  NEW_STATIC_PAGES.find((page) => page.url === url);
