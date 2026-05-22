import { NEW_PAGES } from "./pages";

export const NEW_HUB_ITEMS = NEW_PAGES.map((page) => ({
  title: page.title,
  tag: "Tin tức",
  image: page.image,
  date: page.date,
  href: page.href,
}));
