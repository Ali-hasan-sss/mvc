import { useTranslation } from "react-i18next";

export default function CTA_About() {
  const { t } = useTranslation();
  return (
    <div className="py-3  md:py-20 px-1 md:px-20 w-full bg-white h-full flex flex-col items-center justify-center">
      <p className="text-xl font-bold">{t("about.cta")}</p>
      <button type="button" className="linear_btn_about py-2 px-9 mt-8">
        {t("Contact_us")}
      </button>
    </div>
  );
}
