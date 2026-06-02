import { getNewsContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { NewDetailPage } from "../../components/NewDetailPage";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export const NewsDetail = () => {
  const location = useLocation();
  const { newsUrl } = useParams<{ newsUrl: string }>();
  const stateNewsId = location.state?.newsId as number | undefined;

  const { data: newsHub } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_NEWS_CONTENT, "resolve-id", newsUrl],
    queryFn: getNewsContent,
    enabled: !stateNewsId && Boolean(newsUrl),
    staleTime: 5 * 60 * 1000,
  });

  const newsId =
    stateNewsId ?? newsHub?.children?.find((child) => child.url === newsUrl)?.id;

  return (
    <div className="new-detail-page">
      <NewDetailPage id={newsId} />
    </div>
  );
};
