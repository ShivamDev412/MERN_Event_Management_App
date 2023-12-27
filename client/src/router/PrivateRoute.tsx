import {ENDPOINTS} from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "../wrappers/MainWrapper";
import useAuth from "../utils/auth";
import Cookies from "js-cookie";
function PrivateRoute() {
  const auth = useAuth();
  console.log(Cookies.get("auth-token"))
  return auth ? (
    <MainWrapper>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </MainWrapper>
  ) : (
    <Navigate to={ENDPOINTS.LOGIN} />
  );
}

export default PrivateRoute;
