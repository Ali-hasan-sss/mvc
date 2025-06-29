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
import useProductStore, { Product } from "@/store/products";
import useSectorStore from "@/store/sectors";
import useCompanyStore from "@/store/companies";
import { useTranslation } from "react-i18next";

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  sectorId?: number; // معرف القطاع المراد تمريره من المكون الأب
  companyId?: number; // معرف الشركة المراد تمريره من المكون الأب
  hideSectorSelect?: boolean; // إخفاء select القطاعات
  hideCompanySelect?: boolean; // إخفاء select الشركات
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onClose,
  sectorId,
  companyId,
  hideSectorSelect = false,
  hideCompanySelect = false,
}) => {
  const { t } = useTranslation();
  const { addProduct, updateProduct, loading } = useProductStore();
  const { sectors, fetchSectors } = useSectorStore();
  const { companies, fetchCompanies } = useCompanyStore();
  const [uploading, setUploading] = useState(false);
  const [imageFileName, setImageFileName] = useState("");

  const [formData, setFormData] = useState({
    title: { ar: "", en: "" },
    description: { ar: "", en: "" },
    sector_id: sectorId || 1,
    company_id: companyId || 1,
    image: "",
  });

  useEffect(() => {
    // تحميل القطاعات والشركات فقط إذا لم يتم إخفاؤها
    if (!hideSectorSelect) {
      fetchSectors();
    }
    if (!hideCompanySelect) {
      fetchCompanies();
    }
  }, [fetchSectors, fetchCompanies, hideSectorSelect, hideCompanySelect]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        sector_id: product.sector_id,
        company_id: product.company_id,
        image: product.image,
      });
      setImageFileName(product.image);
    } else if (sectorId || companyId) {
      // إذا كان هناك معرفات مُمررة، استخدمها
      setFormData((prev) => ({
        ...prev,
        sector_id: sectorId || prev.sector_id,
        company_id: companyId || prev.company_id,
      }));
    }
  }, [product, sectorId, companyId]);

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

    if (!formData.sector_id) {
      alert(t("messages.validation_error"));
      return;
    }

    if (!formData.company_id) {
      alert(t("messages.validation_error"));
      return;
    }

    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await addProduct(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleFileUpload = (data: { fileName: string; fileUrl: string }) => {
    setImageFileName(data.fileName);
    setFormData((prev) => ({ ...prev, image: data.fileName }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {product
          ? t("admin.edit") + " " + t("admin.products").toLowerCase()
          : t("admin.add_new") + " " + t("admin.products").toLowerCase()}
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

        {/* Sector Select */}
        {!hideSectorSelect && (
          <FormControl fullWidth margin="normal" required>
            <InputLabel>{t("forms.sector")}</InputLabel>
            <Select
              value={formData.sector_id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sector_id: Number(e.target.value),
                }))
              }
              label={t("forms.sector")}
            >
              {sectors.map((sector) => (
                <MenuItem key={sector.id} value={sector.id}>
                  {typeof sector.title === "string"
                    ? sector.title
                    : (sector.title as { ar: string; en: string })?.ar || "N/A"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Company Select */}
        {!hideCompanySelect && (
          <FormControl fullWidth margin="normal" required>
            <InputLabel>{t("forms.company")}</InputLabel>
            <Select
              value={formData.company_id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company_id: Number(e.target.value),
                }))
              }
              label={t("forms.company")}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {typeof company.title === "string"
                    ? company.title
                    : (company.title as { ar: string; en: string })?.ar ||
                      "N/A"}
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
          {loading || uploading ? "جاري الحفظ..." : product ? "تحديث" : "إضافة"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
