"use client";
import NavBar from "@/components/NavBar/navBar";
import useAuthStore from "@/store/auth";
import axiosInstance from "@/utils/axios";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { setToken, setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("email", loginData.email);
    formData.append("password", loginData.password);

    try {
      const response = await axiosInstance.post("admin/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const token = response.data.data.access_token;
      const { id, email, name } = response.data.data;
      setToken(token);
      setUser({ id, email, name });
      window.location.replace("/admin/dashboard");
    } catch (error: unknown) {
      console.error(error);
      const err = error as {
        response?: { data?: { errors?: Record<string, string> } };
      };
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-cover bg-center relative">
        {/* Overlay */}
        <div className="w-full pt-20 max-w-md flex flex-col items-center justify-center px-6 py-8 overflow-hidden transition-colors duration-300 min-h-screen mx-auto relative z-10">
          <form
            onSubmit={handleLogin}
            className="w-full flex-1"
            noValidate
            autoComplete="off"
          >
            <>
              {/* البريد/الهاتف */}
              <div className="relative flex flex-col mt-6">
                <h2 className="text-center text-2xl font-bold twxt-gray-600 my-3">
                  {t("admin.dashboard")} {t("login")}
                </h2>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <Mail className="mx-2 text-gray-400 " />
                  </span>
                  <input
                    type="text"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                    className={`block w-full py-3 text-gray-900 bg-white border rounded-lg px-11 ${
                      errors.identifier
                        ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:border-accent focus:ring-accent"
                    } focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300`}
                    placeholder={t("forms.email")}
                    required
                  />
                </div>
                {errors.identifier && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.identifier}
                  </span>
                )}
              </div>

              {/* كلمة المرور */}
              <div className="relative flex flex-col mt-4">
                <div className="relative flex items-center">
                  <span className="absolute">
                    <Lock className="mx-2 text-gray-400" />
                  </span>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className={`block w-full px-10 py-3 text-gray-900 bg-white border rounded-lg ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:border-accent focus:ring-accent"
                    } focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300`}
                    placeholder={t("password")}
                    required
                    minLength={8}
                  />
                </div>
                {errors.password && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.password}
                  </span>
                )}
              </div>
            </>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-700 rounded-lg hover:bg-red-700/80 focus:outline-none focus:ring focus:ring-red-700 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("admin.loading") : t("login")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
