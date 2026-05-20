import { PAYMENT_PAGE_SECTIONS } from "../../data/content";
import { ServiceDetailPage } from "../../components/ServiceDetailPage";

export const PaymentPage = () => (
  <ServiceDetailPage title="Thanh toán hộ" sections={PAYMENT_PAGE_SECTIONS} />
);
