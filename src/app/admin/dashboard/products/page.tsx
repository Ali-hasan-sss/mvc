"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Table from "@/components/common/table";
import Modal from "@/components/common/modal";
import ProductForm from "@/components/forms/ProductForm";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import useProductStore, { Product } from "@/store/products";
import useSectorStore from "@/store/sectors";
import useCompanyStore from "@/store/companies";

const ProductsPage = () => {
  const { t } = useTranslation();
  const { products, fetchProducts, deleteProduct, loading } = useProductStore();

  const { sectors, fetchSectors } = useSectorStore();
  const { companies, fetchCompanies } = useCompanyStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchSectors();
    fetchCompanies();
  }, [fetchProducts, fetchSectors, fetchCompanies]);

  const handleAdd = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (row: Record<string, unknown>) => {
    const product = products.find((p) => p.id === row.id);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (row: Record<string, unknown>) => {
    const product = products.find((p) => p.id === row.id);
    if (product) {
      setProductToDelete(product);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const columns = [
    { id: "image", label: t("forms.image") },
    { id: "title_ar", label: t("forms.title_ar") },
    { id: "title_en", label: t("forms.title_en") },
    { id: "description_ar", label: t("forms.description_ar") },
    { id: "description_en", label: t("forms.description_en") },
  ];

  const formatTableData = (products: Product[]) => {
    if (!products || products.length === 0) {
      return [];
    }
    return products.map((product) => {
      const sector = sectors.find((s) => s.id === product.sector_id);
      const company = companies.find((c) => c.id === product.company_id);
      return {
        ...product,
        sector_name: sector
          ? `${sector.title?.ar || "N/A"} / ${sector.title?.en || "N/A"}`
          : t("admin.no_data"),
        company_name: company
          ? `${company.title?.ar || "N/A"} / ${company.title?.en || "N/A"}`
          : t("admin.no_data"),
      };
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("admin.products")}
        </Typography>

        <Table
          title={t("admin.products")}
          columns={columns}
          data={formatTableData(products)}
          xloading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <Modal
            title={
              selectedProduct
                ? t("admin.edit") + " " + t("admin.products").toLowerCase()
                : t("admin.add_new") + " " + t("admin.products").toLowerCase()
            }
            onClose={handleCloseModal}
            content={
              <ProductForm
                product={selectedProduct}
                onClose={handleCloseModal}
                hideSectorSelect={false}
                hideCompanySelect={false}
              />
            }
            size="lg"
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t("confirm.delete_product")}
          message={`${t("confirm.delete_product")} "${
            productToDelete?.title?.ar
          }"?`}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

export default ProductsPage;
