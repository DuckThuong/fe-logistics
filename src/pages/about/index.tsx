import React, { useEffect, useState } from "react";
import { Breadcrumb, Tag } from "antd";
import { animateClass, useInView } from "@/hooks/useInView";
import {
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  ReadOutlined,
  UnorderedListOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import "./style.scss";
import { useQuery } from "@tanstack/react-query";
import { ABOUT_ENDPOINT } from "@/api/endpoints/about.endpoint";
import { getAboutContent } from "@/api/configs/about.config";
import { useLoading } from "@/providers/loadingProvider";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { isAxiosError } from "axios";
import { useNotification } from "@/providers/notificationProvider";
import { emptyString } from "@/common/contexts/helper";

const QUICK_LINKS = [
  { href: "#gioi-thieu", label: "Tổng quan", icon: <ReadOutlined /> },
  {
    href: "#dich-vu",
    label: "Dịch vụ cung cấp",
    icon: <UnorderedListOutlined />,
  },
  { href: "#tu-choi", label: "Chính sách từ chối", icon: <StopOutlined /> },
];

const services = [
  "Tư vấn tìm kiếm nguồn hàng trên các website bán buôn, bán lẻ hàng đầu Trung Quốc: alibaba.com, 1688.com, taobao.com, tmall.com…",
  "Mua hàng hộ và Kiểm tra hàng hóa",
  "Thanh toán hộ đơn hàng theo ủy thác, ký gửi hàng hóa theo yêu cầu",
  "Đóng gói và Vận chuyển hàng hóa về Việt Nam",
  "Đổi trả hàng hóa (đối với Khách hàng order của Công Ty Logistics)",
];

const refusals = [
  "Phát tán, chia sẻ, đăng tải thông tin sai sự thật/sai bản chất các tình huống/thông tin với mục đích xấu, gây ảnh hưởng đến uy tín của Công Ty Logistics.",
  "Gian lận trong giao dịch: nhận đủ hàng nhưng báo thiếu, nhận nhầm hàng của khách khác nhưng cố tình không trả, thiếu công nợ nhưng không thanh toán.",
  "Sử dụng lời lẽ khiếm nhã, có thái độ coi thường, thiếu tôn trọng và thể hiện sự bất hợp tác với nhân viên Công Ty Logistics.",
  "Cố ý mua bán sản phẩm là hàng Quốc cấm, hàng không được phép nhập và vận chuyển về Việt Nam.",
  "Có những yêu cầu không chính đáng, vượt ra ngoài phạm vi quản lý và cung cấp dịch vụ của Công Ty Logistics.",
];

const AboutPage: React.FC = () => {
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  const [headerVisible, setHeaderVisible] = useState(false);
  const { ref: introRef, inView: introInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView();
  const { ref: refusalRef, inView: refusalInView } = useInView();
  const { ref: closingRef, inView: closingInView } = useInView();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setHeaderVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: aboutContent, isLoading } = useQuery({
    queryKey: [ABOUT_ENDPOINT.GET_ABOUT_CONTENT],
    queryFn: () => getAboutContent(),
    throwOnError: (error) => {
      let message = DEFAULT_MESSAGE;
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        if (typeof apiMessage === "string") {
          message = apiMessage;
        } else if (Array.isArray(apiMessage) && apiMessage[0]) {
          message = apiMessage[0];
        }
      }
      showNotification(message, NOTI_ERROR);
      return false;
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="about-page">
      <div className="about-page__header">
        <div
          className={`about-page__header-bg ${animateClass("fade-in", headerVisible, 0)}`}
          aria-hidden
        />
        <div className="container about-page__header-inner">
          <Breadcrumb
            className={`about-page__breadcrumb ${animateClass("fade-down", headerVisible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: <span>Về chúng tôi</span> },
              { title: "Giới thiệu" },
            ]}
          />

          <div className="about-page__header-main">
            <div className="about-page__header-copy">
              <Tag
                className={`about-page__badge ${animateClass("fade-down", headerVisible, 2)}`}
                icon={<InfoCircleOutlined />}
              >
                {emptyString(aboutContent?.shortDescription)}
              </Tag>
              <h1
                className={`about-page__title ${animateClass("fade-up", headerVisible, 3)}`}
              >
                {emptyString(aboutContent?.name)}
              </h1>
              <p
                className={`about-page__subtitle ${animateClass("fade-in", headerVisible, 4)}`}
              >
                {emptyString(aboutContent?.content)}
              </p>

              <ul className="about-page__highlights">
                {aboutContent?.otherOptions
                  .filter((option) => option.type === "HIGHLIGHT")
                  .map((item, index) => (
                    <li
                      key={item.content + index}
                      className={`about-page__highlight ${animateClass("fade-up", headerVisible, index + 5)}`}
                    >
                      <span className="about-page__highlight-icon">
                        {item.icon}
                      </span>
                      <span>{item.content}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <nav
              className={`about-page__quick-nav ${animateClass("fade-left", headerVisible, 3)}`}
              aria-label="Điều hướng nhanh trong trang"
            >
              <span className="about-page__quick-nav-label">Xem nhanh</span>
              <ul className="about-page__quick-links">
                {QUICK_LINKS.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`about-page__quick-link ${animateClass("fade-left", headerVisible, index + 4)}`}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container about-page__content">
        <div
          id="gioi-thieu"
          className="about-page__intro"
          ref={introRef as React.Ref<HTMLDivElement>}
        >
          <div
            className={`about-page__intro-text ${animateClass("fade-right", introInView, 1)}`}
          >
            <p>
              <strong>
                {aboutContent?.sections?.find((s) => s.sortIndex === 1)
                  ?.title || ""}
              </strong>
              {aboutContent?.sections.find((s) => s.sortIndex === 1)
                ?.description || ""}
            </p>
          </div>
          <div
            className={`about-page__intro-image ${animateClass("fade-left", introInView, 2)}`}
          >
            {aboutContent?.sections
              .find((s) => s.sortIndex === 1)
              ?.images?.map((img, index) => (
                <img key={index} src={img} alt={`Image ${index + 1}`} />
              )) || <></>}
          </div>
        </div>

        {aboutContent?.sections
          .filter((s) => s.sortIndex > 1)
          ?.map((item, index) => (
            <div
              id="dich-vu"
              className={`about-page__section ${item.sortIndex === 2 ? "about-page__section--services" : ""}`}
              ref={servicesRef as React.Ref<HTMLDivElement>}
            >
              <h2
                className={`about-page__section-title ${animateClass("fade-up", servicesInView, 1)}`}
              >
                {emptyString(item.title)}
              </h2>
              <ul className="about-page__list">
                {services.map((item, index) => (
                  <li
                    key={index}
                    className={`about-page__list-item ${animateClass("fade-up", servicesInView, index + 2)}`}
                  >
                    <span className="about-page__list-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )) || <></>}
        {/* Services Provided */}

        {/* Closing */}
        <div
          className={`about-page__closing ${animateClass("fade-up", closingInView, 1)}`}
          ref={closingRef as React.Ref<HTMLDivElement>}
        >
          <p className={animateClass("fade-in", closingInView, 2)}>
            <strong>
              {aboutContent?.sections?.find((s) => s.sortIndex === 1)?.title ||
                ""}
            </strong>
            {aboutContent?.sections?.find((s) => s.sortIndex === 1)
              ?.description || ""}
          </p>
          <p className={animateClass("fade-in", closingInView, 3)}>
            <strong>Trân trọng!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
