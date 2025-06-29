"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useUserStore from "@/store/users";
import Table from "@/components/common/table";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import UserForm from "./UserForm";
import Modal from "@/components/common/modal";

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

export default function Users() {
  const { t } = useTranslation();
  const { users, fetchUsers, addUser, updateUser, deleteUser, loading } =
    useUserStore();

  const columns = [
    { id: "image", label: t("forms.image") },
    { id: "first_name", label: t("forms.first_name") },
    { id: "last_name", label: t("forms.last_name") },
    { id: "email", label: t("forms.email") },
    { id: "is_shown", label: t("admin.status") },
    { id: "address", label: t("forms.address") },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [actionId, setActionId] = useState(0);
  const [isNew, setIsNew] = useState(true);
  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    description: { ar: string; en: string };
    about_us: { ar: string; en: string };
    image: string;
    is_shown: 0 | 1;
    address: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    description: { ar: "", en: "" },
    about_us: { ar: "", en: "" },
    image: "",
    is_shown: 0,
    address: "",
  });

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    description: { ar: string; en: string };
    about_us: { ar: string; en: string };
    image: string;
    is_shown: 0 | 1;
    address: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [imageFileName, setImageFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenAdd = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      description: { ar: "", en: "" },
      about_us: { ar: "", en: "" },
      image: "",
      is_shown: 0,
      address: "",
    });
    setImageFileName("");
    setErrors({});
    setIsNew(true);
    setSelectedItem(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (item: Record<string, unknown>) => {
    setFormData({
      first_name: item.first_name as string,
      last_name: item.last_name as string,
      email: item.email as string,
      description: item.description as { ar: string; en: string },
      about_us: item.about_us as { ar: string; en: string },
      image: "",
      is_shown: item.is_shown as number as 0 | 1,
      address: item.address as string,
    });

    setImageFileName((item.image as string) || "");
    setIsNew(false);
    setSelectedItem(
      item as {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        description: { ar: string; en: string };
        about_us: { ar: string; en: string };
        image: string;
        is_shown: 0 | 1;
        address: string;
      }
    );
    setOpenModal(true);
  };

  const handleFormChange = (field: string, value: unknown) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (fileName: string) => {
    setImageFileName(fileName);
    setFormData((prev) => ({ ...prev, image: fileName }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("first_name", formData.first_name);
      form.append("last_name", formData.last_name);
      form.append("email", formData.email);
      form.append("address", formData.address);
      form.append("is_shown", String(formData.is_shown));
      form.append("image", imageFileName);
      form.append("description", JSON.stringify(formData.description));
      form.append("about_us", JSON.stringify(formData.about_us));
      if (isNew) {
        await addUser(form);
      } else {
        if (selectedItem) {
          await updateUser(selectedItem.id, form);
        }
      }
      setOpenModal(false);
      fetchUsers();
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { errors?: Record<string, string> } };
      };
      setErrors(error?.response?.data?.errors || {});
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await deleteUser(actionId);
      fetchUsers();
      setOpenDeleteModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (item: Record<string, unknown>) => {
    // حفظ معرف المستخدم في localStorage
    localStorage.setItem("selectedUserId", (item.id as number).toString());
    // فتح صفحة جديدة
    window.location.replace(`/admin/dashboard/users/details`);
  };

  return (
    <div className="py-4 px-5">
      <Table
        title={t("admin.users")}
        onAdd={handleOpenAdd}
        onDelete={(item) => {
          setOpenDeleteModal(true);
          setActionId(item.id);
        }}
        onEdit={handleOpenEdit}
        onView={handleView}
        columns={columns}
        data={users}
        xloading={loading}
      />

      {/* Modal Form */}
      {openModal && (
        <>
          <style>{loaderStyle}</style>
          <Modal
            title={
              isNew
                ? t("admin.add_new") + " " + t("admin.users").toLowerCase()
                : t("admin.edit") + " " + t("admin.users").toLowerCase()
            }
            onClose={() => setOpenModal(false)}
            size="xl"
            content={
              <UserForm
                formData={formData}
                errors={errors}
                submitting={submitting}
                isUploading={isUploading}
                imageFileName={imageFileName}
                onChange={handleFormChange}
                onImageUpload={handleImageUpload}
                onUploadingChange={setIsUploading}
                onSubmit={handleSubmit}
                isNew={isNew}
              />
            }
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        title={t("Confirm Deletion")}
        message={t("Are you sure you want to delete this user?")}
        confirmText={t("Yes, Delete")}
        cancelText={t("Cancel")}
        loading={submitting}
        loadingText={t("Deleting...")}
      />
    </div>
  );
}
