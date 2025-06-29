"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useCompanyStore from "@/store/companies";
import useUserStore from "@/store/users";
import useProductStore from "@/store/products";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Modal from "@/components/common/modal";
import CompanyForm from "@/components/forms/CompanyForm";
import ProductForm from "@/components/forms/ProductForm";
import { useTranslation } from "react-i18next";

interface Company {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  user_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
}

interface Product {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  company_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

const CompanyDetailsPage = () => {
  const router = useRouter();
  const { fetchCompanyById, deleteCompany } = useCompanyStore();
  const { fetchUserById } = useUserStore();
  const { fetchProductsByCompanyId } = useProductStore();
  const { t } = useTranslation();

  const [company, setCompany] = useState<Company | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<{
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    user_id: number;
    image: string;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<Record<string, string>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUploading, setIsUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFileName, setImageFileName] = useState("");

  useEffect(() => {
    const fetchCompanyData = async () => {
      const companyId = localStorage.getItem("selectedCompanyId");

      if (companyId) {
        const companyData = await fetchCompanyById(parseInt(companyId));
        if (companyData) {
          setCompany(companyData);

          // Fetch company owner
          if (companyData.user_id) {
            const userData = await fetchUserById(companyData.user_id);
            setUser(userData as User);
          }

          // Fetch company products
          const companyProducts = await fetchProductsByCompanyId(
            parseInt(companyId)
          );
          setProducts(companyProducts);
        }
      }
      setLoading(false);
    };

    fetchCompanyData();
  }, [fetchCompanyById, fetchUserById, fetchProductsByCompanyId]);

  const handleBack = () => {
    localStorage.removeItem("selectedCompanyId");
    router.push("/admin/dashboard/companies");
  };

  const handleDelete = async () => {
    if (company) {
      try {
        await deleteCompany(company.id);
        setShowDeleteModal(false);
        handleBack();
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };

  const handleViewUser = (userId: number) => {
    localStorage.setItem("selectedUserId", userId.toString());
    router.push("/admin/dashboard/users/details");
  };

  const handleEditCompany = () => {
    if (company) {
      setFormData({
        title: company.title || { ar: "", en: "" },
        description: company.description || { ar: "", en: "" },
        user_id: company.user_id,
        image: company.image || "",
      });
      setImageFileName(company.image || "");
      setShowEditCompanyModal(true);
    }
  };

  const handleCloseEditCompanyModal = () => {
    setShowEditCompanyModal(false);
    setFormData(null);
    setErrors({});
    setImageFileName("");
    // Refresh company data
    if (company) {
      fetchCompanyById(company.id).then((updatedCompany) => {
        if (updatedCompany) {
          setCompany(updatedCompany);
        }
      });
    }
  };

  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
    // Refresh products data
    if (company) {
      fetchProductsByCompanyId(company.id).then((updatedProducts) => {
        setProducts(updatedProducts);
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography>{t("admin.loading")}</Typography>
        </Box>
      </Container>
    );
  }

  if (!company) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            {t("messages.no_records_found")}
          </Typography>
          <button
            onClick={handleBack}
            className="mt-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            {t("admin.back")}
          </button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              ← Back
            </button>
            <Typography variant="h4" component="h1">
              {t("admin.companies")} {t("admin.details")}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditCompany}
              sx={{
                backgroundColor: "white",
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#1565c0",
                },
              }}
            >
              {t("admin.edit")} {t("admin.companies").toLowerCase()}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddProduct}
              sx={{
                backgroundColor: "#9c27b0",
                "&:hover": {
                  backgroundColor: "#7b1fa2",
                },
              }}
            >
              {t("admin.add_new")} {t("admin.products").toLowerCase()}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowDeleteModal(true)}
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#c62828",
                },
              }}
            >
              {t("admin.delete")} {t("admin.companies").toLowerCase()}
            </Button>
          </Box>
        </Box>

        {/* Company Details Card */}
        <Card sx={{ mb: 4, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Company Image */}
              <div className="md:col-span-1">
                <Box sx={{ textAlign: "center" }}>
                  {company.image ? (
                    <Avatar
                      src={company.image}
                      alt={company.title?.ar || company.title?.en}
                      sx={{
                        width: 150,
                        height: 150,
                        mx: "auto",
                        mb: 2,
                        border: "4px solid #f5f5f5",
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        mx: "auto",
                        mb: 2,
                        bgcolor: "#1976d2",
                        border: "4px solid #f5f5f5",
                        fontSize: "3rem",
                      }}
                    >
                      {company.title?.ar?.[0] || company.title?.en?.[0]}
                    </Avatar>
                  )}
                  <Chip
                    label={`Company #${company.id}`}
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </div>

              {/* Company Information */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Basic Info */}
                  <div className="sm:col-span-2">
                    <Typography
                      variant="h5"
                      sx={{ mb: 2, color: "#1976d2", fontWeight: "bold" }}
                    >
                      {company.title?.ar || company.title?.en}
                    </Typography>
                  </div>

                  <div className="sm:col-span-2">
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Description
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {company.description?.ar ||
                        company.description?.en ||
                        "No description"}
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Company ID
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      #{company.id}
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Created At
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {company.created_at
                        ? new Date(company.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Not specified"}
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Last Updated
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {company.updated_at
                        ? new Date(company.updated_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Not specified"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Owner Section */}
        {user && (
          <Card sx={{ mb: 4, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  Company Owner
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewUser(user.id)}
                  sx={{
                    backgroundColor: "white",
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "#1565c0",
                    },
                  }}
                >
                  View User Details
                </Button>
              </Box>

              <Card
                sx={{
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {user.image ? (
                      <Avatar
                        src={user.image}
                        alt={`${user.first_name} ${user.last_name}`}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          mr: 2,
                          bgcolor: "#1976d2",
                        }}
                      >
                        {user.first_name?.[0]}
                        {user.last_name?.[0]}
                      </Avatar>
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {user.first_name} {user.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}

        {/* Products Section */}
        <Card sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                Products ({products?.length || 0})
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddProduct}
                sx={{
                  backgroundColor: "white",
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#1565c0",
                  },
                }}
              >
                Add Product
              </Button>
            </Box>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product: Product) => (
                  <Card
                    key={product.id}
                    sx={{
                      border: "1px solid #e0e0e0",
                      "&:hover": {
                        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                        transform: "translateY(-2px)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        {product.image ? (
                          <Avatar
                            src={product.image}
                            alt={product.title?.ar || product.title?.en}
                            sx={{ width: 60, height: 60, mr: 2 }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              mr: 2,
                              bgcolor: "#1976d2",
                            }}
                          >
                            {product.title?.ar?.[0] || product.title?.en?.[0]}
                          </Avatar>
                        )}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {product.title?.ar || product.title?.en}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {product.description?.ar ||
                              product.description?.en ||
                              "No description"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="caption" color="textSecondary">
                          Created:{" "}
                          {new Date(product.created_at).toLocaleDateString(
                            "en-US"
                          )}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="textSecondary">
                  No products found
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  This company doesn&apos;t have any products yet.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={t("confirm.delete_company")}
        message={`${t("confirm.delete_company")} "${
          company.title?.ar || company.title?.en
        }"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Edit Company Modal */}
      {showEditCompanyModal && (
        <Modal
          title="تعديل الشركة"
          onClose={handleCloseEditCompanyModal}
          size="lg"
          content={
            <CompanyForm
              company={company}
              onClose={handleCloseEditCompanyModal}
              hideUserSelect={true}
            />
          }
        />
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <Modal
          title="إضافة منتج جديد"
          onClose={handleCloseAddProductModal}
          size="lg"
          content={
            <ProductForm
              onClose={handleCloseAddProductModal}
              companyId={company.id}
              hideCompanySelect={true}
            />
          }
        />
      )}
    </Container>
  );
};

export default CompanyDetailsPage;
