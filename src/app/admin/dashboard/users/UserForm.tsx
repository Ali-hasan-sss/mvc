import React from "react";
import { useTranslation } from "react-i18next";
import FileUploader from "@/components/common/FileUploader";

interface UserFormProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    description: { ar: string; en: string };
    about_us: { ar: string; en: string };
    image: string;
    is_shown: 0 | 1;
    address: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  submitting: boolean;
  isUploading: boolean;
  imageFileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (field: string, value: any) => void;
  onImageUpload: (fileName: string, fileUrl: string) => void;
  onUploadingChange: (isUploading: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isNew: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  formData,
  errors,
  submitting,
  isUploading,
  imageFileName,
  onChange,
  onImageUpload,
  onUploadingChange,
  onSubmit,
  isNew,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("forms.first_name")}
          </label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
            disabled={submitting}
          />
          {errors.first_name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.first_name}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("forms.last_name")}
          </label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
            disabled={submitting}
          />
          {errors.last_name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.last_name}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("forms.email")}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
            disabled={submitting}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("forms.address")}
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={submitting}
          />
          {errors.address && (
            <span className="text-red-500 text-sm mt-1">{errors.address}</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("forms.description_ar")}
          </label>
          <input
            type="text"
            value={formData.description.ar}
            onChange={(e) => onChange("description.ar", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={submitting}
          />
          {errors.description && errors.description.ar && (
            <span className="text-red-500 text-sm mt-1">
              {errors.description.ar}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("forms.description_en")}
          </label>
          <input
            type="text"
            value={formData.description.en}
            onChange={(e) => onChange("description.en", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={submitting}
          />
          {errors.description && errors.description.en && (
            <span className="text-red-500 text-sm mt-1">
              {errors.description.en}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            About Us (AR)
          </label>
          <textarea
            value={formData.about_us.ar}
            onChange={(e) => onChange("about_us.ar", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            rows={4}
            disabled={submitting}
          />
          {errors.about_us && errors.about_us.ar && (
            <span className="text-red-500 text-sm mt-1">
              {errors.about_us.ar}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            About Us (EN)
          </label>
          <textarea
            value={formData.about_us.en}
            onChange={(e) => onChange("about_us.en", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            rows={4}
            disabled={submitting}
          />
          {errors.about_us && errors.about_us.en && (
            <span className="text-red-500 text-sm mt-1">
              {errors.about_us.en}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {t("forms.image")}
        </label>
        <FileUploader
          onUpload={({ fileName, fileUrl }) => onImageUpload(fileName, fileUrl)}
          onUploadingChange={onUploadingChange}
        />
        {imageFileName && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-700 text-sm font-medium">
              ✓ {t("messages.data_saved")}: {imageFileName}
            </span>
          </div>
        )}
        {errors.image && (
          <span className="text-red-500 text-sm mt-1">{errors.image}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Is Shown
        </label>
        <select
          value={formData.is_shown}
          onChange={(e) => onChange("is_shown", Number(e.target.value))}
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          disabled={submitting}
        >
          <option value={0}>Not Shown (سيظهر رسالة: الحساب قيد الإعداد)</option>
          <option value={1}>Shown (سيظهر على الموقع)</option>
        </select>
        {errors.is_shown && (
          <span className="text-red-500 text-sm mt-1">{errors.is_shown}</span>
        )}
      </div>
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          disabled={submitting || isUploading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {submitting ? (
            <>
              <span className="loader-btn" />
              {isNew ? "Adding..." : "Saving..."}
            </>
          ) : isNew ? (
            "Add User"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
