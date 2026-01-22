import axios from 'axios';
const BASE_URL = "https://todolist-api.hexschool.io"
export const api = axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type':"application/json"},
});

export const getApiError = (err)=>{
    return err?.response?.data?.message|| err?.message || "發生錯誤";
}