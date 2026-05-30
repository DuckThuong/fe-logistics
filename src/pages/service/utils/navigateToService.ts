import { getServiceDetailPath } from "@/routers/Route";
import type { NavigateFunction } from "react-router-dom";

type ServiceNavTarget = {
  id: number;
  url: string;
};

export const navigateToServiceDetail = (
  navigate: NavigateFunction,
  child: ServiceNavTarget,
) => {
  navigate(getServiceDetailPath(child.url), { state: { serviceId: child.id } });
};
