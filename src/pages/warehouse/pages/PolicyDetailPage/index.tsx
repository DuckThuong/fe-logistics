import { useLocation } from "react-router-dom";
import { PolicyDetailPage } from "../../components/PolicyDetailPage";

export const PolicyDetail = () => {
  const location = useLocation();
  const policyId = location.state?.policyId as number | undefined;

  return (
    <div className="warehouse-detail-page">
      <PolicyDetailPage id={policyId} />
    </div>
  );
};
