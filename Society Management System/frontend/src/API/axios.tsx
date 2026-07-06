import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5174/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("admin_token") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
