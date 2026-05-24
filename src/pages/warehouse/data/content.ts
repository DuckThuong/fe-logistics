import { ROUTER_PATH } from "@/routers/Route";

const IMG_BASE = "https://images.unsplash.com";

export const WAREHOUSE_HUB_ITEMS = [
  {
    title: "Chính sách khiếu nại",
    tag: "Chính sách",
    image: `${IMG_BASE}/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=60`,
    href: ROUTER_PATH.POLICY_KHIEN_NAI,
  },
  {
    title: "Chính sách bảo mật thông tin",
    tag: "Chính sách",
    image: `${IMG_BASE}/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=60`,
    href: ROUTER_PATH.POLICY_BAO_MAT,
  },
  {
    title: "Danh mục hàng hoá cấm nhập khẩu",
    tag: "Tiêu chuẩn",
    image: `${IMG_BASE}/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=60`,
    href: ROUTER_PATH.POLICY_CAM_NHAP_KHAU,
  },
];

