import { Route, Routes } from "react-router-dom";
import { ROUTER_PATH } from "./Route";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/SignUp";
import MainLayout from "@/pages/MainLayout";
import MainPage from "@/pages/home/pages";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/about";

export const WebRouter = () => (
  <Routes>
    <Route path={ROUTER_PATH.LOGIN} element={<LoginPage />} />
    <Route path={ROUTER_PATH.SIGNIN} element={<RegisterPage />} />

    <Route element={<MainLayout />}>
      <Route path={ROUTER_PATH.MAIN_PAGE} element={<MainPage />} />
      <Route path={ROUTER_PATH.ABOUT_PAGE} element={<AboutPage />} />
    </Route>

    <Route path={ROUTER_PATH.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
);
