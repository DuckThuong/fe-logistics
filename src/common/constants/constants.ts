import { ROUTER_PATH } from "@/routers/Route";

export const NOTI_ERROR = "error";
export const NOTI_SUCCESS = "success";
export const DEFAULT_MESSAGE = "Đã xảy ra lỗi.";
export const TYPE_LOG_OUT = 99;

export const InputState = {
  idle: "idle",
  valid: "valid",
  error: "error",
  loading: "loading",
  success: "success",
};

export const STEPS = [
  { label: "Tài khoản" },
  { label: "Thông tin" },
  { label: "Xác nhận" },
];

export const BENEFITS = [
  { icon: "🛡️", text: "Bảo mật\ntuyệt đối" },
  { icon: "🎁", text: "Ưu đãi\nthành viên" },
  { icon: "⚡", text: "Đặt xe\n1 chạm" },
  { icon: "📍", text: "Theo dõi\nreal-time" },
];

export const LOGO_COLORS: Record<string, string> = {
  PT: "#e63946",
  TB: "#2563eb",
  HL: "#16a34a",
  KS: "#7c3aed",
};

export const LOGO_OPERATORS_COLORS: Record<string, string> = {
  PT: "#e63946",
  TB: "#2563eb",
  HL: "#16a34a",
  KS: "#7c3aed",
  CT: "#ea580c",
};

export const TAG_COLORS: Record<string, string> = {
  amber: "service-card__tag--amber",
  green: "service-card__tag--green",
  red: "service-card__tag--red",
};

export const NAV_ITEMS = [
  { label: 'Giới thiệu', href: ROUTER_PATH.ABOUT_PAGE, icon: 'ti-info-circle' },
  {
    label: 'Dịch vụ',
    href: ROUTER_PATH.SERVICE,
    icon: 'ti-packages',
    children: [
      { label: 'Đặt hàng Trung Quốc', href: ROUTER_PATH.SERVICE_ORDER, icon: 'ti-shopping-cart' },
      { label: 'Thanh toán hộ', href: ROUTER_PATH.SERVICE_PAYMENT, icon: 'ti-credit-card' },
      { label: 'Vận chuyển hộ', href: ROUTER_PATH.SERVICE_SHIPPING, icon: 'ti-truck-delivery' },
    ],
  },
  {
    label: 'Bảng giá',
    href: '#bang-gia',
    icon: 'ti-receipt-2',
    children: [
      { label: 'Giá Order Hàng TQ', href: '#gia-order', icon: 'ti-tag' },
      { label: 'Giá Ký Gửi Hàng Hoá', href: '#gia-ky-gui', icon: 'ti-package' },
      { label: 'Giá Vận Chuyển Chính Ngạch', href: '#gia-van-chuyen', icon: 'ti-route' },
    ],
  },
  {
    label: 'Chính sách',
    href: '#chinh-sach',
    icon: 'ti-shield-check',
    children: [
      { label: 'Quy định lưu kho', href: '#luu-kho', icon: 'ti-building-warehouse' },
      { label: 'Hàng vận chuyển hộ', href: '#van-chuyen-ho', icon: 'ti-truck' },
      { label: 'Chính sách khiếu nại', href: '#khieu-nai', icon: 'ti-message-report' },
      { label: 'Chính sách bảo mật', href: '#bao-mat', icon: 'ti-lock' },
      { label: 'Quy định thanh toán hộ', href: '#thanh-toan-ho', icon: 'ti-wallet' },
      { label: 'Hàng hoá cấm nhập khẩu', href: '#hang-cam', icon: 'ti-ban' },
    ],
  },
  { label: 'Hướng dẫn', href: '#huong-dan', icon: 'ti-book-2' },
  { label: 'Tin tức', href: '#tin-tuc', icon: 'ti-news' },
];