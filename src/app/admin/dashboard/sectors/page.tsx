"use client";
import Modal from "@/components/common/modal";
import Table from "@/components/common/table";
import useSectorStore from "@/store/sectors";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FileUploader from "@/components/common/FileUploader";
import { CircularProgress } from "@mui/material";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";

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

export default function Sectors() {
  const { t } = useTranslation();
  const {
    sectors,
    fetchSectors,
    addSector,
    updateSector,
    deleteSector,
    loading,
  } = useSectorStore();

  const columns = [
    { id: "image", label: t("forms.image") },
    { id: "title_ar", label: t("forms.title_ar") },
    { id: "title_en", label: t("forms.title_en") },
    { id: "description_ar", label: t("forms.description_ar") },
    { id: "description_en", label: t("forms.description_en") },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [actionId, setActionId] = useState(0);
  const [isNew, setIsNew] = useState(true);
  const [formData, setFormData] = useState<{
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    image: string;
  }>({
    title: { ar: "", en: "" },
    description: { ar: "", en: "" },
    image: "",
  });

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    image: string;
  } | null>(null);
  const [errors, setErrors] = useState<{
    [key: string]: {
      [lang: string]: string;
    };
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [imageFileName, setImageFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

  const handleOpenAdd = () => {
    setFormData({
      title: { ar: "", en: "" },
      description: { ar: "", en: "" },
      image: "",
    });
    setImageFileName("");
    setErrors({});
    setIsNew(true);
    setSelectedItem(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (item: Record<string, unknown>) => {
    setFormData({
      title: item.title as { ar: string; en: string },
      description: item.description as { ar: string; en: string },
      image: "",
    });

    setImageFileName((item.image as string) || "");
    setIsNew(false);
    setSelectedItem(
      item as {
        id: number;
        title: { ar: string; en: string };
        description: { ar: string; en: string };
        image: string;
      }
    );
    setOpenModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "title",
        JSON.stringify({
          ar: formData.title.ar,
          en: formData.title.en,
        })
      );
      formDataToSend.append(
        "description",
        JSON.stringify({
          ar: formData.description.ar,
          en: formData.description.en,
        })
      );
      if (imageFileName) {
        formDataToSend.append("image", imageFileName);
      }

      if (isNew) {
        await addSector(formDataToSend);
      } else {
        if (selectedItem) {
          await updateSector(selectedItem.id, formDataToSend);
        }
      }

      setOpenModal(false);
      fetchSectors();
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: { errors?: Record<string, { [lang: string]: string }> };
        };
      };
      setErrors(error?.response?.data?.errors || {});
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await deleteSector(actionId);
      fetchSectors();
      setOpenDeleteModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (item: Record<string, unknown>) => {
    alert(
      `Sector Details:\n\nTitle (Arabic): ${
        (item.title as { ar?: string })?.ar || "N/A"
      }\nTitle (English): ${
        (item.title as { en?: string })?.en || "N/A"
      }\n\nDescription (Arabic): ${
        (item.description as { ar?: string })?.ar || "N/A"
      }\nDescription (English): ${
        (item.description as { en?: string })?.en || "N/A"
      }`
    );
  };

  return (
    <div className="py-4 px-5">
      <Table
        title={t("admin.sectors")}
        onAdd={handleOpenAdd}
        onDelete={(item) => {
          setOpenDeleteModal(true);
          setActionId(item.id);
        }}
        onEdit={handleOpenEdit}
        onView={handleView}
        columns={columns}
        data={sectors}
        xloading={loading}
      />

      {/* Modal Form */}
      {openModal && (
        <>
          <style>{loaderStyle}</style>
          <Modal
            title={
              isNew
                ? t("admin.add_new") + " " + t("admin.sectors").toLowerCase()
                : t("admin.edit") + " " + t("admin.sectors").toLowerCase()
            }
            onClose={() => setOpenModal(false)}
            size="xl"
            content={
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title and Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Title AR */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {t("forms.title_ar")}
                    </label>
                    <input
                      type="text"
                      value={formData.title.ar}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, ar: e.target.value },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                      placeholder="أدخل العنوان بالعربية"
                      required
                      disabled={submitting}
                    />
                    {errors.title?.ar && (
                      <span className="text-red-500 text-sm">
                        {errors.title.ar}
                      </span>
                    )}
                  </div>

                  {/* Title EN */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {t("Title")} - English
                    </label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, en: e.target.value },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter title in English"
                      required
                      disabled={submitting}
                    />
                    {errors.title?.en && (
                      <span className="text-red-500 text-sm">
                        {errors.title.en}
                      </span>
                    )}
                  </div>

                  {/* Description AR */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {t("Description")} - العربية
                    </label>
                    <textarea
                      value={formData.description.ar}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            ar: e.target.value,
                          },
                        })
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="أدخل الوصف بالعربية"
                      disabled={submitting}
                    />
                    {errors.description?.ar && (
                      <span className="text-red-500 text-sm">
                        {errors.description.ar}
                      </span>
                    )}
                  </div>

                  {/* Description EN */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {t("Description")} - English
                    </label>
                    <textarea
                      value={formData.description.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            en: e.target.value,
                          },
                        })
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Enter description in English"
                      disabled={submitting}
                    />
                    {errors.description?.en && (
                      <span className="text-red-500 text-sm">
                        {errors.description.en}
                      </span>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t("Upload Image")}
                  </label>
                  <FileUploader
                    onUpload={({ fileName }) => {
                      setImageFileName(fileName);
                    }}
                    onUploadingChange={setIsUploading}
                  />
                  {imageFileName && (
                    <div className="mt-2 text-green-700 text-sm">
                      ✓ {t("Uploaded")}: {imageFileName}
                    </div>
                  )}
                  {errors.image && (
                    <span className="text-red-500 text-sm">
                      {typeof errors.image === "string"
                        ? errors.image
                        : errors.image.ar || errors.image.en || "Error"}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="submit"
                    disabled={submitting || isUploading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <CircularProgress size={20} color="inherit" />
                        {t("Processing...")}
                      </>
                    ) : isNew ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        {t("Add")}
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {t("Save")}
                      </>
                    )}
                  </button>
                </div>
              </form>
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
        message={t("Are you sure you want to delete this sector?")}
        confirmText={t("Yes, Delete")}
        cancelText={t("Cancel")}
        loading={submitting}
        loadingText={t("Deleting...")}
      />
    </div>
  );
}
