import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { PhoneFloatButton } from '@/components/PhoneFloatButton/PhoneFloatButton';
import { ZaloFloatButton } from '@/components/ZaloFloatButton/ZaloFloatButton';
import { InfoBannerPopup } from '@/pages/InforBanner/InfoBannerPopup';
import '@/global.scss';
import './MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-layout__main">
        <Outlet />
      </main>
      <Footer />
      <InfoBannerPopup />
      <PhoneFloatButton />
      <ZaloFloatButton />
    </div>
  );
};

export default MainLayout;
