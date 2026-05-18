import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import PageBanner from "@/components/shared/PageBanner";
import { SERVICES } from "@/data";
import styles from "./DichVuPage.module.scss";

const DichVuPage = () => {
  return (
    <>
      <PageBanner title="Dịch vụ" crumbs={[{ label: "Dịch vụ" }]} />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.intro}>
            <h2>
              Tất cả dịch vụ <span>Hồng Kỳ</span>
            </h2>
            <p>
              Từ order hàng, thanh toán hộ, ký gửi đến vận chuyển chính ngạch —
              chúng tôi có giải pháp cho mọi nhu cầu nhập hàng Trung Quốc của
              bạn.
            </p>
          </div>

          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <div key={service.key} className={styles.card}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
                <Link to={service.path}>
                  <Button type="primary" className={styles.btn}>
                    Xem chi tiết <ArrowRightOutlined />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DichVuPage;
