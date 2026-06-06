import { ITEM_DESCRIPTION_TYPES } from "@/common/constants/constants";
import { animateClass } from "@/hooks/useInView";
import { isServiceDescriptionBold } from "@/pages/service/utils/serviceDescriptionHeaders";
import type { ReactNode } from "react";

export type SectionDescriptionItem = {
  icon?: string;
  text?: string;
  type?: string;
  headers?: string[] | null;
};

const renderLineText = (text: string, headers?: string[] | null): ReactNode =>
  isServiceDescriptionBold(headers) ? <strong>{text}</strong> : text;

const resolveDescriptionType = (type?: string) =>
  type === ITEM_DESCRIPTION_TYPES.TEXT_BULLET
    ? ITEM_DESCRIPTION_TYPES.TEXT_BULLET
    : ITEM_DESCRIPTION_TYPES.TEXT;

/** Render description[] theo type (text / text-bullet) — khớp CMS. */
export const renderServiceSectionDescriptions = (
  descriptions: SectionDescriptionItem[] | undefined,
  inView: boolean,
): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let bulletItems: SectionDescriptionItem[] = [];
  let bulletStartIndex = 0;

  const flushBulletList = () => {
    if (bulletItems.length === 0) {
      return;
    }
    nodes.push(
      <ul key={`bullets-${bulletStartIndex}`} className="service-article__list">
        {bulletItems.map((desc, index) => (
          <li
            key={`${bulletStartIndex}-${index}`}
            className={animateClass("fade-up", inView, bulletStartIndex + index + 2)}
          >
            {renderLineText(desc.text ?? "", desc.headers)}
          </li>
        ))}
      </ul>,
    );
    bulletItems = [];
  };

  (descriptions ?? []).forEach((desc, index) => {
    if (!desc.text?.trim()) {
      return;
    }

    if (resolveDescriptionType(desc.type) === ITEM_DESCRIPTION_TYPES.TEXT_BULLET) {
      if (bulletItems.length === 0) {
        bulletStartIndex = index;
      }
      bulletItems.push(desc);
      return;
    }

    flushBulletList();
    nodes.push(
      <p
        key={`text-${index}`}
        style={{ marginBottom: 0 }}
        className={`service-article__paragraph ${animateClass("fade-up", inView, index + 2)}`}
      >
        {renderLineText(desc.text ?? "", desc.headers)}
      </p>,
    );
  });

  flushBulletList();
  return nodes;
};
