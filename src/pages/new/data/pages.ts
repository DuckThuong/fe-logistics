import { ROUTER_PATH } from "@/routers/Route";
import { BangGiaVanChuyenChinhNgachTrungQuocVietNamTaiHongKyLogisitcsHtml } from "./html/bangGiaVanChuyenChinhNgachTrungQuocVietNamTaiHongKyLogisitcs";
import { TimNguonHangTanGocTaiTrungQuocHtml } from "./html/timNguonHangTanGocTaiTrungQuoc";
import { SaleKhungTrenTmalLenDen70NhanNgayQuocTePhuNu83Html } from "./html/saleKhungTrenTmalLenDen70NhanNgayQuocTePhuNu83";
import { SanMyPhamHangHieuGiaHapDanTrenTmalDipSale83Html } from "./html/sanMyPhamHangHieuGiaHapDanTrenTmalDipSale83";

export type NewPageMeta = {
  title: string;
  date: string;
  image: string;
  href: string;
  contentHtml: string;
};

const normalizeHtml = (html: string) =>
  html
    .trim()
    .replace(/https:\/\/hongkylogistics\.vn\/dang-ky/g, ROUTER_PATH.SIGNIN)
    .replace(/https:\/\/hongkylogistics\.vn\/dang-nhap/g, ROUTER_PATH.LOGIN)
    .replace(/target="\/Users[^"]*"/g, 'target="_blank" rel="noopener noreferrer"');

export const NEW_BANG_GIA_PAGE: NewPageMeta = {
  title: "BẢNG GIÁ VẬN CHUYỂN CHÍNH NGẠCH TRUNG QUỐC- VIỆT NAM TẠI HỒNG KỲ LOGISITCS",
  date: "07-07-2025",
  image: "https://hongkylogistics.vn/img/%E1%BA%A2NH%20CH%C3%8DNH%20NG%E1%BA%A0CH.png",
  href: ROUTER_PATH.TIN_TUC_BANG_GIA,
  contentHtml: normalizeHtml(BangGiaVanChuyenChinhNgachTrungQuocVietNamTaiHongKyLogisitcsHtml),
};

export const NEW_TIM_NGUON_PAGE: NewPageMeta = {
  title: "Tìm nguồn hàng tận gốc tại Trung Quốc",
  date: "11-04-2019",
  image: "https://hongkylogistics.vn/img/1-15531431874351532836476-crop-1553143223839385511346.jpg",
  href: ROUTER_PATH.TIN_TUC_TIM_NGUON,
  contentHtml: normalizeHtml(TimNguonHangTanGocTaiTrungQuocHtml),
};

export const NEW_SALE_TMAL_PAGE: NewPageMeta = {
  title: "SALE KHỦNG TRÊN TMAL LÊN ĐẾN 70% NHÂN NGÀY QUỐC TẾ PHỤ NỮ 8/3",
  date: "09-04-2019",
  image: "https://hongkylogistics.vn/img/happy-3-8-women-s-day-ppt-template.jpg",
  href: ROUTER_PATH.TIN_TUC_SALE_TMAL,
  contentHtml: normalizeHtml(SaleKhungTrenTmalLenDen70NhanNgayQuocTePhuNu83Html),
};

export const NEW_SAN_MY_PHAM_PAGE: NewPageMeta = {
  title: "SĂN MỸ PHẨM HÀNG HIỆU GIÁ HẤP DẪN TRÊN TMAL DỊP SALE 8/3",
  date: "28-09-2018",
  image: "https://hongkylogistics.vn/img/san-sale-my-pham-hot-tren-tmall-8-3-768x311.jpg",
  href: ROUTER_PATH.TIN_TUC_SAN_MY_PHAM,
  contentHtml: normalizeHtml(SanMyPhamHangHieuGiaHapDanTrenTmalDipSale83Html),
};

export const NEW_PAGES: NewPageMeta[] = [
  NEW_BANG_GIA_PAGE,
  NEW_TIM_NGUON_PAGE,
  NEW_SALE_TMAL_PAGE,
  NEW_SAN_MY_PHAM_PAGE,
];

export const NEW_SIDEBAR_LINKS = NEW_PAGES.map((page) => ({
  title: page.title,
  href: page.href,
}));
