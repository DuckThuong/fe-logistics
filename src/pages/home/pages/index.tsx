import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import '../../../global.scss';
import { HeroSection } from './HeroSection/HeroSection';
import PlatformsSection from './PlatformsSection/PlatformsSection';
import HowToOrderSection from './HowToOrderSection/HowToOrderSection';
import DashboardSection from './DashboardSection/DashboardSection';
import ServicesSection from './ServicesSection/ServicesSection';
import WhyChooseSection from './WhyChooseSection/WhyChooseSection';
import StatsSection from './StatsSection/StatsSection';
import CTASection from './CTASection/CTASection';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainPage = () => {
  return (
      <div className="app">
        <Header />
        <main>
          <HeroSection />
          <PlatformsSection />
          <HowToOrderSection />
          <DashboardSection />
          <ServicesSection />
          <WhyChooseSection />
          <StatsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
  );
};

export default MainPage;
