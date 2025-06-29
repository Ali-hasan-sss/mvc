"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Table from "@/components/common/table";
import Modal from "@/components/common/modal";
import CompanyForm from "@/components/forms/CompanyForm";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import useCompanyStore, { Company } from "@/store/companies";
import useUserStore from "@/store/users";

const CompaniesPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { companies, loading, fetchCompanies, deleteCompany } =
    useCompanyStore();

  const { users, fetchUsers } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies();
    fetchUsers();
  }, [fetchCompanies, fetchUsers]);

  const handleAdd = () => {
    setSelectedCompany(undefined);
    setIsModalOpen(true);
  };

  const handleView = (row: Record<string, unknown>) => {
    localStorage.setItem("selectedCompanyId", (row.id as number).toString());
    router.push("/admin/dashboard/companies/details");
  };

  const handleEdit = (row: Record<string, unknown>) => {
    const company = companies.find((c) => c.id === row.id);
    if (company) {
      setSelectedCompany(company);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (row: Record<string, unknown>) => {
    const company = companies.find((c) => c.id === row.id);
    if (company) {
      setCompanyToDelete(company);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (companyToDelete) {
      await deleteCompany(companyToDelete.id);
      setIsDeleteModalOpen(false);
      setCompanyToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(undefined);
  };

  const columns = [
    { id: "image", label: t("forms.image") },
    { id: "title_ar", label: t("forms.title_ar") },
    { id: "title_en", label: t("forms.title_en") },
    { id: "description_ar", label: t("forms.description_ar") },
    { id: "description_en", label: t("forms.description_en") },
  ];

  const formatTableData = (companies: Company[]) => {
    if (!companies || companies.length === 0) {
      return [];
    }
    return companies.map((company) => {
      const user = users.find((u) => u.id === company.user_id);
      return {
        ...company,
        user_name: user
          ? `${user.first_name} ${user.last_name}`
          : t("admin.no_data"),
      };
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("admin.companies")}
        </Typography>

        <Table
          title={t("admin.companies")}
          columns={columns}
          data={formatTableData(companies)}
          xloading={loading}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <Modal
            title={
              selectedCompany
                ? t("admin.edit") + " " + t("admin.companies").toLowerCase()
                : t("admin.add_new") + " " + t("admin.companies").toLowerCase()
            }
            onClose={handleCloseModal}
            content={
              <CompanyForm
                company={selectedCompany}
                onClose={handleCloseModal}
                hideUserSelect={false}
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
          title={t("confirm.delete_company")}
          message={`${t("confirm.delete_company")} "${
            companyToDelete?.title?.ar
          }"?`}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

export default CompaniesPage;
