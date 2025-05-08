import { useTranslation } from "react-i18next";

export default function WellCome() {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-1 items-center px-2  py-10 md:px-[60px] justify-center">
      <h2
        className=" font-normal text-3xl tracking-wider "
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        {t("home.Welcome_to")} <span className="primary-color">MVC</span>{" "}
      </h2>
      <p className="text-center text-lg leading-relaxed">
        {t("home.Welcome_des")}
      </p>
    </div>
  );
}
