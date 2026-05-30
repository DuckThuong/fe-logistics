import { getServiceContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import {
  BASE_NAV_ITEMS,
  type NavItem,
  type NavItemChild,
} from "@/common/constants/constants";
import { getServiceDetailPath } from "@/routers/Route";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const SERVICE_CHILD_ICONS: Record<string, string> = {
  "dat-hang-trung-quoc": "ti-shopping-cart",
  "thanh-toan-ho": "ti-credit-card",
  "van-chuyen-ho": "ti-truck-delivery",
};

const buildServiceNavChildren = (
  children: Awaited<ReturnType<typeof getServiceContent>>["children"],
): NavItemChild[] =>
  [...(children ?? [])]
    .filter((item) => item.active)
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((child) => ({
      label: child.shortDescription || child.name,
      href: getServiceDetailPath(child.url),
      icon: SERVICE_CHILD_ICONS[child.url] ?? "ti-point",
      state: { serviceId: child.id },
    }));

export const useNavItems = (): NavItem[] => {
  const { data: serviceContent } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_SERIVICE_CONTENT, "nav"],
    queryFn: getServiceContent,
    staleTime: 5 * 60 * 1000,
  });

  return useMemo(
    () =>
      BASE_NAV_ITEMS.map((item) => {
        if (item.label !== "Dịch vụ") {
          return item;
        }

        const children = buildServiceNavChildren(serviceContent?.children);
        return children.length ? { ...item, children } : item;
      }),
    [serviceContent?.children],
  );
};
