import { useTranslation } from "react-i18next";

export default function CTA() {
  const { t } = useTranslation();
  return (
    <div className="py-10 px-2 md:px-20">
      <div className="cta py-5 px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="font-bold text-[18px] text-white">
          🎯 {t("home.Cta_q")}
          <br /> {t("home.Cta_join")}
        </p>
        <button
          type="button"
          className="bg-white hover:bg-gray-300 py-2 px-4 rounded-xl md:w-1/4 cursor-pointer"
        >
          {t("Contact_us")}
        </button>
      </div>
    </div>
  );
}
