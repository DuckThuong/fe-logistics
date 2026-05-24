import { ROUTER_PATH } from "@/routers/Route";
import { StorageHtml } from "./html/storage";
import { OutboundHtml } from "./html/outbound";
import { ProhibitedHtml } from "./html/prohibited";

export type WarehousePageMeta = {
  title: string;
  date: string;
  contentHtml: string;
};

const normalizeHtml = (html: string) => html.trim();

export const WAREHOUSE_STORAGE_PAGE: WarehousePageMeta = {
  title: "Chính sách khiếu nại",
  date: "20.05.2026",
  contentHtml: normalizeHtml(StorageHtml),
};

export const WAREHOUSE_OUTBOUND_PAGE: WarehousePageMeta = {
  title: "Chính sách bảo mật thông tin",
  date: "20.05.2026",
  contentHtml: normalizeHtml(OutboundHtml),
};

export const WAREHOUSE_PROHIBITED_PAGE: WarehousePageMeta = {
  title: "Danh mục hàng hoá cấm nhập khẩu",
  date: "20.05.2026",
  contentHtml: normalizeHtml(ProhibitedHtml),
};

export const WAREHOUSE_SIDEBAR_LINKS = [
  { title: WAREHOUSE_STORAGE_PAGE.title, href: ROUTER_PATH.POLICY_KHIEN_NAI },
  { title: WAREHOUSE_OUTBOUND_PAGE.title, href: ROUTER_PATH.POLICY_BAO_MAT },
  { title: WAREHOUSE_PROHIBITED_PAGE.title, href: ROUTER_PATH.POLICY_CAM_NHAP_KHAU },
];

