import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://todolist-api.hexschool.io";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function clearAuthCookies() {
  Cookies.remove("token");
  Cookies.remove("nickname");
  Cookies.remove("exp");
}

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const msg = err?.response?.data?.message || "";

    const isAuthError =
      status === 401 ||
      status === 403 ||
      String(msg).includes("JWT") ||
      String(msg).includes("Authorization");

    if (isAuthError) {
      clearAuthCookies();
      window.location.hash = "#/login";
    }

    return Promise.reject(err);
  }
);

export const getApiError = (err) => {
  return err?.response?.data?.message || err?.message || "發生錯誤";
};