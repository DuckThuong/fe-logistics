import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import './Header.scss';
import { ROUTER_PATH } from '@/routers/Route';
import { NAV_ITEMS } from '@/common/constants/constants';

const isInternalPath = (href: string) => href.startsWith('/');

const HeaderLink = ({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}) =>
  isInternalPath(href) ? (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`hk-header ${scrolled ? 'hk-header--scrolled' : ''}`}>
      <div className="hk-header__inner container">
        <Link to={ROUTER_PATH.MAIN_PAGE} className="hk-header__logo">
          <div className="hk-header__logo-icon">
            <i className="ti ti-truck-delivery" aria-hidden="true" />
          </div>
          <div className="hk-header__logo-text">
            <span className="hk-header__logo-name">Công Ty</span>
            <span className="hk-header__logo-sub">Logistics</span>
          </div>
        </Link>

        <nav className="hk-header__nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`hk-header__nav-item ${item.children ? 'hk-header__nav-item--dropdown' : ''}`}
            >
              <HeaderLink href={item.href} className="hk-header__nav-link">
                {item.icon && <i className={`ti ${item.icon} hk-header__nav-icon`} aria-hidden="true" />}
                {item.label}
                {item.children && <i className="ti ti-chevron-down hk-header__nav-arrow" aria-hidden="true" />}
              </HeaderLink>
              {item.children && (
                <div className="hk-header__dropdown">
                  <div className="hk-header__dropdown-panel">
                    {item.children.map((child) => (
                      <HeaderLink key={child.label} href={child.href} className="hk-header__dropdown-item">
                        {child.icon && <i className={`ti ${child.icon} hk-header__dropdown-icon`} aria-hidden="true" />}
                        {child.label}
                      </HeaderLink>
                    ))}
                  </div>
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
            <span>Công Ty Logistics</span>
          </div>
        }
      >
        <nav className="hk-mobile-nav">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="hk-mobile-nav__group">
              <HeaderLink
                href={item.href}
                className="hk-mobile-nav__link"
                onClick={() => setDrawerOpen(false)}
              >
                {item.icon && <i className={`ti ${item.icon} hk-mobile-nav__icon`} aria-hidden="true" />}
                {item.label}
              </HeaderLink>
              {item.children && (
                <div className="hk-mobile-nav__sub">
                  {item.children.map((child) => (
                    <HeaderLink
                      key={child.label}
                      href={child.href}
                      className="hk-mobile-nav__sub-link"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {child.icon && <i className={`ti ${child.icon} hk-mobile-nav__sub-icon`} aria-hidden="true" />}
                      {child.label}
                    </HeaderLink>
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
