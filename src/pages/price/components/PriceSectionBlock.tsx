import type {
  SectionDescriptionDto,
  SectionDto,
} from "@/api/dtos/priceResponse.dto";
import { buildAntdTable } from "@/pages/price/utils/priceTable";
import { renderBoldText } from "@/pages/price/utils/renderBoldText";
import { getSectionVariant } from "@/pages/price/utils/sectionVariant";
import { Alert, Table, Typography } from "antd";

const { Title, Paragraph } = Typography;

type PriceSectionBlockProps = {
  section: SectionDto;
};

const renderDescription = (desc: SectionDescriptionDto, index: number) => {
  if (desc.type === "table" && desc.headers?.length && desc.cellRows?.length) {
    const { columns, dataSource } = buildAntdTable(desc.headers, desc.cellRows);

    return (
      <Table
        key={`table-${index}`}
        className="price-page__table"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: "max-content" }}
      />
    );
  }

  if (desc.type === "text" && desc.text) {
    return (
      <div key={`text-${index}`}>{renderBoldText(desc.text, desc.boldParts)}</div>
    );
  }

  return null;
};

const renderSectionTitle = (section: SectionDto) => {
  const variant = getSectionVariant(section);
  const { title } = section;

  switch (variant) {
    case "main-title":
      return (
        <Title level={2} className="price-page__main-title">
          {title}
        </Title>
      );
    case "tagline":
      return (
        <Paragraph className="price-page__tagline">{title}</Paragraph>
      );
    case "disclaimer":
      return (
        <Alert
          type="warning"
          showIcon
          className="price-page__disclaimer"
          message={title}
        />
      );
    case "closing":
      return (
        <Title level={3} className="price-page__closing">
          {title}
        </Title>
      );
    case "numbered":
      return (
        <Title level={4} className="price-page__section-heading">
          {title}
        </Title>
      );
    default:
      return (
        <Title level={4} className="price-page__heading">
          {title}
        </Title>
      );
  }
};

export const PriceSectionBlock = ({ section }: PriceSectionBlockProps) => {
  const variant = getSectionVariant(section);
  const hasTitleOnly =
    variant === "disclaimer" && !section.description?.length;

  if (hasTitleOnly) {
    return <div className="price-page__section">{renderSectionTitle(section)}</div>;
  }

  return (
    <section className="price-page__section">
      {variant !== "disclaimer" && renderSectionTitle(section)}
      {section.description?.map((desc, index) => renderDescription(desc, index))}
    </section>
  );
};
