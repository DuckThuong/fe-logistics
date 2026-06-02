import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined, LayoutOutlined, SafetyCertificateFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { POLICY_HUB_CHILDREN } from "../../data/content";
import { navigateToPolicyDetail } from "../../utils/navigateToPolicy";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { useQuery } from "@tanstack/react-query";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { getPolicyContent } from "@/api/configs/common.config";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { isAxiosError } from "axios";
import { emptyString, retractTitle } from "@/common/contexts/helper";
import type { PolicyChildDto } from "@/api/dtos/policy.response";

export const PolicyHub = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();
  
  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: policyContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_POLICY_CONTENT],
    queryFn: () => getPolicyContent(),
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

  const featuredChild = policyContent?.children?.find((child) => child.sortIndex === 1);
  const gridChildren = policyContent?.children?.filter((child) => child.sortIndex > 1);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const renderCard = (
    child: PolicyChildDto,
    className: string,
    animationIndex: number,
  ) => (
    <div
      key={child.id}
      role="button"
      tabIndex={0}
      onClick={() => navigateToPolicyDetail(navigate, child)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigateToPolicyDetail(navigate, child);
        }
      }}
      className={`${className} ${animateClass("fade-up", visible, animationIndex)}`}
    >
      <div className="warehouse-hub__card-image-wrap">
        <img
          src={child.image}
          alt={child.shortDescription}
          className="warehouse-hub__card-image"
        />
      </div>
      <div className="warehouse-hub__card-info">
        <span className="warehouse-hub__card-tag">{child.name}</span>
        <p className="warehouse-hub__card-title">{child.shortDescription}</p>
      </div>
    </div>
  );

  return (
    <div className="warehouse-hub">
      <section className="warehouse-hub__hero" aria-labelledby="warehouse-hub-heading">
        <div className="warehouse-hub__hero-bg">
          <div className={`warehouse-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`} />
          <div className={`warehouse-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`} />
          <div className="warehouse-hub__hero-bg-blob warehouse-hub__hero-bg-blob--1" />
          <div className="warehouse-hub__hero-bg-blob warehouse-hub__hero-bg-blob--2" />
          <div className="warehouse-hub__hero-bg-blob warehouse-hub__hero-bg-blob--3" />
        </div>

        <div className="warehouse-hub__hero-inner container">
          <Breadcrumb
            className={`warehouse-hub__hero-breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: "Chính sách" },
            ]}
          />

          <div className={animateClass("fade-down", visible, 2)}>
            <div className="warehouse-hub__hero-badge">
              <SafetyCertificateFilled className="warehouse-hub__hero-badge-icon" />
              <span>{emptyString(policyContent?.shortDescription)}</span>
            </div>
          </div>

          <h1
            id="warehouse-hub-heading"
            className={`warehouse-hub__hero-title ${animateClass("fade-up", visible, 3)}`}
          >
            {emptyString(
              (policyContent?.description?.[0] ?? "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .join(" "),
            )}{" "}
            <span className="warehouse-hub__hero-title-highlight">
              {(policyContent?.description?.[0] ?? "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .slice(2)
                .join(" ")}
            </span>
          </h1>

          <p className={`warehouse-hub__hero-subtitle ${animateClass("fade-in", visible, 4)}`}>
            <LayoutOutlined className="warehouse-hub__hero-subtitle-icon" />
            {retractTitle(policyContent?.otherOptions?.[0]?.value || "")[0]?.text || ""}
          </p>
        </div>
      </section>

      <div className="container warehouse-hub__content">
        {featuredChild
          ? renderCard(
              featuredChild,
              "warehouse-hub__card warehouse-hub__card--featured",
              5,
            )
          : null}
        <div className={`warehouse-hub__grid ${animateClass("fade-up", visible, 6)}`}>
          {gridChildren?.map((child: PolicyChildDto, index: number) =>
            renderCard(child, "warehouse-hub__card", index + 7),
          )}
        </div>
      </div>
    </div>
  );
};
