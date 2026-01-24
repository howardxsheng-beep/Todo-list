import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "https://todolist-api.hexschool.io";
export const api = axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type':"application/json"},
});

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

export const getApiError = (err)=>{
    return err?.response?.data?.message|| err?.message || "發生錯誤";
}