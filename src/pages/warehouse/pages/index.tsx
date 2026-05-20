import { Outlet } from 'react-router-dom';
import './style.scss';

export const WarehouseLayout = () => {
  return (
    <div className="warehouse-layout">
      <Outlet />
    </div>
  );
};