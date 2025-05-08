import { useTranslation } from "react-i18next";

export default function AboutHero() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row  items-center p-0 justify-center md:gap-10 gap-1 mt-5 md:mt-10 ">
      <div className="w-full px-2 md:w-[350px]  h-[180px] md:hidden">
        <p className="ltr:border-l-[3px] rtl:border-r-[3px] border-red-700 px-2 mt-4 font-bold">
          {t("navbar.About_us")}
        </p>
        <p
          className="font-bold text-xl mt-3 leading-relaxed "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("about.We_Are_Business")}
          <br />
          {t("about.Consultants_Dedicated_To")}
          <br />
          {t("about.Driving_Your_Success")}
        </p>
      </div>
      <div className="w-[360px] md:w-[350px] h-[290px] relative">
        <img
          src="/images/about1.png"
          className="absolute top-0 right-0 w-[250px] h-[250px]"
          alt=""
        />
        <img
          src="/images/about2.png"
          className="absolute bottom-0 left-0 w-[200px] h-[180px] z-1"
          alt=""
        />
      </div>
      <div className="w-[300px] h-[300px] hidden mt-10 md:block">
        <p className="ltr:border-l-[3px] rtl:border-r-[3px] border-red-700 px-2 mt-4 font-bold">
          {t("navbar.About_us")}
        </p>
        <p
          className="font-bold text-xl mt-3 leading-relaxed "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("about.We_Are_Business")}
          <br />
          {t("about.Consultants_Dedicated_To")}
          <br />
          {t("about.Driving_Your_Success")}
        </p>
      </div>
    </div>
  );
}
