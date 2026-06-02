import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { PolicySidebar } from "./PolicySidebar";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { useQuery } from "@tanstack/react-query";
import { getPolicyById } from "@/api/configs/common.config";
import { DEFAULT_MESSAGE, ITEM_DESCRIPTION_TYPES, NOTI_ERROR } from "@/common/constants/constants";
import { isAxiosError } from "axios";
import { useNotification } from "@/providers/notificationProvider";
import { useLoading } from "@/providers/loadingProvider";
import { emptyString, retractTitle } from "@/common/contexts/helper";
import { formatDateDDMMYYYY } from "@/common/contexts/format";
import type {
  PolicySectionDescriptionDto,
  PolicySectionDto,
} from "@/api/dtos/policy.response";

type PolicyDetailPageProps = {
  id?: number;
};

export const PolicyDetailPage = ({ id }: PolicyDetailPageProps) => {
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();
  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: policyContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_POLICY_BY_ID, id],
    queryFn: () => getPolicyById(id!),
    enabled: Boolean(id),
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

  const renderStaticContent = (sections: PolicySectionDto[] = []) =>
    sections
      ?.filter((section) => section.active)
      ?.sort((a, b) => a.sortIndex - b.sortIndex)
      ?.map((section) => {
      return (
        <div key={section.id}>
          <h2>
            {retractTitle(section.title)[0]?.text || emptyString(section.title)}
          </h2>
          {section?.description?.map((item, index) => {
            return renderPolicyDescription(item, index);
          })}
        </div>
      );
    });

  const renderPolicyDescription = (
    data: PolicySectionDescriptionDto,
    index: number,
  ) => {
    switch (data.type) {
      case ITEM_DESCRIPTION_TYPES.TEXT:
        return <p key={index}>{data.text}</p>;
      case ITEM_DESCRIPTION_TYPES.TABLE:
        return (
          <table key={index}>
            <thead>
              <tr>
                {(data.headers ?? []).map((header, headerIndex) => (
                  <th key={`${header}-${headerIndex}`}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buildTableRows(data).map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cell.text}-${cellIndex}`}
                      colSpan={cell.colspan ?? undefined}
                      rowSpan={cell.rowspan ?? undefined}
                    >
                      {cell.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case ITEM_DESCRIPTION_TYPES.TEXT_BULLET:
        return <p key={index}>{`• ${data.text ?? ""}`}</p>;
      case ITEM_DESCRIPTION_TYPES.TEXT_NUMBER:
        return <p key={index}>{`${index + 1}. ${data.text ?? ""}`}</p>;
      default:
        return null;
    }
  };

  const buildTableRows = (data: PolicySectionDescriptionDto) => {
    const rowsRaw = Array.isArray(data.cellRows) ? data.cellRows : [];
    const flatCells = rowsRaw.flatMap((row) => (Array.isArray(row) ? row : [])) as Array<{
      text: string;
      colspan: number | null;
      rowspan: number | null;
      startRow: number;
    }>;

    const grouped = new Map<number, typeof flatCells>();
    flatCells.forEach((cell) => {
      const rowKey = Number.isFinite(cell.startRow) ? cell.startRow : 0;
      const existing = grouped.get(rowKey) ?? [];
      existing.push(cell);
      grouped.set(rowKey, existing);
    });

    return [...grouped.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, row]) => row);
  };

  console.log({ policyContent });
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="warehouse-page">
      <section
        className="warehouse-hub__hero warehouse-page__hero"
        aria-labelledby="warehouse-detail-heading"
      >
        <div className="warehouse-hub__hero-bg">
          <div
            className={`warehouse-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`}
          />
          <div
            className={`warehouse-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`}
          />
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
              {
                title: (
                  <Link to={ROUTER_PATH.POLICY}>
                    {emptyString(policyContent?.name)}
                  </Link>
                ),
              },
              { title: emptyString(policyContent?.shortDescription) },
            ]}
          />

          <h1
            id="warehouse-detail-heading"
            className={`warehouse-hub__hero-title warehouse-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {emptyString(policyContent?.shortDescription)}
          </h1>

          <p
            className={`warehouse-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}
          >
            <CalendarOutlined
              className="warehouse-hub__hero-subtitle-icon"
              aria-hidden
            />
            <time dateTime={formatDateDDMMYYYY(policyContent?.updatedAt)}>
              Cập nhật: {formatDateDDMMYYYY(policyContent?.updatedAt)}
            </time>
          </p>
        </div>
      </section>

      <div className="container warehouse-page__body">
        <article
          className={`warehouse-page__article ${animateClass("fade-up", visible, 4)}`}
        >
          <div className="warehouse-page__content entry-content">
            {renderStaticContent(policyContent?.sections)}
          </div>
        </article>
        <PolicySidebar />
      </div>
    </div>
  );
};
