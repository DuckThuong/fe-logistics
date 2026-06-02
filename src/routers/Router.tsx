import { Route, Routes } from "react-router-dom";
import { ROUTER_NAME, ROUTER_PATH } from "./Route";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/SignUp";
import MainLayout from "@/pages/MainLayout";
import MainPage from "@/pages/home/pages";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/about";
import { ServiceLayout } from "@/pages/service/pages";
import { ServiceHub } from "@/pages/service/pages/ServiceHub";
import { PriceLayout } from "@/pages/price/pages";
import { WarehouseLayout } from "@/pages/warehouse/pages";
import { PolicyDetail } from "@/pages/warehouse/pages/PolicyDetailPage";
import { TaticLayout } from "@/pages/tatic/pages";
import { TaticHub } from "@/pages/tatic/pages/TaticHub";
import { TaoDonGuidePage } from "@/pages/tatic/pages/TaoDonGuidePage";
import { NapTienGuidePage } from "@/pages/tatic/pages/NapTienGuidePage";
import { ShipNoiDiaGuidePage } from "@/pages/tatic/pages/ShipNoiDiaGuidePage";
import { OrderTaobaoGuidePage } from "@/pages/tatic/pages/OrderTaobaoGuidePage";
import { TaoTaiKhoanGuidePage } from "@/pages/tatic/pages/TaoTaiKhoanGuidePage";
import { NewLayout } from "@/pages/new/pages";
import { NewHub } from "@/pages/new/pages/NewHub";
import { NewsDetail } from "@/pages/new/pages/NewsDetailPage";
import { ServiceDetail } from "@/pages/service/pages/ServiceDetailPage";
import { PolicyHub } from "@/pages/warehouse/pages/PolicyHub";

export const WebRouter = () => (
  <Routes>
    <Route path={ROUTER_PATH.LOGIN} element={<LoginPage />} />
    <Route path={ROUTER_PATH.SIGNIN} element={<RegisterPage />} />

    <Route element={<MainLayout />}>
      <Route path={ROUTER_PATH.MAIN_PAGE} element={<MainPage />} />
      <Route path={ROUTER_PATH.ABOUT_PAGE} element={<AboutPage />} />
      <Route path={ROUTER_PATH.SERVICE} element={<ServiceLayout />}>
        <Route index element={<ServiceHub />} />
        <Route path={ROUTER_NAME.SERVICE_DETAIL} element={<ServiceDetail />} />
      </Route>
      <Route path={ROUTER_PATH.PRICE} element={<PriceLayout />}></Route>
      <Route path={ROUTER_PATH.POLICY} element={<WarehouseLayout />}>
        <Route index element={<PolicyHub />} />
        <Route path={ROUTER_NAME.POLICY_DETAIL} element={<PolicyDetail />} />
      </Route>
      <Route path={ROUTER_PATH.HUONG_DAN} element={<TaticLayout />}>
        <Route index element={<TaticHub />} />
        <Route
          path={ROUTER_NAME.HUONG_DAN_TAO_DON}
          element={<TaoDonGuidePage />}
        />
        <Route
          path={ROUTER_NAME.HUONG_DAN_NAP_TIEN}
          element={<NapTienGuidePage />}
        />
        <Route
          path={ROUTER_NAME.HUONG_DAN_SHIP_NOI_DIA}
          element={<ShipNoiDiaGuidePage />}
        />
        <Route
          path={ROUTER_NAME.HUONG_DAN_ORDER_TAOBAO}
          element={<OrderTaobaoGuidePage />}
        />
        <Route
          path={ROUTER_NAME.HUONG_DAN_TAO_TAI_KHOAN}
          element={<TaoTaiKhoanGuidePage />}
        />
      </Route>
      <Route path={ROUTER_PATH.TIN_TUC} element={<NewLayout />}>
        <Route index element={<NewHub />} />
        <Route path={ROUTER_NAME.NEWS_DETAIL} element={<NewsDetail />} />
      </Route>
    </Route>

    <Route path={ROUTER_PATH.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
);
