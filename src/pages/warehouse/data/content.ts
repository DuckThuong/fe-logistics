import { ROUTER_NAME, getPolicyDetailPath } from "@/routers/Route";
import { OutboundHtml } from "./html/outbound";
import { ProhibitedHtml } from "./html/prohibited";
import { StorageHtml } from "./html/storage";

const IMG_BASE = "https://images.unsplash.com";

const normalizeHtml = (html: string) => html.trim();

/** Khớp FE ServiceResponseDto.children[] (hub cards). */
export type PolicyHubChild = {
  id: number;
  url: string;
  name: string;
  shortDescription: string;
  image: string;
  sortIndex: number;
};

/** Nội dung chi tiết tạm (HTML tĩnh) — sau sẽ thay bằng API giống service. */
export type PolicyPageMeta = {
  id: number;
  url: string;
  title: string;
  date: string;
  contentHtml: string;
};

export const POLICY_STATIC_PAGES: PolicyPageMeta[] = [
  {
    id: 1,
    url: ROUTER_NAME.POLICY_KHIEN_NAI,
    title: "Chính sách khiếu nại",
    date: "20.05.2026",
    contentHtml: normalizeHtml(StorageHtml),
  },
  {
    id: 2,
    url: ROUTER_NAME.POLICY_BAO_MAT,
    title: "Chính sách bảo mật thông tin",
    date: "20.05.2026",
    contentHtml: normalizeHtml(OutboundHtml),
  },
  {
    id: 3,
    url: ROUTER_NAME.POLICY_CAM_NHAP_KHAU,
    title: "Danh mục hàng hoá cấm nhập khẩu",
    date: "20.05.2026",
    contentHtml: normalizeHtml(ProhibitedHtml),
  },
];

export const POLICY_HUB_CHILDREN: PolicyHubChild[] = [
  {
    id: 1,
    url: ROUTER_NAME.POLICY_KHIEN_NAI,
    name: "Chính sách",
    shortDescription: "Chính sách khiếu nại",
    image: `${IMG_BASE}/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=60`,
    sortIndex: 1,
  },
  {
    id: 2,
    url: ROUTER_NAME.POLICY_BAO_MAT,
    name: "Chính sách",
    shortDescription: "Chính sách bảo mật thông tin",
    image: `${IMG_BASE}/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=60`,
    sortIndex: 2,
  },
  {
    id: 3,
    url: ROUTER_NAME.POLICY_CAM_NHAP_KHAU,
    name: "Tiêu chuẩn",
    shortDescription: "Danh mục hàng hoá cấm nhập khẩu",
    image: `${IMG_BASE}/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=60`,
    sortIndex: 3,
  },
];

export const POLICY_SIDEBAR_LINKS = POLICY_STATIC_PAGES.map((page) => ({
  title: page.title,
  href: getPolicyDetailPath(page.url),
}));

export const resolvePolicyPageByUrl = (url?: string) =>
  POLICY_STATIC_PAGES.find((page) => page.url === url);

export const resolvePolicyPageById = (id?: number) =>
  POLICY_STATIC_PAGES.find((page) => page.id === id);

export const resolvePolicyChildByUrl = (url?: string) =>
  POLICY_HUB_CHILDREN.find((child) => child.url === url);
