import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

function clearAuthCookies() {
  Cookies.remove("token");
  Cookies.remove("nickname");
  Cookies.remove("exp");
}

function isTokenExpired() {
  const exp = Number(Cookies.get("exp"));
  if (!exp) return false;
  return Date.now() > exp * 1000;
}

function isJwtLike(token) {

  const parts = String(token).split(".");
  return parts.length === 3 && parts.every(Boolean);
}

export default function ProtectedRoute() {
  const token = Cookies.get("token");


  if (!token || !isJwtLike(token)) {
    clearAuthCookies();
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired()) {
    clearAuthCookies();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}