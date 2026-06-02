import { PolicyDetailPage } from "../../components/PolicyDetailPage";
import {
  resolvePolicyChildByUrl,
  resolvePolicyPageById,
  resolvePolicyPageByUrl,
} from "../../data/content";
import { useLocation, useParams } from "react-router-dom";

export const PolicyDetail = () => {
  const location = useLocation();
  const { policyUrl } = useParams<{ policyUrl: string }>();
  const statePolicyId = location.state?.policyId as number | undefined;

  const policyId =
    statePolicyId ??
    resolvePolicyChildByUrl(policyUrl)?.id ??
    resolvePolicyPageByUrl(policyUrl)?.id;

  const staticPage =
    resolvePolicyPageById(policyId) ?? resolvePolicyPageByUrl(policyUrl);

  return (
    <div className="warehouse-detail-page">
      <PolicyDetailPage id={policyId} staticPage={staticPage} />
    </div>
  );
};
