// src/api/axiosInstance.ts
import axios from "axios";
import useAuthStore from "../store/auth";
import { useLanguageStore } from "../store/languageStore";

export const DOMAIN = "mvc.smarty.design";

const axiosInstance = axios.create({
  baseURL: `http://${DOMAIN}/api/v1/`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    config.headers = config.headers || {};

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const pathname =
      typeof window !== "undefined"
        ? window.location.pathname.toLowerCase()
        : "";
    if (pathname.includes("/admin/dashboard")) {
      config.headers["lang"] = "not";
      config.headers["accept-language"] = "not";
    } else {
      const { language } = useLanguageStore.getState();
      config.headers["lang"] = language || "ar";
      config.headers["accept-language"] = language || "ar";
    }

    const isFormData = config.data instanceof FormData;
    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
