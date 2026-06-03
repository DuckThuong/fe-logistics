import { Button } from "antd";
import { ArrowRightOutlined, PhoneOutlined } from "@ant-design/icons";
import { BRAND } from "@/common/constants/constants";
import { animateClass, useInView } from "@/hooks/useInView";
import "./CTASection.scss";

const CTASection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="hk-cta section" ref={ref}>
      <div className="hk-cta__bg">
        <div className="hk-cta__bg-blob hk-cta__bg-blob--1" />
        <div className="hk-cta__bg-blob hk-cta__bg-blob--2" />
      </div>

      <div className="container">
        <div className="hk-cta__inner">
          <div
            className={`hk-cta__badge ${animateClass("fade-down", inView, 1)}`}
          >
            🚀 Bắt đầu ngay hôm nay
          </div>

          <h2 className={`hk-cta__title ${animateClass("fade-up", inView, 2)}`}>
            Sẵn sàng hợp tác cùng
            <br />
            <span>{BRAND.name}?</span>
          </h2>

          <p className={`hk-cta__desc ${animateClass("fade-up", inView, 3)}`}>
            Tiếp cận công xưởng sản xuất lớn nhất thế giới. Rất nhiều hàng hóa
            đang chờ bạn khám phá với mức giá tốt nhất.
          </p>

          <div
            className={`hk-cta__actions ${animateClass("fade-up", inView, 4)}`}
          >
            {/* <Button
              type="primary"
              size="large"
              className="hk-cta__btn-primary"
              href="/dang-ky"
            >
              Tạo tài khoản miễn phí
              <ArrowRightOutlined />
            </Button> */}

            <a href={BRAND.telHref} className="hk-cta__hotline">
              <div className="hk-cta__hotline-icon">
                <PhoneOutlined />
              </div>
              <div className="hk-cta__hotline-content">
                <span className="hk-cta__hotline-label">Hotline / Zalo 24/7</span>
                <strong className="hk-cta__hotline-number">
                  {BRAND.hotlineDisplay}
                </strong>
              </div>
            </a>
          </div>

          <div
            className={`hk-cta__trust ${animateClass("fade-in", inView, 5)}`}
          >
            {[
              "✅ Đăng ký miễn phí",
              "✅ Không cần CMND",
              "✅ Hỗ trợ ngay 24/7",
            ].map((t) => (
              <span key={t} className="hk-cta__trust-item">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
