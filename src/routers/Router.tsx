import { Route, Routes } from "react-router-dom";
import { ROUTER_PATH } from "./Route";
import LoginPage from "@/pages/auth/Login";

export const WebRouter = () => (
  <Routes>
    <Route path={ROUTER_PATH.LOGIN} element={<LoginPage />} />
  </Routes>
);
