import { useLocation } from "react-router-dom";
import { ServiceDetailPage } from "../../components/ServiceDetailPage";

export const ServiceDetail = () => {
  const location = useLocation();
  const serviceId = location.state?.serviceId;

  return (
    <div className="service-detail-page">
      <ServiceDetailPage id={serviceId} title="Dịch vụ vận tải" sections={[]} />
    </div>
  );
};
