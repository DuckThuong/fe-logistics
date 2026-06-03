import { ROUTER_PATH } from "@/routers/Route";

export const BRAND = {
  name: "Mã Vận Logistics",
  logoSrc: `${process.env.PUBLIC_URL}/image.png`,
  hotline: "0929905566",
  hotlineDisplay: "0929.905.566",
  telHref: "tel:0929905566",
  zaloUrl: "https://zalo.me/0929905566",
} as const;

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

export type NavItemChild = {
  label: string;
  href: string;
  icon?: string;
  state?: { serviceId: number };
};

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  children?: NavItemChild[];
};

/** Menu tĩnh; mục con "Dịch vụ" được gắn từ API trong `useNavItems`. */
export const BASE_NAV_ITEMS: NavItem[] = [
  { label: "Giới thiệu", href: ROUTER_PATH.ABOUT_PAGE, icon: "ti-info-circle" },
  {
    label: "Dịch vụ",
    href: ROUTER_PATH.SERVICE,
    icon: "ti-packages",
  },
  {
    label: "Bảng giá",
    href: ROUTER_PATH.PRICE,
    icon: "ti-receipt-2",
  },
  {
    label: "Chính sách",
    href: ROUTER_PATH.POLICY,
    icon: "ti-shield-check",
    children: [
      {
        label: "Chính sách khiếu nại",
        href: ROUTER_PATH.POLICY_KHIEN_NAI,
        icon: "ti-message-report",
      },
      {
        label: "Chính sách bảo mật",
        href: ROUTER_PATH.POLICY_BAO_MAT,
        icon: "ti-lock",
      },
      {
        label: "Hàng hoá cấm nhập khẩu",
        href: ROUTER_PATH.POLICY_CAM_NHAP_KHAU,
        icon: "ti-ban",
      },
    ],
  },
  { label: "Tin tức", href: ROUTER_PATH.TIN_TUC, icon: "ti-news" },
];

/** @deprecated Dùng `useNavItems()` để có submenu dịch vụ từ API. */
export const NAV_ITEMS = BASE_NAV_ITEMS;

export const ABOUT_OPTION_TYPES = {
  options: "options",
  quick_link: "quick-link",
};
