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
import { OrderPage } from "@/pages/service/pages/OrderPage";
import { PaymentPage } from "@/pages/service/pages/PaymentPage";
import { ShippingPage } from "@/pages/service/pages/ShippingPage";
import { OrderPricePage } from "@/pages/price/pages/OrderPricePage";
import { KyGuiPricePage } from "@/pages/price/pages/KyGuiPricePage";
import { ChinhNgachPricePage } from "@/pages/price/pages/ChinhNgachPricePage";
import { PriceHub } from "@/pages/price/pages/PriceHub";
import { PriceLayout } from "@/pages/price/pages";
import { WarehouseLayout } from "@/pages/warehouse/pages";
import { WarehouseHub } from "@/pages/warehouse/pages/WarehouseHub";
import { StorageWarehousePage } from "@/pages/warehouse/pages/StorageWarehousePage";
import { OutboundWarehousePage } from "@/pages/warehouse/pages/OutboundWarehousePage";
import { ProhibitedPolicyPage } from "@/pages/warehouse/pages/ProhibitedPolicyPage";
import { TaticLayout } from "@/pages/tatic/pages";
import { TaticHub } from "@/pages/tatic/pages/TaticHub";
import { TaoDonGuidePage } from "@/pages/tatic/pages/TaoDonGuidePage";
import { NapTienGuidePage } from "@/pages/tatic/pages/NapTienGuidePage";
import { ShipNoiDiaGuidePage } from "@/pages/tatic/pages/ShipNoiDiaGuidePage";
import { OrderTaobaoGuidePage } from "@/pages/tatic/pages/OrderTaobaoGuidePage";
import { TaoTaiKhoanGuidePage } from "@/pages/tatic/pages/TaoTaiKhoanGuidePage";
import { NewLayout } from "@/pages/new/pages";
import { NewHub } from "@/pages/new/pages/NewHub";
import { BangGiaNewsPage } from "@/pages/new/pages/BangGiaNewsPage";
import { TimNguonNewsPage } from "@/pages/new/pages/TimNguonNewsPage";
import { SaleTmalNewsPage } from "@/pages/new/pages/SaleTmalNewsPage";
import { SanMyPhamNewsPage } from "@/pages/new/pages/SanMyPhamNewsPage";

export const WebRouter = () => (
  <Routes>
    <Route path={ROUTER_PATH.LOGIN} element={<LoginPage />} />
    <Route path={ROUTER_PATH.SIGNIN} element={<RegisterPage />} />

    <Route element={<MainLayout />}>
      <Route path={ROUTER_PATH.MAIN_PAGE} element={<MainPage />} />
      <Route path={ROUTER_PATH.ABOUT_PAGE} element={<AboutPage />} />
      <Route path={ROUTER_PATH.SERVICE} element={<ServiceLayout />}>
        <Route index element={<ServiceHub />} />
        <Route path={ROUTER_NAME.SERVICE_ORDER} element={<OrderPage />} />
        <Route path={ROUTER_NAME.SERVICE_PAYMENT} element={<PaymentPage />} />
        <Route path={ROUTER_NAME.SERVICE_SHIPPING} element={<ShippingPage />} />
      </Route>
      <Route path={ROUTER_PATH.PRICE} element={<PriceLayout />}>
        <Route index element={<PriceHub />} />
        <Route path={ROUTER_NAME.PRICE_ORDER} element={<OrderPricePage />} />
        <Route path={ROUTER_NAME.PRICE_KY_GUI} element={<KyGuiPricePage />} />
        <Route path={ROUTER_NAME.PRICE_CHINH_NGACH} element={<ChinhNgachPricePage />} />
      </Route>
      <Route path={ROUTER_PATH.POLICY} element={<WarehouseLayout />}>
        <Route index element={<WarehouseHub />} />
        <Route path={ROUTER_NAME.POLICY_KHIEN_NAI} element={<StorageWarehousePage />} />
        <Route path={ROUTER_NAME.POLICY_BAO_MAT} element={<OutboundWarehousePage />} />
        <Route path={ROUTER_NAME.POLICY_CAM_NHAP_KHAU} element={<ProhibitedPolicyPage />} />
      </Route>
      <Route path={ROUTER_PATH.HUONG_DAN} element={<TaticLayout />}>
        <Route index element={<TaticHub />} />
        <Route path={ROUTER_NAME.HUONG_DAN_TAO_DON} element={<TaoDonGuidePage />} />
        <Route path={ROUTER_NAME.HUONG_DAN_NAP_TIEN} element={<NapTienGuidePage />} />
        <Route path={ROUTER_NAME.HUONG_DAN_SHIP_NOI_DIA} element={<ShipNoiDiaGuidePage />} />
        <Route path={ROUTER_NAME.HUONG_DAN_ORDER_TAOBAO} element={<OrderTaobaoGuidePage />} />
        <Route path={ROUTER_NAME.HUONG_DAN_TAO_TAI_KHOAN} element={<TaoTaiKhoanGuidePage />} />
      </Route>
      <Route path={ROUTER_PATH.TIN_TUC} element={<NewLayout />}>
        <Route index element={<NewHub />} />
        <Route path={ROUTER_NAME.TIN_TUC_BANG_GIA} element={<BangGiaNewsPage />} />
        <Route path={ROUTER_NAME.TIN_TUC_TIM_NGUON} element={<TimNguonNewsPage />} />
        <Route path={ROUTER_NAME.TIN_TUC_SALE_TMAL} element={<SaleTmalNewsPage />} />
        <Route path={ROUTER_NAME.TIN_TUC_SAN_MY_PHAM} element={<SanMyPhamNewsPage />} />
      </Route>
    </Route>

    <Route path={ROUTER_PATH.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
);
