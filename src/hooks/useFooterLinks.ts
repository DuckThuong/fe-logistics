import { getNewsContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { useNavItems } from "@/hooks/useNavItems";
import { getNewsDetailPath, ROUTER_PATH } from "@/routers/Route";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export type FooterLinkItem = { label: string; href: string };

type ContentChild = {
  active: boolean;
  sortIndex: number;
  url: string;
  name: string;
  shortDescription: string;
};

const buildFooterLinksFromChildren = (
  children: ContentChild[] | undefined,
  getPath: (url: string) => string,
): FooterLinkItem[] =>
  [...(children ?? [])]
    .filter((item) => item.active)
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map((child) => ({
      label: child.shortDescription || child.name,
      href: getPath(child.url),
    }));

const navChildrenToFooterLinks = (
  children: { label: string; href: string }[] | undefined,
): FooterLinkItem[] =>
  (children ?? []).map((child) => ({
    label: child.label,
    href: child.href,
  }));

export const useFooterLinks = () => {
  const navItems = useNavItems();

  const { data: newsContent } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_NEWS_CONTENT, "footer"],
    queryFn: getNewsContent,
    staleTime: 5 * 60 * 1000,
  });

  const serviceLinks = useMemo(
    () =>
      navChildrenToFooterLinks(
        navItems.find((item) => item.label === "Dịch vụ")?.children,
      ),
    [navItems],
  );

  const policyLinks = useMemo(
    () =>
      navChildrenToFooterLinks(
        navItems.find((item) => item.label === "Chính sách")?.children,
      ),
    [navItems],
  );

  const newsLinks = useMemo(
    () =>
      buildFooterLinksFromChildren(
        newsContent?.children as ContentChild[] | undefined,
        getNewsDetailPath,
      ),
    [newsContent?.children],
  );

  const priceLinks: FooterLinkItem[] = [
    { label: "Bảng giá", href: ROUTER_PATH.PRICE },
  ];

  return { serviceLinks, newsLinks, priceLinks, policyLinks };
};
