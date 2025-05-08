import { useTranslation } from "react-i18next";

export default function HowItWork() {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col items-center px-2 md:px-[150px]  md:py-[30px] ">
      <img
        src="/images/Ellipse1.png"
        className="absolute w-[200px] top-20 right-0 hidden md:block"
        alt=""
      />
      <div className="flex flex-col items-center gap-4 mt-16">
        <h2
          className="font-bold text-3xl"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("home.How_it_work")}
        </h2>
        <p className="text-lg leading-relaxed z-20">
          {t("home.Join")}
          <br /> {t("home.Browse")} <br />
          {t("home.use_smart")}
          <br /> {t("home.connect")}
          <br /> {t("home.Interact")}
          <br />
          {"home.close"}
          <br />
          {t("home.Complete")}
        </p>
      </div>
      <div className="flex flex-col items-center gap-4  md:mt-6">
        <h2
          className="font-bold text-3xl mt-20"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("home.Website_Features")}:
        </h2>
        <p className="text-lg leading-relaxed lg:px-30">
          {t("home.global_database")}
          <br />
          {t("home.advanced_filtering")}
          <br />
          {t("home.Professional_support")}
          <br />
          {t("home.Integration")}
        </p>
      </div>
    </div>
  );
}
