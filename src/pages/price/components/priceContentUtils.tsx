import type {
  SectionDescriptionDto,
  SectionDto,
  TableCellDto,
} from "@/api/dtos/priceResponse.dto";

export const getActiveSections = (sections?: SectionDto[]) =>
  [...(sections ?? [])]
    .filter((s) => s.active)
    .sort((a, b) => a.sortIndex - b.sortIndex);

export const getSectionTitleClassName = (
  title: string,
  sortIndex: number,
): string => {
  if (sortIndex === 1) return "price-page__main-title";
  if (sortIndex === 2) return "price-page__subline";
  if (title.startsWith("***")) return "price-page__disclaimer";
  if (/TRÂN TRỌNG/i.test(title)) return "price-page__closing";
  if (/^\d+\./.test(title.trim())) return "price-page__section-heading";
  return "price-page__heading";
};

export const formatPriceUpdatedAt = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const splitTextWithBoldParts = (
  text: string,
  boldParts: string[] = [],
): Array<{ bold: boolean; value: string }> => {
  const parts = boldParts.filter((p) => p && text.includes(p));
  if (!parts.length) return [{ bold: false, value: text }];

  const pattern = new RegExp(
    `(${parts.map(escapeRegExp).join("|")})`,
    "g",
  );
  return text.split(pattern).filter(Boolean).map((chunk) => ({
    bold: parts.includes(chunk),
    value: chunk,
  }));
};

export const isTableDescription = (
  desc: SectionDescriptionDto,
): desc is SectionDescriptionDto & {
  headers: string[];
  cellRows: TableCellDto[][];
} => desc.type === "table" && !!desc.headers?.length && !!desc.cellRows?.length;
