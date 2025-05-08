import { useState } from "react";
import StarRatingInput from "../inputs/rating";
import { useTranslation } from "react-i18next";

interface reviewForm {
  rate: number | null;
  name: string;
  email: string;
  review: string;
}

interface reviewErrors {
  rate?: string;
  name?: string;
  email?: string;
  review?: string;
}

export default function ReviewForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<reviewForm>({
    rate: 0,
    name: "",
    email: "",
    review: "",
  });

  const [errors, setErrors] = useState<reviewErrors>({});

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: reviewErrors = {};

    if (!formData.rate || formData.rate < 1) {
      newErrors.rate = "errors.rating";
    }
    if (!formData.name.trim()) {
      newErrors.name = "errors.Name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "errors.Email2";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "errors.Email2";
    }
    if (!formData.review.trim()) {
      newErrors.review = "errors.Review";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Review Submitted:", formData);
    // Reset form (optional)
    setFormData({ rate: 0, name: "", email: "", review: "" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-6 px-2 md:px-10 lg:px-20 max-w-[700px] py-5"
    >
      <h2 className="text-xl md:text-3xl text-center font-bold text-gray-800">
        {t("suppliers.Add_Review")}
      </h2>

      <div className="flex flex-col gap-1">
        <StarRatingInput
          onChange={(val) => setFormData({ ...formData, rate: val })}
        />
        {errors.rate && (
          <span className="text-red-500 text-sm">{errors.rate}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-900">{t("Name")}</label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{t(errors.name)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-900">{t("Email")}</label>
        <input
          type="email"
          placeholder="email@Example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{t(errors.email)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-900">
          {t("suppliers.Write_Your_Review")}
        </label>
        <textarea
          rows={4}
          placeholder="Write your feedback here"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.review && (
          <span className="text-red-500 text-sm">{t(errors.review)}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {t("Submit")}
      </button>
    </form>
  );
}
