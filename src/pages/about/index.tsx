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
import {
  ABOUT_OPTION_TYPES,
  DEFAULT_MESSAGE,
  NOTI_ERROR,
} from "@/common/constants/constants";
import { isAxiosError } from "axios";
import { useNotification } from "@/providers/notificationProvider";
import { emptyString, toRoman } from "@/common/contexts/helper";

const AboutPage: React.FC = () => {
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  const [headerVisible, setHeaderVisible] = useState(false);
  const { ref: introRef, inView: introInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView();
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
                  ?.filter(
                    (option) => option.type == ABOUT_OPTION_TYPES.options,
                  )
                  ?.map((item, index) => (
                    <li
                      key={item.value + index}
                      className={`about-page__highlight ${animateClass("fade-up", headerVisible, index + 5)}`}
                    >
                      <span className="about-page__highlight-icon">
                        <img
                          src={item.icon}
                          alt={item.value}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </span>
                      <span>{item.value}</span>
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
                {aboutContent?.otherOptions
                  ?.filter(
                    (option) => option.type == ABOUT_OPTION_TYPES.quick_link,
                  )
                  ?.map((item, index) => (
                    <li key={item.value + index}>
                      <a
                        href={`#${item.value}`}
                        className={`about-page__quick-link ${animateClass("fade-left", headerVisible, index + 4)}`}
                      >
                        <img
                          src={item.icon}
                          alt={item.value}
                          style={{ width: "20px", height: "20px" }}
                        />
                        {item.value}
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
                  ?.title || ""}{" "}
                <span> </span>
              </strong>
              {aboutContent?.sections?.find((s) => s.sortIndex === 1)
                ?.description?.[0]?.text || ""}
            </p>
          </div>
          <div
            className={`about-page__intro-image ${animateClass("fade-left", introInView, 2)}`}
          >
            {aboutContent?.sections
              ?.find((s) => s.sortIndex === 1)
              ?.images?.map((img, index) => (
                <img key={index} src={img} alt={`Image ${index + 1}`} />
              )) || <></>}
          </div>
        </div>

        <div ref={servicesRef as React.Ref<HTMLDivElement>}>
          {aboutContent?.sections
            ?.filter((s) => s.sortIndex > 1)
            ?.map((item) => (
              <div
                key={item.id}
                id="dich-vu"
                className={`about-page__section ${
                  item.sortIndex === 2 ? "about-page__section--services" : ""
                }`}
              >
                <h2
                  className={`about-page__section-title ${animateClass("fade-up", servicesInView, 1)}`}
                >
                  <span>{toRoman(item?.id)} .</span> {emptyString(item.title)}
                </h2>
                <ul className="about-page__list">
                  {item?.description?.map((desc, index) => (
                    <li
                      key={index}
                      className={`about-page__list-item ${animateClass("fade-up", servicesInView, index + 2)}`}
                    >
                      <span className="about-page__list-icon">✓</span>
                      <span>{desc.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )) || <></>}
        </div>

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
            {aboutContent?.sections
              ?.find((s) => s.sortIndex === 1)
              ?.description?.map((desc, index) => (
                <span key={index}>{desc.text}</span>
              )) || ""}
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
