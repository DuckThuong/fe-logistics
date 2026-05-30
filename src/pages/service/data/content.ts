export const SERVICE_HUB_ITEMS = [
  {
    title: "Đặt hàng Trung Quốc",
    tag: "Dịch vụ",
    image: "https://hongkylogistics.vn/img/cs.jpg",
    featured: true,
  },
  {
    title: "Thanh toán hộ",
    tag: "Dịch vụ",
    image: "https://hongkylogistics.vn/img/cs.jpg",
    featured: false,
  },
  {
    title: "Vận chuyển hộ",
    tag: "Dịch vụ",
    image: "https://hongkylogistics.vn/img/cs.jpg",
    featured: false,
  },
];

export const RECENT_POSTS = [
  {
    title:
      "BẢNG GIÁ VẬN CHUYỂN CHÍNH NGẠCH TRUNG QUỐC - VIỆT NAM TẠI Công Ty LOGISTICS",
    href: "#",
  },
  {
    title: "Tìm nguồn hàng tận gốc tại Trung Quốc",
    href: "#",
  },
  {
    title: "SALE KHỦNG TRÊN TMALL LÊN ĐẾN 70% NHÂN NGÀY QUỐC TẾ PHỤ NỮ 8/3",
    href: "#",
  },
];

export type ServiceSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
};

export const ORDER_PAGE_SECTIONS: ServiceSection[] = [
  {
    title: "1. Đôi nét về Công ty",
    paragraphs: [
      "Trải qua hơn 8 năm hình thành và phát triển Công Ty đã có những bước phát triển không ngừng trong lĩnh vực giao thương hàng hóa Việt Trung. Hiện tại chúng tôi đang cung cấp những dịch vụ sau:",
      "Với đội ngũ nhân viên trẻ, nhiệt huyết, năng động chúng tôi luôn cố gắng mang đến cho khách hàng chất lượng dịch vụ tốt nhất trên thị trường.",
    ],
    bullets: [
      "Đặt hàng các trang thương mại điện tử của Trung Quốc như taobao.com, tmall.com, 1688.com và Alibaba.com",
      "Vận chuyển hàng hóa chính ngạch 2 chiều TQ – VN.",
      "Cho thuê kho bãi Trung Quốc.",
      "Gom hàng, đóng hàng tại kho Trung Quốc.",
      "Tạo tài khoản Alipay, nạp tiền Alipay, thanh toán quốc tế.",
    ],
  },
  {
    title: "2. Sứ mệnh",
    bullets: [
      "Sứ mệnh của chúng tôi là trở thành một công ty cung cấp tất cả những dịch vụ liên quan đến giao thương Việt Nam – Trung Quốc. Phục vụ tốt nhất những khách hàng trong thị trường mà công ty có được",
      "Đem đến cho khách hàng chất lượng dịch vụ là tốt nhất, thời gian giao nhận là nhanh nhất, giá cước là cạnh tranh nhất.",
    ],
  },
  {
    title: "3. Đội ngũ nhân viên",
    bullets: [
      "Đội ngũ nhân viên của chúng tôi là những người trẻ trung, nhiệt huyết; giỏi về chuyên môn, tận tình với công việc, luôn đoàn kết gắn bó tạo ra sức mạnh làm nền tảng cho sự phát triển bền vững của Công Ty",
    ],
  },
  {
    title: "4. Định hướng phát triển",
    bullets: [
      "Giữ vững và ngày càng tăng tốc độ phát triển trên mọi chỉ tiêu: Doanh số, nhân lực, giá trị thương hiệu,….",
      "Nâng cao uy tín hơn nữa, phấn đấu trở thành đối tác của nhiều khách hàng lớn hơn.",
    ],
  },
];

export const PAYMENT_PAGE_SECTIONS: ServiceSection[] = [
  {
    title: "Dịch vụ thanh toán hộ",
    paragraphs: [
      "Công Ty Logistics hỗ trợ nạp tiền vào Alipay, WeChat Pay và thanh toán hộ các đơn hàng trên Taobao, 1688, Tmall với tỉ giá cạnh tranh, minh bạch.",
      "Khách hàng chỉ cần gửi link sản phẩm hoặc mã đơn — đội ngũ vận hành sẽ xác nhận và thanh toán nhanh chóng, phù hợp nhu cầu mua sỉ và mua lẻ từ Trung Quốc.",
    ],
    bullets: [
      "Nạp Alipay / WeChat Pay",
      "Thanh toán Taobao, 1688, Tmall",
      "Tỉ giá cạnh tranh, không phí ẩn",
    ],
  },
];

export const SHIPPING_PAGE_SECTIONS: ServiceSection[] = [
  {
    title: "Dịch vụ vận chuyển hộ",
    paragraphs: [
      "Khi bạn đã có hàng tại kho Trung Quốc, Công Ty Logistics nhận ký gửi, đóng gói và vận chuyển về Việt Nam an toàn, theo dõi đơn thời gian thực.",
      "Chúng tôi hỗ trợ gom hàng, bảo hiểm hàng hoá và tư vấn khai báo phù hợp từng loại mặt hàng.",
    ],
    bullets: [
      "Nhận hàng tại kho Trung Quốc",
      "Bảo hiểm hàng hoá",
      "Tra cứu đơn thời gian thực",
    ],
  },
];
