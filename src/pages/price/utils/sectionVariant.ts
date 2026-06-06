import type { SectionDto } from "@/api/dtos/priceResponse.dto";

export type SectionVariant =
  | "main-title"
  | "tagline"
  | "disclaimer"
  | "numbered"
  | "closing"
  | "heading";

export const getSectionVariant = (section: SectionDto): SectionVariant => {
  const title = section.title.trim();

  if (title.includes("TRÂN TRỌNG")) return "closing";
  if (title.startsWith("***")) return "disclaimer";
  if (section.sortIndex === 1) return "main-title";
  if (section.sortIndex === 2) return "tagline";
  if (/^\d+\./.test(title)) return "numbered";

  return "heading";
};
