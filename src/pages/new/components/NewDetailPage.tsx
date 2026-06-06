import { getNewsById } from "@/api/configs/common.config";
import type {
  NewsChildDto,
  NewsSectionDescriptionDto,
  NewsSectionDto,
} from "@/api/dtos/new.response";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import {
  DEFAULT_MESSAGE,
  ITEM_DESCRIPTION_TYPES,
  NOTI_ERROR,
} from "@/common/constants/constants";
import { formatDateDDMMYYYY } from "@/common/contexts/format";
import { emptyString, retractTitle } from "@/common/contexts/helper";
import { animateClass } from "@/hooks/useInView";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { ROUTER_PATH } from "@/routers/Route";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resolveNewsPageById } from "../data/content";
import { NewSidebar } from "./NewSidebar";

type NewDetailPageProps = {
  id?: number;
};

type NewsDetailContent = NewsChildDto & {
  sections?: NewsSectionDto[];
};

const buildSectionAnchorId = (sectionId: number) => `news-section-${sectionId}`;
const NEWS_TEXT_IMG_TYPE = "text-img";

const resolveSectionTitle = (
  title: string,
  section: NewsSectionDto,
  fallback: string,
) => {
  const parsedTitle = retractTitle(title)
    .map((item) => item.text?.trim())
    .find((text) => Boolean(text));
  if (parsedTitle) return parsedTitle;

  const firstDescriptionText = section.description
    ?.map((item) => item.text?.trim())
    .find((text) => Boolean(text));
  if (firstDescriptionText) return firstDescriptionText;

  return fallback;
};

export const NewDetailPage = ({ id }: NewDetailPageProps) => {
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: newsContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_NEWS_BY_ID, id],
    queryFn: () => getNewsById(id!),
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
  const detailContent = newsContent as NewsDetailContent | undefined;

  const staticPage = resolveNewsPageById(id);
  const sidebarSections = (detailContent?.sections ?? [])
    .filter((section) => section.active)
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((section, index) => ({
      id: buildSectionAnchorId(section.id),
      title: resolveSectionTitle(section.title, section, `Mục ${index + 1}`),
    }));

  const renderNewsDescription = (
    data: NewsSectionDescriptionDto,
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
      case NEWS_TEXT_IMG_TYPE:
        return (
          <figure key={index}>
            {data.img ? <img src={data.img} alt={data.text ?? "news-image"} /> : null}
            {data.text ? <figcaption>{data.text}</figcaption> : null}
          </figure>
        );
      default:
        return null;
    }
  };

  const buildTableRows = (data: NewsSectionDescriptionDto) => {
    const rowsRaw = Array.isArray(data.cellRows) ? data.cellRows : [];
    const flatCells = rowsRaw.flatMap((row) =>
      Array.isArray(row) ? row : [],
    ) as Array<{
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

  const renderStructuredContent = (sections: NewsSectionDto[] = []) =>
    sections
      .filter((section) => section.active)
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map((section, index) => (
        <div
          key={section.id}
          id={buildSectionAnchorId(section.id)}
          tabIndex={-1}
        >
          <h2>{resolveSectionTitle(section.title, section, `Mục ${index + 1}`)}</h2>
          {section.description?.map((item, index) =>
            renderNewsDescription(item, index),
          )}
        </div>
      ));

  const optionDate =
    newsContent?.otherOptions?.find(
      (option) => option.type === "options" || option.type === "text",
    )?.value ?? "";

  const displayDate =
    optionDate ||
    (newsContent?.updatedAt
      ? `Cập nhật: ${formatDateDDMMYYYY(newsContent.updatedAt)}`
      : staticPage?.date
        ? `Cập nhật: ${staticPage.date}`
        : "");

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="new-page">
      <section
        className="new-hub__hero new-page__hero"
        aria-labelledby="new-detail-heading"
      >
        <div className="new-hub__hero-bg">
          <div
            className={`new-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`}
          />
          <div
            className={`new-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`}
          />
          <div className="new-hub__hero-bg-blob new-hub__hero-bg-blob--1" />
          <div className="new-hub__hero-bg-blob new-hub__hero-bg-blob--2" />
          <div className="new-hub__hero-bg-blob new-hub__hero-bg-blob--3" />
        </div>

        <div className="new-hub__hero-inner container">
          <Breadcrumb
            className={`new-hub__hero-breadcrumb ${animateClass("fade-down", visible, 1)}`}
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
                  <Link to={ROUTER_PATH.TIN_TUC}>
                    {emptyString(newsContent?.name ?? "Tin tức")}
                  </Link>
                ),
              },
              {
                title: emptyString(
                  newsContent?.shortDescription ?? staticPage?.title ?? "",
                ),
              },
            ]}
          />

          <h1
            id="new-detail-heading"
            className={`new-hub__hero-title new-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {emptyString(
              newsContent?.shortDescription ?? staticPage?.title ?? "",
            )}
          </h1>

          <p
            className={`new-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}
          >
            <CalendarOutlined
              className="new-hub__hero-subtitle-icon"
              aria-hidden
            />
            <time dateTime={newsContent?.updatedAt ?? staticPage?.date}>
              {displayDate}
            </time>
          </p>
        </div>
      </section>

      <div className="container new-page__body">
        <article
          className={`new-page__article ${animateClass("fade-up", visible, 4)}`}
        >
          <div className="new-page__content entry-content">
            {renderStructuredContent(detailContent?.sections)}
          </div>
        </article>
        <NewSidebar sections={sidebarSections} />
      </div>
    </div>
  );
};
