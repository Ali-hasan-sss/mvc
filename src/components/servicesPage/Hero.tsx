import { useTranslation } from "react-i18next";

export default function ServicesHero() {
  const { t } = useTranslation();
  return (
    <div>
      <div className=" flex py-10 md:relative services_hero h-[30vh] md:h-[40vh] px-10 ">
        {/* viwe in medium screen */}
        <div className="flex w-full z-20 flex-col justify-end md:justify-center">
          <p className="ltr:border-l-[2px] rtl:border-r-[2px] text-white ltr:pl-2 rtl:pr-2 border-red-700 text-lg font-bold">
            {t("services.WHAT_WE_OFFERS")}
          </p>
          <h1
            className="font-[400] text-white mt-2 ltr:ml-2 rtl:mr-2 text-3xl"
            style={{ fontFamily: "var(--font-Timmana)" }}
          >
            {t("services.Our_Service")}
          </h1>
        </div>
        {/* -------- */}
        <div className="w-[90vw]  items-end px-6 hidden md:flex z-20 bg-white h-20 md:absolute bottom-0">
          <p className="ltr:border-l-[2px] rtl:border-r-[2px] text-lg ltr:pl-2 rtl:pr-2 border-red-700">
            {t("services.Our_Service")}
          </p>
        </div>
      </div>
      <div className="w-full items-end px-6 pt-10 md:hidden z-20 bg-white h-20">
        <p className="ltr:border-l-[2px] rtl:border-r-[2px]  text-gray-700 font-bold text-lg ltr:pl-2 rtl:pr-2 border-red-700">
          {t("services.Our_Service")}
        </p>
      </div>
    </div>
  );
}
