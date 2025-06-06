import { useTranslation } from "react-i18next";

export default function SuccessNum() {
  const { t } = useTranslation();
  return (
    <div className="px-0 lg:block hidden md:px-[150px]">
      <div className=" bg-[rgba(0,0,0,0.85)] border-b-[3px] border-red-700 flex items-center w-full h-[75px] text-white">
        <div className="w-1/4 flex flex-col items-center justify-center relative">
          <p className="text-[12px] md:text-xl font-bold">
            680 <sup className="font-normal">+</sup>{" "}
          </p>
          <p className="text-[10px] md:text-xs">
            {t("about.Business_Trust_Us")}
          </p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center relative">
          <p className="text-[12px] md:text-xl text-xl font-bold">
            1,354 <sup className="font-normal">+</sup>{" "}
          </p>
          <p className="text-[10px] md:text-xs">{t("about.Sold_Projects")}</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center relative">
          <p className="text-[12px] md:text-xl font-bold">
            97% <sup className="font-normal">+</sup>{" "}
          </p>
          <p className="text-[10px] md:text-xs">{t("about.Success_Rate")}</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center relative">
          <p className="text-[12px] md:text-xl font-bold">
            15Y <sup className="font-normal">+</sup>{" "}
          </p>
          <p className="text-[8px] md:text-xs">
            {t("about.Years_of_Experience")}
          </p>
        </div>
      </div>
    </div>
  );
}
