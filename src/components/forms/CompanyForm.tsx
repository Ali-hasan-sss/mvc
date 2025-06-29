import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import FileUploader from "@/components/common/FileUploader";
import useCompanyStore, { Company } from "@/store/companies";
import useUserStore from "@/store/users";
import { useTranslation } from "react-i18next";

interface CompanyFormProps {
  company?: Company;
  onClose: () => void;
  userId?: number;
  hideUserSelect?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onClose,
  userId,
  hideUserSelect = false,
}) => {
  const { t } = useTranslation();
  const { addCompany, updateCompany, loading } = useCompanyStore();
  const { users, fetchUsers } = useUserStore();
  const [uploading, setUploading] = useState(false);
  const [imageFileName, setImageFileName] = useState("");

  const [formData, setFormData] = useState({
    title: { ar: "", en: "" },
    description: { ar: "", en: "" },
    user_id: userId || 1,
    image: "",
  });

  useEffect(() => {
    if (!hideUserSelect) {
      fetchUsers();
    }
  }, [fetchUsers, hideUserSelect]);

  useEffect(() => {
    if (company) {
      setFormData({
        title: company.title,
        description: company.description,
        user_id: company.user_id,
        image: company.image,
      });
      setImageFileName(company.image);
    } else if (userId) {
      setFormData((prev) => ({
        ...prev,
        user_id: userId,
      }));
    }
  }, [company, userId]);

  const handleInputChange = (
    field: "title" | "description",
    lang: "ar" | "en",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.ar || !formData.title.en) {
      alert(t("messages.validation_error"));
      return;
    }

    if (!formData.user_id) {
      alert(t("messages.validation_error"));
      return;
    }

    try {
      if (company) {
        await updateCompany(company.id, formData);
      } else {
        await addCompany(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  const handleFileUpload = (data: { fileName: string; fileUrl: string }) => {
    setImageFileName(data.fileName);
    setFormData((prev) => ({ ...prev, image: data.fileName }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {company
          ? t("admin.edit") + " " + t("admin.companies").toLowerCase()
          : t("admin.add_new") + " " + t("admin.companies").toLowerCase()}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title - Arabic */}
        <TextField
          fullWidth
          label={t("forms.title_ar")}
          value={formData.title.ar}
          onChange={(e) => handleInputChange("title", "ar", e.target.value)}
          required
          margin="normal"
          dir="rtl"
        />

        {/* Title - English */}
        <TextField
          fullWidth
          label={t("forms.title_en")}
          value={formData.title.en}
          onChange={(e) => handleInputChange("title", "en", e.target.value)}
          required
          margin="normal"
          dir="ltr"
        />

        {/* Description - Arabic */}
        <TextField
          fullWidth
          label={t("forms.description_ar")}
          value={formData.description.ar}
          onChange={(e) =>
            handleInputChange("description", "ar", e.target.value)
          }
          multiline
          rows={4}
          margin="normal"
          dir="rtl"
        />

        {/* Description - English */}
        <TextField
          fullWidth
          label={t("forms.description_en")}
          value={formData.description.en}
          onChange={(e) =>
            handleInputChange("description", "en", e.target.value)
          }
          multiline
          rows={4}
          margin="normal"
          dir="ltr"
        />

        {/* User Select */}
        {!hideUserSelect && (
          <FormControl fullWidth margin="normal" required>
            <InputLabel>{t("forms.user")}</InputLabel>
            <Select
              value={formData.user_id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  user_id: Number(e.target.value),
                }))
              }
              label={t("forms.user")}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Image Upload */}
        <div>
          <Typography variant="subtitle2" gutterBottom>
            {t("forms.image")}
          </Typography>
          <FileUploader
            onUpload={handleFileUpload}
            onUploadingChange={setUploading}
            initialFileName={imageFileName}
          />
        </div>
      </div>

      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          disabled={loading || uploading}
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading || uploading}
          sx={{ bgcolor: "red.700", "&:hover": { bgcolor: "red.600" } }}
        >
          {loading || uploading ? "جاري الحفظ..." : company ? "تحديث" : "إضافة"}
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyForm;
