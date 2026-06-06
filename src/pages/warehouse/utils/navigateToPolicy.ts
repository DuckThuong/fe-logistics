import { getPolicyDetailPath } from "@/routers/Route";
import type { NavigateFunction } from "react-router-dom";

type PolicyNavTarget = {
  id: number;
  url: string;
};

export const navigateToPolicyDetail = (
  navigate: NavigateFunction,
  child: PolicyNavTarget,
) => {
  navigate(getPolicyDetailPath(child.url), { state: { policyId: child.id } });
};
