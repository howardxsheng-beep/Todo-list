import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import AuthedLoginGuard from "../pages/Login/AuthedLoginGuard";

export default function PublicOnlyRoute() {
  const token = Cookies.get("token");
  if (token) return <AuthedLoginGuard seconds={3} />;
  return <Outlet />;
}