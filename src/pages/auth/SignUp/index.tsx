import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Divider,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  SwapOutlined,
  UserAddOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { BRAND } from "@/common/constants/constants";
import { ROUTER_PATH } from "@/routers/Route";

const { Text, Link } = Typography;
const { Option } = Select;

const KHO_OPTIONS = [
  { value: "1", label: "Cầu Giấy, Hà Nội" },
  { value: "2", label: "Quận 12, TP.HCM" },
  { value: "3", label: "Thành Phố Lạng Sơn" },
  { value: "4", label: "Hàng Chính Ngạch" },
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <div className="register-header__left">
          <a href={ROUTER_PATH.HOME} title="Trang chủ">
            <img
              src={BRAND.logoSrc}
              alt={BRAND.name}
              className="register-header__logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </a>

          {/* Exchange rate */}
          <div className="register-header__rate">
            <SwapOutlined className="register-header__rate-icon" />
            <span>Tỷ giá: 1NDT =</span>
            <span className="register-header__rate-value">3,980đ</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="register-header__nav">
          <a
            href={ROUTER_PATH.SIGNIN}
            className="register-header__nav-register"
          >
            Đăng ký
          </a>
          <a href={ROUTER_PATH.LOGIN} className="register-header__nav-login">
            Đăng nhập
          </a>
        </nav>
      </header>

      {/* ── Main ── */}
      <main className="register-main">
        <div className="register-card">
          {/* Top accent bar */}
          <div className="register-card__accent" />

          {/* Logo */}
          <div className="register-card__logo">
            <img
              src={BRAND.logoSrc}
              alt={BRAND.name}
              className="register-card__logo-img"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <h1 className="register-card__title">Đăng ký tài khoản</h1>
          <p className="register-card__subtitle">
            Tạo tài khoản để bắt đầu đặt hàng
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            {/* Họ tên + Số điện thoại */}
            <div className="register-card__row">
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                style={{ marginBottom: 14 }}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#bbb" }} />}
                  placeholder="Nguyễn Văn A"
                />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]{9,11}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
                style={{ marginBottom: 14 }}
              >
                <Input
                  prefix={<PhoneOutlined style={{ color: "#bbb" }} />}
                  placeholder="0912 345 678"
                />
              </Form.Item>
            </div>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
              style={{ marginBottom: 14 }}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#bbb" }} />}
                placeholder="example@email.com"
              />
            </Form.Item>

            {/* Mật khẩu + Xác nhận */}
            <div className="register-card__row">
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                ]}
                style={{ marginBottom: 14 }}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bbb" }} />}
                  placeholder="Tối thiểu 6 ký tự"
                />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
                style={{ marginBottom: 14 }}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#bbb" }} />}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
            </div>

            {/* Kho nhận hàng */}
            <Form.Item
              label="Kho nhận hàng"
              name="warehouse"
              rules={[{ required: true, message: "Vui lòng chọn kho!" }]}
              style={{ marginBottom: 14 }}
            >
              <Select
                placeholder="-- Kho nhận hàng --"
                suffixIcon={<HomeOutlined style={{ color: "#bbb" }} />}
              >
                {KHO_OPTIONS.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Mã giới thiệu (optional) */}
            <Form.Item
              label={
                <span>
                  Mã giới thiệu&nbsp;
                  <Text
                    style={{ color: "#bbb", fontWeight: 400, fontSize: 12 }}
                  >
                    (không bắt buộc)
                  </Text>
                </span>
              }
              name="referralCode"
              style={{ marginBottom: 16 }}
            >
              <Input
                prefix={<GiftOutlined style={{ color: "#bbb" }} />}
                placeholder="Nhập mã giới thiệu nếu có"
              />
            </Form.Item>

            {/* Điều khoản */}
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Vui lòng đồng ý điều khoản sử dụng!"),
                        ),
                },
              ]}
              style={{ marginBottom: 20 }}
            >
              <Checkbox>
                <span className="register-card__terms">
                  Tôi đồng ý với <a href="#/">điều khoản sử dụng</a> và{" "}
                  <a href="#/">chính sách bảo mật</a> của {BRAND.name}
                </span>
              </Checkbox>
            </Form.Item>

            {/* Submit */}
            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<UserAddOutlined />}
                block
                className="register-card__submit-btn"
              >
                {loading ? "Đang tạo tài khoản..." : "Đăng ký ngay"}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="register-card__divider" />

          <div className="register-card__login">
            <Text className="register-card__login-text">
              Đã có tài khoản?{" "}
              <Link
                href={ROUTER_PATH.LOGIN}
                className="register-card__login-link"
              >
                Đăng nhập
              </Link>
            </Text>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="register-footer">
        Copyright © 2026 {BRAND.name}
      </footer>
    </div>
  );
}
