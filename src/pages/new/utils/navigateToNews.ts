import { getNewsDetailPath } from "@/routers/Route";
import type { NavigateFunction } from "react-router-dom";

type NewsNavTarget = {
  id: number;
  url: string;
};

export const navigateToNewsDetail = (
  navigate: NavigateFunction,
  child: NewsNavTarget,
) => {
  navigate(getNewsDetailPath(child.url), { state: { newsId: child.id } });
};
