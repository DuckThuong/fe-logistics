import { SHIPPING_PAGE_SECTIONS } from "../../data/content";
import { ServiceDetailPage } from "../../components/ServiceDetailPage";

export const ShippingPage = () => (
  <ServiceDetailPage title="Vận chuyển hộ" sections={SHIPPING_PAGE_SECTIONS} />
);
