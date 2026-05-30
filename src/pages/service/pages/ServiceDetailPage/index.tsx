import { getServiceContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { ServiceDetailPage } from "../../components/ServiceDetailPage";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export const ServiceDetail = () => {
  const location = useLocation();
  const { serviceUrl } = useParams<{ serviceUrl: string }>();
  const stateServiceId = location.state?.serviceId as number | undefined;

  const { data: serviceList } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_SERIVICE_CONTENT, "resolve-id", serviceUrl],
    queryFn: getServiceContent,
    enabled: !stateServiceId && Boolean(serviceUrl),
    staleTime: 5 * 60 * 1000,
  });

  const serviceId =
    stateServiceId ??
    serviceList?.children?.find((child) => child.url === serviceUrl)?.id;

  return (
    <div className="service-detail-page">
      <ServiceDetailPage id={serviceId} />
    </div>
  );
};
