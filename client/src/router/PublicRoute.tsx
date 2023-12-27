import {ENDPOINTS} from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "../wrappers/MainWrapper";
import useAuth from "../utils/auth";
import Cookies from "js-cookie";


function PublicRoute() {
  const auth = useAuth();
  console.log(auth);
  console.log(Cookies.get("auth-token"))
  return auth ? (
    <Navigate to={ENDPOINTS.HOME} />
  ) : (
    <MainWrapper>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </MainWrapper>
  );
}

export default PublicRoute;
