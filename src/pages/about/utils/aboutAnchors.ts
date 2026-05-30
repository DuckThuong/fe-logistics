import type { MouseEvent } from "react";

/** Chuyển nhãn/slug từ API thành id HTML hợp lệ (#anchor). */
export const toAnchorId = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const scrollToAnchor = (anchorId: string, headerOffset = 72) => {
  const target = document.getElementById(anchorId);
  if (!target) return;

  const top =
    target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", `#${anchorId}`);
};

export const handleAboutQuickNavClick = (
  event: MouseEvent<HTMLAnchorElement>,
  anchorId: string,
) => {
  event.preventDefault();
  scrollToAnchor(anchorId);
};
