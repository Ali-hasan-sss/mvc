"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import axiosInstance from "@/utils/axios";
import { CircularProgress } from "@mui/material";
import useAuthStore from "@/store/auth";

// سبينر صغير للأزرار
const loaderStyle = `
  .loader-btn {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #333;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-block;
    animation: spin 1s linear infinite;
    vertical-align: middle;
    margin-left: 6px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }
`;

const ButtonSpinner = () => (
  <CircularProgress size={16} sx={{ color: "white", mr: 1 }} />
);

export default function Settings() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  const [localLoading, setLocalLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Profile Form Data
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // Password Form Data
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Form Errors
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>(
    {}
  );
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      // Split the user name into first and last name
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setProfileData({
        first_name: firstName,
        last_name: lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    setProfileErrors({});

    try {
      await axiosInstance.post("admin/profile", profileData);
      setSuccessMessage(t("settings.profile_updated"));
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { errors?: Record<string, string> } };
      };
      if (error.response?.data?.errors) {
        setProfileErrors(error.response.data.errors);
      } else {
        setErrorMessage(t("settings.profile_update_error"));
      }
    } finally {
      setLocalLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    setPasswordErrors({});

    // Validate password length
    if (passwordData.new_password.length < 8) {
      setPasswordErrors({ new_password: t("settings.password_too_short") });
      setLocalLoading(false);
      return;
    }

    // Validate password confirmation
    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordErrors({ confirm_password: t("settings.password_not_match") });
      setLocalLoading(false);
      return;
    }

    try {
      await axiosInstance.post("admin/password", {
        old_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      setSuccessMessage(t("settings.password_updated"));
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { errors?: Record<string, string> } };
      };
      if (error.response?.data?.errors) {
        setPasswordErrors(error.response.data.errors);
      } else {
        setErrorMessage(t("settings.password_update_error"));
      }
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <style>{loaderStyle}</style>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          {t("admin.settings")}
        </Typography>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-700 text-sm font-medium">
              ✓ {successMessage}
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-700 text-sm font-medium">
              ✗ {errorMessage}
            </span>
          </div>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              "& .MuiTab-root": {
                fontWeight: "bold",
                fontSize: "1rem",
              },
            }}
          >
            <Tab label={t("settings.profile_tab")} />
            <Tab label={t("settings.password_tab")} />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        {activeTab === 0 && (
          <Card sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "#1976d2", fontWeight: "bold" }}
              >
                {t("settings.profile_tab")}
              </Typography>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {t("settings.first_name")}
                    </label>
                    <input
                      type="text"
                      value={profileData.first_name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          first_name: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                      disabled={localLoading}
                    />
                    {profileErrors.first_name && (
                      <span className="text-red-500 text-sm mt-1">
                        {profileErrors.first_name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {t("settings.last_name")}
                    </label>
                    <input
                      type="text"
                      value={profileData.last_name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          last_name: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                      disabled={localLoading}
                    />
                    {profileErrors.last_name && (
                      <span className="text-red-500 text-sm mt-1">
                        {profileErrors.last_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {t("settings.email")}
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                    disabled={localLoading}
                  />
                  {profileErrors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {profileErrors.email}
                    </span>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="submit"
                    disabled={localLoading}
                    className="bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {localLoading ? (
                      <>
                        <ButtonSpinner />
                        {t("settings.update_profile")} ...
                      </>
                    ) : (
                      t("settings.update_profile")
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Password Tab */}
        {activeTab === 1 && (
          <Card sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "#1976d2", fontWeight: "bold" }}
              >
                {t("settings.password_tab")}
              </Typography>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {t("settings.old_password")}
                  </label>
                  <input
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current_password: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                    disabled={localLoading}
                  />
                  {passwordErrors.current_password && (
                    <span className="text-red-500 text-sm mt-1">
                      {passwordErrors.current_password}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {t("settings.new_password")}
                    </label>
                    <input
                      type="password"
                      value={passwordData.new_password}
                      onChange={(e) => {
                        const newPassword = e.target.value;
                        setPasswordData({
                          ...passwordData,
                          new_password: newPassword,
                        });

                        // Clear password length error if password is now valid
                        if (
                          newPassword.length >= 8 &&
                          passwordErrors.new_password ===
                            t("settings.password_too_short")
                        ) {
                          setPasswordErrors({
                            ...passwordErrors,
                            new_password: "",
                          });
                        }

                        // Clear confirm password error if passwords now match
                        if (
                          newPassword === passwordData.confirm_password &&
                          passwordErrors.confirm_password ===
                            t("settings.password_not_match")
                        ) {
                          setPasswordErrors({
                            ...passwordErrors,
                            confirm_password: "",
                          });
                        }
                      }}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                      disabled={localLoading}
                    />
                    {passwordErrors.new_password && (
                      <span className="text-red-500 text-sm mt-1">
                        {passwordErrors.new_password}
                      </span>
                    )}
                    {passwordData.new_password.length > 0 &&
                      passwordData.new_password.length < 8 && (
                        <span className="text-orange-500 text-sm mt-1">
                          {t("settings.password_too_short")}
                        </span>
                      )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {t("settings.confirm_password")}
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirm_password}
                      onChange={(e) => {
                        const confirmPassword = e.target.value;
                        setPasswordData({
                          ...passwordData,
                          confirm_password: confirmPassword,
                        });

                        // Clear confirm password error if passwords now match
                        if (
                          confirmPassword === passwordData.new_password &&
                          passwordErrors.confirm_password ===
                            t("settings.password_not_match")
                        ) {
                          setPasswordErrors({
                            ...passwordErrors,
                            confirm_password: "",
                          });
                        }
                      }}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                      disabled={localLoading}
                    />
                    {passwordErrors.confirm_password && (
                      <span className="text-red-500 text-sm mt-1">
                        {passwordErrors.confirm_password}
                      </span>
                    )}
                    {passwordData.confirm_password.length > 0 &&
                      passwordData.new_password !==
                        passwordData.confirm_password && (
                        <span className="text-orange-500 text-sm mt-1">
                          {t("settings.password_not_match")}
                        </span>
                      )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="submit"
                    disabled={localLoading}
                    className="bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {localLoading ? (
                      <>
                        <ButtonSpinner />
                        {t("settings.update_password")} ...
                      </>
                    ) : (
                      t("settings.update_password")
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}
