import { Outlet } from "react-router-dom";
import "./style.scss";
import { PriceDetailPage } from "../components/PriceDetailPage";

export const PriceLayout = () => (
  <div className="price-layout">
    <PriceDetailPage />
  </div>
);
