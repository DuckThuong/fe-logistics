import {
  ABOUT_OPTION_TYPES,
  DEFAULT_MESSAGE,
  ITEM_DESCRIPTION_TYPES,
  NOTI_ERROR,
} from "@/common/constants/constants";
import { emptyString, retractTitle, toRoman } from "@/common/contexts/helper";
import { animateClass, useInView } from "@/hooks/useInView";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { ROUTER_PATH } from "@/routers/Route";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Tag } from "antd";
import { isAxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { getAboutContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import {
  handleAboutQuickNavClick,
  toAnchorId,
} from "@/pages/about/utils/aboutAnchors";

type AboutDescriptionItem = {
  icon?: string;
  text?: string;
  type?: string;
};

const resolveDescriptionType = (type?: string) =>
  type === ITEM_DESCRIPTION_TYPES.TEXT_BULLET
    ? ITEM_DESCRIPTION_TYPES.TEXT_BULLET
    : ITEM_DESCRIPTION_TYPES.TEXT;

const renderAboutSectionDescriptions = (
  descriptions: AboutDescriptionItem[] | undefined,
  inView: boolean,
) => {
  const nodes: React.ReactNode[] = [];
  let bulletItems: AboutDescriptionItem[] = [];
  let bulletStartIndex = 0;

  const flushBulletList = () => {
    if (bulletItems.length === 0) {
      return;
    }
    nodes.push(
      <ul key={`bullets-${bulletStartIndex}`} className="about-page__list">
        {bulletItems.map((desc, index) => (
          <li
            key={`${bulletStartIndex}-${index}`}
            className={`about-page__list-item ${animateClass("fade-up", inView, bulletStartIndex + index + 2)}`}
          >
            <span className="about-page__list-icon">✓</span>
            <span>{desc.text}</span>
          </li>
        ))}
      </ul>,
    );
    bulletItems = [];
  };

  (descriptions ?? []).forEach((desc, index) => {
    if (!desc.text?.trim()) {
      return;
    }

    if (resolveDescriptionType(desc.type) === ITEM_DESCRIPTION_TYPES.TEXT_BULLET) {
      if (bulletItems.length === 0) {
        bulletStartIndex = index;
      }
      bulletItems.push(desc);
      return;
    }

    flushBulletList();
    nodes.push(
      <p
        key={`text-${index}`}
        className={`about-page__section-text ${animateClass("fade-up", inView, index + 2)}`}
      >
        {desc.text}
      </p>,
    );
  });

  flushBulletList();
  return nodes;
};

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
    queryKey: [CONTENT_ENDPOINTS.GET_ABOUT_CONTENT],
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

  const quickLinks = useMemo(
    () =>
      aboutContent?.otherOptions?.filter(
        (option) => option.type === ABOUT_OPTION_TYPES.quick_link,
      ) ?? [],
    [aboutContent?.otherOptions],
  );

  const introAnchorId = quickLinks[0]
    ? toAnchorId(quickLinks[0].value)
    : "gioi-thieu";

  const closingSection = useMemo(() => {
    const sections = aboutContent?.sections ?? [];
    if (sections.length === 0) {
      return undefined;
    }
    return sections.reduce((max, section) =>
      section.sortIndex > max.sortIndex ? section : max,
    );
  }, [aboutContent?.sections]);

  const contentSections = useMemo(
    () =>
      [...(aboutContent?.sections ?? [])]
        .filter(
          (section) =>
            section.active &&
            section.sortIndex > 1 &&
            section.sortIndex !== closingSection?.sortIndex,
        )
        .sort((a, b) => a.sortIndex - b.sortIndex),
    [aboutContent?.sections, closingSection?.sortIndex],
  );

  const getSectionAnchorId = (sectionIndex: number, sectionTitle: string) => {
    const link = quickLinks[sectionIndex + 1];
    if (link?.value) {
      return toAnchorId(link.value);
    }
    return toAnchorId(sectionTitle) || `section-${sectionIndex}`;
  };

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
              { title: emptyString(aboutContent?.name) },
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
                {quickLinks.map((item, index) => {
                  const anchorId = toAnchorId(item.value);

                  return (
                    <li key={`${anchorId}-${index}`}>
                      <a
                        href={`#${anchorId}`}
                        className={`about-page__quick-link ${animateClass("fade-left", headerVisible, index + 4)}`}
                        onClick={(event) =>
                          handleAboutQuickNavClick(event, anchorId)
                        }
                      >
                        <img
                          src={item.icon}
                          alt={item.value}
                          style={{ width: "20px", height: "20px" }}
                        />
                        {item.value}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container about-page__content">
        <div
          id={introAnchorId}
          className="about-page__intro about-page__anchor-target"
          ref={introRef as React.Ref<HTMLDivElement>}
        >
          <div
            className={`about-page__intro-text ${animateClass("fade-right", introInView, 1)}`}
          >
            <p>
              <strong>
                {retractTitle(aboutContent?.sections?.find((s) => s.sortIndex === 1)
                  ?.title || "")[0]?.text || ""}
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
          {contentSections.map((item, sectionIndex) => (
            <div
              key={item.id}
              id={getSectionAnchorId(sectionIndex, item.title)}
              className={`about-page__section about-page__anchor-target ${item.sortIndex === 2 ? "about-page__section--services" : ""
                }`}
            >
              <h2
                className={`about-page__section-title ${animateClass("fade-up", servicesInView, 1)}`}
              >
                <span>{toRoman(item?.sortIndex - 1)} .</span> {retractTitle(item.title)[0]?.text || ""}
              </h2>
              <div className="about-page__section-body">
                {renderAboutSectionDescriptions(item.description, servicesInView)}
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div
          className={`about-page__closing ${animateClass("fade-up", closingInView, 1)}`}
          ref={closingRef as React.Ref<HTMLDivElement>}
        >
          <p className={animateClass("fade-in", closingInView, 2)}>
            <strong>{retractTitle(closingSection?.title || "")[0]?.text || ""}</strong>
            <span> </span>
            {closingSection?.description?.[0]?.text || ""}
          </p>
          <p className={animateClass("fade-in", closingInView, 3)}>
            <strong>
              {closingSection?.description?.[1]?.text || "Trân trọng!"}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
