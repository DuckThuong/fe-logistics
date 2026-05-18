import React from "react";
import PageBanner from "@/components/shared/PageBanner";
import styles from "./SimplePage.module.scss";

export const GioiThieuPage = () => (
  <>
    <PageBanner title="Giới thiệu" crumbs={[{ label: "Giới thiệu" }]} />
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2>Hồng Kỳ Logistics – Chuyên gia nhập hàng Trung Quốc</h2>
          <p>
            Hồng Kỳ là công ty chuyên lĩnh vực xuất nhập khẩu uỷ thác, với{" "}
            <strong>12 năm kinh nghiệm</strong> về lĩnh vực uỷ thác nhập khẩu,
            với đội ngũ mạng lưới văn phòng rộng khắp các tỉnh thành phố trong
            nước.
          </p>
          <p>
            Đặc biệt chúng tôi có <strong>03 kho tại Trung Quốc</strong> ở các
            tỉnh thành như: Quảng Châu, Đông Hưng, Bằng Tường — và{" "}
            <strong>đối tác chính thức của ZTO Express</strong>, đơn vị chuyển
            phát hàng đầu tại Trung Quốc.
          </p>
          <h3>Sứ mệnh</h3>
          <p>
            Cung cấp giải pháp nhập hàng Trung Quốc toàn diện, nhanh chóng, minh
            bạch và tối ưu chi phí nhất cho khách hàng Việt Nam.
          </p>
          <h3>Dịch vụ chính</h3>
          <ul>
            <li>Đặt hàng Taobao, 1688, Tmall, JD.com</li>
            <li>Thanh toán hộ qua Alipay, Wechat, ngân hàng TQ</li>
            <li>Ký gửi vận chuyển hàng hóa</li>
            <li>Uỷ thác nhập khẩu chính ngạch</li>
          </ul>
        </div>
      </div>
    </section>
  </>
);

export const HuongDanPage = () => (
  <>
    <PageBanner title="Hướng dẫn" crumbs={[{ label: "Hướng dẫn" }]} />
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2>Mua hàng nội địa Trung với vài bước đơn giản</h2>
          <div className={styles.steps}>
            {[
              {
                num: "01",
                title: "Tạo tài khoản",
                desc: "Đăng ký tài khoản miễn phí tại Hồng Kỳ. Chỉ mất 2 phút.",
              },
              {
                num: "02",
                title: "Nạp tiền vào ví",
                desc: "Chuyển khoản ngân hàng để nạp vào ví Hồng Kỳ.",
              },
              {
                num: "03",
                title: "Tạo đơn đặt hàng",
                desc: "Dán link sản phẩm từ Taobao/1688/Tmall vào hệ thống.",
              },
              {
                num: "04",
                title: "Hồng Kỳ xử lý đơn",
                desc: "Đội ngũ kiểm tra, đặt mua và vận chuyển về kho VN.",
              },
              {
                num: "05",
                title: "Nhận hàng",
                desc: "Hàng về kho HN/HCM, Hồng Kỳ thông báo và giao hàng.",
              },
            ].map((s) => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export const TinTucPage = () => (
  <>
    <PageBanner title="Tin tức" crumbs={[{ label: "Tin tức" }]} />
    <section className={styles.section}>
      <div className="container">
        <div className={styles.newsGrid}>
          {[
            {
              title:
                "Bảng giá vận chuyển chính ngạch Trung Quốc – Việt Nam tại Hồng Kỳ",
              date: "06/05/2026",
            },
            {
              title: "Tìm nguồn hàng tận gốc tại Trung Quốc",
              date: "15/03/2026",
            },
            {
              title:
                "Sale khủng trên Tmall lên đến 70% nhân ngày Quốc Tế Phụ Nữ 8/3",
              date: "07/03/2026",
            },
          ].map((n, i) => (
            <div key={i} className={styles.newsCard}>
              <div className={styles.newsImgPlaceholder} />
              <div className={styles.newsBody}>
                <span className={styles.newsDate}>{n.date}</span>
                <h3>{n.title}</h3>
                <a href="#" className={styles.newsLink}>
                  Đọc thêm →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export const ChinhSachPage = () => (
  <>
    <PageBanner title="Chính sách" crumbs={[{ label: "Chính sách" }]} />
    <section className={styles.section}>
      <div className="container">
        <div className={styles.policyLinks}>
          {[
            "Chính sách và quy định lưu kho hàng hoá",
            "Chính sách và quy định đối với hàng vận chuyển hộ",
            "Chính sách khiếu nại",
            "Chính sách bảo mật thông tin",
            "Quy định về đổi tiền và thanh toán hộ",
            "Danh mục hàng hoá cấm nhập khẩu",
          ].map((p, i) => (
            <a key={i} href="#" className={styles.policyItem}>
              <span className={styles.policyIcon}>📄</span>
              <span>{p}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  </>
);

export const NotFoundPage = () => (
  <div className={styles.notFound}>
    <div className={styles.notFoundInner}>
      <h1>404</h1>
      <h2>Trang không tồn tại</h2>
      <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <a href="/" className={styles.backBtn}>
        ← Về trang chủ
      </a>
    </div>
  </div>
);
