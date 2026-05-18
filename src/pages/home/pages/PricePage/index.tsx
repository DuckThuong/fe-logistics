import React from "react";
import { Table, Tabs, Tag } from "antd";
import PageBanner from "@/components/shared/PageBanner";
import {
  PRICE_SERVICE_FEE,
  PRICE_ECOMMERCE_SHIPPING,
  PRICE_BULK_SHIPPING,
  PRICE_CBOM_SHIPPING,
  PRICE_INSPECTION,
} from "@/data";
import styles from "./BangGiaPage.module.scss";

// ----------- Table Columns -----------

const shippingCols = [
  {
    title: "Trọng lượng",
    dataIndex: "weight",
    key: "weight",
    className: styles.colBold,
  },
  { title: "Lạng Sơn", dataIndex: "langSon", key: "langSon" },
  { title: "Hà Nội", dataIndex: "hanoi", key: "hanoi" },
  { title: "Hồ Chí Minh", dataIndex: "hcm", key: "hcm" },
];

const volumeCols = [
  {
    title: "Khối lượng",
    dataIndex: "volume",
    key: "volume",
    className: styles.colBold,
  },
  { title: "Lạng Sơn", dataIndex: "langSon", key: "langSon" },
  { title: "Hà Nội", dataIndex: "hanoi", key: "hanoi" },
  { title: "Hồ Chí Minh", dataIndex: "hcm", key: "hcm" },
];

// ----------- Tabs items -----------

const tabItems = [
  {
    key: "order",
    label: "Order Hàng TQ",
    children: (
      <div className={styles.pricePage}>
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>CHI PHÍ MỘT ĐƠN HÀNG ORDER</h3>
          <div className={styles.formula}>
            <span>Tiền hàng</span>
            <span>+</span>
            <span>Phí VC nội địa TQ</span>
            <span>+</span>
            <span>Phí mua hàng</span>
            <span>+</span>
            <span>Phí VC TQ→VN</span>
            <span>+</span>
            <span>Phí dịch vụ khác</span>
          </div>
        </div>

        {/* Service Fee */}
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>Bảng giá phí dịch vụ mua hàng</h3>
          <p className={styles.priceMeta}>Cập nhật: 06/05/2026</p>
          <Table
            dataSource={PRICE_SERVICE_FEE.map((r, i) => ({ ...r, key: i }))}
            columns={[
              { title: "Tiền hàng", dataIndex: "range", key: "range" },
              {
                title: "Phí mua hàng",
                dataIndex: "fee",
                key: "fee",
                render: (v) => <Tag color="red">{v}</Tag>,
              },
            ]}
            pagination={false}
            className={styles.table}
          />
          <p className={styles.note}>* Phí mua hàng tối thiểu 10.000đ/đơn</p>
        </div>

        {/* TMDT Shipping */}
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>
            Phí vận chuyển TMĐT (Thương Mại Điện Tử)
          </h3>
          <Table
            dataSource={PRICE_ECOMMERCE_SHIPPING.map((r, i) => ({
              ...r,
              key: i,
            }))}
            columns={shippingCols}
            pagination={false}
            className={styles.table}
            rowClassName={(r) => (r.highlight ? styles.highlightRow : "")}
          />
        </div>

        {/* Bulk Shipping */}
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>Phí vận chuyển hàng lô</h3>
          <Table
            dataSource={PRICE_BULK_SHIPPING.map((r, i) => ({ ...r, key: i }))}
            columns={shippingCols}
            pagination={false}
            className={styles.table}
            rowClassName={(r) => (r.highlight ? styles.highlightRow : "")}
          />
        </div>

        {/* Volume */}
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>Phí vận chuyển hàng tính khối</h3>
          <Table
            dataSource={PRICE_CBOM_SHIPPING.map((r, i) => ({ ...r, key: i }))}
            columns={volumeCols}
            pagination={false}
            className={styles.table}
          />
        </div>

        {/* Inspection */}
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>Phí dịch vụ kiểm đếm</h3>
          <Table
            dataSource={PRICE_INSPECTION.map((r, i) => ({ ...r, key: i }))}
            columns={[
              {
                title: "Số lượng sản phẩm/đơn",
                dataIndex: "quantity",
                key: "quantity",
              },
              {
                title: "Đơn giá",
                dataIndex: "price",
                key: "price",
                render: (v) => (
                  <strong style={{ color: "#e8282b" }}>{v}</strong>
                ),
              },
            ]}
            pagination={false}
            className={styles.table}
          />
          <p className={styles.note}>
            * Dịch vụ kiểm đếm không bắt buộc, khách hàng có thể lựa chọn.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "ky-gui",
    label: "Ký Gửi Hàng Hoá",
    children: (
      <div className={styles.pricePage}>
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>
            Bảng Giá Dịch Vụ Ký Gửi Hàng Hoá
          </h3>
          <p className={styles.desc}>
            Dịch vụ ký gửi hàng hóa của Hồng Kỳ dành cho khách hàng đã có sẵn
            hàng tại Trung Quốc và muốn vận chuyển về Việt Nam. Vui lòng liên hệ
            hotline để được báo giá chi tiết phù hợp với từng loại hàng hóa.
          </p>
          <div className={styles.contactBox}>
            <strong>Hotline: </strong>
            <a href="tel:0964671688">0964.67.1688</a>
            <span> | </span>
            <strong>Email: </strong>
            <a href="mailto:hongkylogistics.lienhe@gmail.com">
              hongkylogistics.lienhe@gmail.com
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "chinh-ngach",
    label: "Vận Chuyển Chính Ngạch",
    children: (
      <div className={styles.pricePage}>
        <div className={styles.priceSection}>
          <h3 className={styles.priceTitle}>
            Bảng Giá Vận Chuyển Chính Ngạch Trung Quốc – Việt Nam
          </h3>
          <p className={styles.desc}>
            Hồng Kỳ cung cấp dịch vụ uỷ thác nhập khẩu chính ngạch với 12 năm
            kinh nghiệm. Chi phí phụ thuộc vào loại hàng, khối lượng và điều
            kiện thông quan. Liên hệ để được tư vấn.
          </p>
          <div className={styles.contactBox}>
            <strong>Hotline: </strong>
            <a href="tel:0964671688">0964.67.1688</a>
            <span> | </span>
            <strong>Email: </strong>
            <a href="mailto:hongkylogistics.lienhe@gmail.com">
              hongkylogistics.lienhe@gmail.com
            </a>
          </div>
        </div>
      </div>
    ),
  },
];

const BangGiaPage = () => {
  return (
    <>
      <PageBanner title="Bảng giá dịch vụ" crumbs={[{ label: "Bảng giá" }]} />

      <section className={styles.section}>
        <div className="container">
          <Tabs items={tabItems} className={styles.tabs} size="large" />
        </div>
      </section>
    </>
  );
};

export default BangGiaPage;
