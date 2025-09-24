import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 后端SpringBoot的接口前缀
  timeout: 5000, // 超时 5 秒
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（比如在这里统一带上token）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器（统一错误处理）
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("请求出错:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
