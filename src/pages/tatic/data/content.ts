import { TATIC_PAGES } from "./pages";

export const TATIC_HUB_ITEMS = TATIC_PAGES.map((page) => ({
  title: page.title,
  tag: "Hướng dẫn",
  image: page.image,
  date: page.date,
  href: page.href,
}));
