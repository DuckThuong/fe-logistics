import { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import './Header.scss';
import { ROUTER_PATH } from '@/routers/Route';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '#gioi-thieu', icon: 'ti-info-circle' },
  {
    label: 'Dịch vụ',
    href: '#dich-vu',
    icon: 'ti-packages',
    children: [
      { label: 'Đặt hàng Trung Quốc', href: '#dat-hang', icon: 'ti-shopping-cart' },
      { label: 'Thanh toán hộ', href: '#thanh-toan', icon: 'ti-credit-card' },
      { label: 'Vận chuyển hộ', href: '#van-chuyen', icon: 'ti-truck-delivery' },
    ],
  },
  {
    label: 'Bảng giá',
    href: '#bang-gia',
    icon: 'ti-receipt-2',
    children: [
      { label: 'Giá Order Hàng TQ', href: '#gia-order', icon: 'ti-tag' },
      { label: 'Giá Ký Gửi Hàng Hoá', href: '#gia-ky-gui', icon: 'ti-package' },
      { label: 'Giá Vận Chuyển Chính Ngạch', href: '#gia-van-chuyen', icon: 'ti-route' },
    ],
  },
  {
    label: 'Chính sách',
    href: '#chinh-sach',
    icon: 'ti-shield-check',
    children: [
      { label: 'Quy định lưu kho', href: '#luu-kho', icon: 'ti-building-warehouse' },
      { label: 'Hàng vận chuyển hộ', href: '#van-chuyen-ho', icon: 'ti-truck' },
      { label: 'Chính sách khiếu nại', href: '#khieu-nai', icon: 'ti-message-report' },
      { label: 'Chính sách bảo mật', href: '#bao-mat', icon: 'ti-lock' },
      { label: 'Quy định thanh toán hộ', href: '#thanh-toan-ho', icon: 'ti-wallet' },
      { label: 'Hàng hoá cấm nhập khẩu', href: '#hang-cam', icon: 'ti-ban' },
    ],
  },
  { label: 'Hướng dẫn', href: '#huong-dan', icon: 'ti-book-2' },
  { label: 'Tin tức', href: '#tin-tuc', icon: 'ti-news' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`hk-header ${scrolled ? 'hk-header--scrolled' : ''}`}>
      <div className="hk-header__inner container">
        <a href={ROUTER_PATH.MAIN_PAGE} className="hk-header__logo">
          <div className="hk-header__logo-icon">
            <i className="ti ti-truck-delivery" aria-hidden="true" />
          </div>
          <div className="hk-header__logo-text">
            <span className="hk-header__logo-name">Hồng Kỳ</span>
            <span className="hk-header__logo-sub">Logistics</span>
          </div>
        </a>

        <nav className="hk-header__nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`hk-header__nav-item ${item.children ? 'hk-header__nav-item--dropdown' : ''}`}
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href={item.href} className="hk-header__nav-link">
                {item.icon && <i className={`ti ${item.icon} hk-header__nav-icon`} aria-hidden="true" />}
                {item.label}
                {item.children && <i className="ti ti-chevron-down hk-header__nav-arrow" aria-hidden="true" />}
              </a>
              {item.children && activeDropdown === item.label && (
                <div className="hk-header__dropdown">
                  {item.children.map((child) => (
                    <a key={child.label} href={child.href} className="hk-header__dropdown-item">
                      {child.icon && <i className={`ti ${child.icon} hk-header__dropdown-icon`} aria-hidden="true" />}
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hk-header__actions">
          <Button className="hk-header__btn-login" href={ROUTER_PATH.LOGIN} icon={<i className="ti ti-login" />}>
            Đăng nhập
          </Button>
          <Button type="primary" className="hk-header__btn-register" href={ROUTER_PATH.SIGNIN} icon={<i className="ti ti-user-plus" />}>
            Đăng ký
          </Button>
        </div>

        <button
          className="hk-header__mobile-toggle"
          onClick={() => setDrawerOpen(true)}
          aria-label="Mở menu"
        >
          <i className="ti ti-menu-2" aria-hidden="true" />
        </button>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={300}
        className="hk-mobile-drawer"
        closeIcon={<i className="ti ti-x" />}
        title={
          <div className="hk-mobile-drawer__logo">
            <div className="hk-header__logo-icon">
              <i className="ti ti-truck-delivery" aria-hidden="true" />
            </div>
            <span>Hồng Kỳ Logistics</span>
          </div>
        }
      >
        <nav className="hk-mobile-nav">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="hk-mobile-nav__group">
              <a href={item.href} className="hk-mobile-nav__link" onClick={() => setDrawerOpen(false)}>
                {item.icon && <i className={`ti ${item.icon} hk-mobile-nav__icon`} aria-hidden="true" />}
                {item.label}
              </a>
              {item.children && (
                <div className="hk-mobile-nav__sub">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="hk-mobile-nav__sub-link"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {child.icon && <i className={`ti ${child.icon} hk-mobile-nav__sub-icon`} aria-hidden="true" />}
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="hk-mobile-nav__actions">
            <Button block href={ROUTER_PATH.LOGIN} icon={<i className="ti ti-login" />}>
              Đăng nhập
            </Button>
            <Button block type="primary" href={ROUTER_PATH.SIGNIN} icon={<i className="ti ti-user-plus" />}>
              Đăng ký
            </Button>
          </div>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
