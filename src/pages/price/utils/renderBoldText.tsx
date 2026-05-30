import { Typography } from "antd";
import type { ReactNode } from "react";

const { Paragraph, Text } = Typography;

const applyBoldParts = (text: string, boldParts: string[]): ReactNode[] => {
  if (!boldParts.length) return [text];

  let nodes: ReactNode[] = [text];

  boldParts.forEach((bold) => {
    if (!bold) return;

    nodes = nodes.flatMap((node, nodeIndex) => {
      if (typeof node !== "string") return [node];

      const segments = node.split(bold);
      if (segments.length === 1) return [node];

      return segments.flatMap((segment, segmentIndex) => {
        const items: ReactNode[] = [];
        if (segment) items.push(segment);
        if (segmentIndex < segments.length - 1) {
          items.push(
            <Text strong key={`${bold}-${nodeIndex}-${segmentIndex}`}>
              {bold}
            </Text>,
          );
        }
        return items;
      });
    });
  });

  return nodes;
};

export const renderBoldText = (text: string, boldParts: string[] = []) => {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  if (!paragraphs.length) {
    return null;
  }

  return paragraphs.map((paragraph, index) => (
    <Paragraph key={`${index}-${paragraph.slice(0, 24)}`} className="price-page__paragraph">
      {applyBoldParts(paragraph, boldParts)}
    </Paragraph>
  ));
};
