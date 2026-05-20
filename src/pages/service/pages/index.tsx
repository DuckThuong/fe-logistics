import { Outlet } from "react-router-dom";
import "./style.scss";

export const ServiceLayout = () => {
  return (
    <div className="service-layout">
      <Outlet />
    </div>
  );
};
