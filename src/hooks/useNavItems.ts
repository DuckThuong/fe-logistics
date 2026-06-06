import { getPolicyContent, getServiceContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import {
  BASE_NAV_ITEMS,
  type NavItem,
  type NavItemChild,
} from "@/common/constants/constants";
import { getPolicyDetailPath, getServiceDetailPath } from "@/routers/Route";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const SERVICE_CHILD_ICONS: Record<string, string> = {
  "dat-hang-trung-quoc": "ti-shopping-cart",
  "thanh-toan-ho": "ti-credit-card",
  "van-chuyen-ho": "ti-truck-delivery",
};

const POLICY_CHILD_ICONS: Record<string, string> = {
  "chinh-sach-khieu-nai": "ti-message-report",
  "chinh-sach-bao-mat-thong-tin": "ti-lock",
  "danh-muc-hang-hoa-cam-nhap-khau": "ti-ban",
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

const buildPolicyNavChildren = (
  children: Awaited<ReturnType<typeof getPolicyContent>>["children"],
): NavItemChild[] =>
  [...(children ?? [])]
    .filter((item) => item.active)
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((child) => ({
      label: child.shortDescription || child.name,
      href: getPolicyDetailPath(child.url),
      icon: POLICY_CHILD_ICONS[child.url] ?? "ti-shield-check",
      state: { policyId: child.id },
    }));

export const useNavItems = (): NavItem[] => {
  const { data: serviceContent } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_SERIVICE_CONTENT, "nav"],
    queryFn: getServiceContent,
    staleTime: 5 * 60 * 1000,
  });
  const { data: policyContent } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_POLICY_CONTENT, "nav"],
    queryFn: getPolicyContent,
    staleTime: 5 * 60 * 1000,
  });

  return useMemo(
    () =>
      BASE_NAV_ITEMS.map((item) => {
        if (item.label === "Dịch vụ") {
          const children = buildServiceNavChildren(serviceContent?.children);
          return children.length ? { ...item, children } : item;
        }

        if (item.label === "Chính sách") {
          const children = buildPolicyNavChildren(policyContent?.children);
          return children.length ? { ...item, children } : item;
        }

        return item;
      }),
    [policyContent?.children, serviceContent?.children],
  );
};
