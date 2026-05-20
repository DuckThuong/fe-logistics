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
    </Route>

    <Route path={ROUTER_PATH.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
);
