import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ENDPOINTS } from "@/utils/endpoints";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const LoginPage = React.lazy(() => import("../screen/login"));
const RegisterPage = React.lazy(() => import("../screen/signup"));
const HomePage = React.lazy(() => import("../screen/home"));
function Router() {
  const { HOME, LOGIN, REGISTER } = ENDPOINTS;
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={LOGIN} element={<LoginPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
