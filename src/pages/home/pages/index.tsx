import { HeroSection } from "./HeroSection/HeroSection";
import PlatformsSection from "./PlatformsSection/PlatformsSection";
import HowToOrderSection from "./HowToOrderSection/HowToOrderSection";
import DashboardSection from "./DashboardSection/DashboardSection";
import ServicesSection from "./ServicesSection/ServicesSection";
import WhyChooseSection from "./WhyChooseSection/WhyChooseSection";
import StatsSection from "./StatsSection/StatsSection";
import CTASection from "./CTASection/CTASection";

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <PlatformsSection />
      <HowToOrderSection />
      <DashboardSection />
      <ServicesSection />
      <WhyChooseSection />
      <StatsSection />
      <CTASection />
    </>
  );
};

export default MainPage;
