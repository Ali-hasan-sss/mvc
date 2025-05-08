import { Eye, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Mession() {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-10 flex gap-4 lg:gap-0 py-4 lg:py-0 flex-col lg:flex-row items-center lg:bg-[rgba(0,0,0,0.85)] lg:relative">
      <div className="w-full lg:w-1/3 relative hidden  lg:block lg:h-[350px]">
        <img
          src="images/mession1.png"
          className="w-[250px]  absolute bottom-4 right-7"
          alt=""
        />
      </div>
      {/* for mobile & tablet */}
      <div className="lg:hidden w-full px-2">
        <p className="ltr:border-l-[3px] rtl:border-r-[3px] md:text-xl border-red-700 px-2 mt-4 font-bold text-gray-500">
          {t("about.OUR_MISSION_VISION")}
        </p>
        <p
          className="font-bold text-xl md:text-3xl mt-3 leading-relaxed lg:text-white "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("about.Discover")}
        </p>
      </div>
      <img
        src="images/mession1.png"
        className="w-full h-[400px] lg:hidden"
        alt=""
      />
      {/* ---------- */}

      <div className="w-2/3 hidden lg:block h-[350px] mission relative">
        <div className="absolute bottom-5 left-10 w-[250px] border-b-[3px] border-red-700 flex items-end h-[185px] ">
          <div className="w-[250px] h-[160px] absolute buttom-0 left-0 bg-white ">
            <div className="mt-8 px-3 ">
              <h5 className="font-[600]">{t("about.Our_Vission")}</h5>
              <p className="text-xs mt-1 text-gray-500">
                {t("about.Our_Vission_des")}
              </p>
            </div>
          </div>
          <div className="w-[50px] h-[50px] absolute flex items-center justify-center top-0 left-3 bg-black ">
            <Eye className="text-white text-xl" />
          </div>
        </div>
        <div className="absolute bottom-5 left-80 w-[250px] border-b-[3px] border-red-700 flex items-end h-[185px] ">
          <div className="w-[250px] h-[160px] absolute buttom-0 left-0 bg-white ">
            <div className="mt-8 px-3  ">
              <h5 className="font-[600]">{t("about.Our_Mission")}</h5>
              <p className="text-xs mt-1 text-gray-500">
                {t("about.Our_Mission_des")}
              </p>
            </div>
          </div>
          <div className="w-[50px] h-[50px] absolute flex items-center justify-center top-0 left-3 bg-black ">
            <Users className="text-xl text-white" />
          </div>
        </div>
      </div>
      {/* boxs for mobile & tablet */}
      <div className="lg:hidden flex gap-6  justify-between w-full ">
        <div className="flex w-2/3 flex-col items-center justify-between h-[400px]">
          <div className="w-full relative bg-gray-200   w-[300px] border-b-[3px] border-red-700 flex items-end h-[185px] ">
            <div className="w-full h-[160px] absolute buttom-0 left-0  ">
              <div className="mt-8 w-full px-3 ">
                <h5 className="font-[600]  absolute top-0 left-20 ">
                  {t("about.Our_Vission")}
                </h5>
                <p className="text-xs absolute top-15 text-gray-500">
                  {t("about.Our_Vission_des")}
                </p>
              </div>
            </div>
            <div className="w-[50px] h-[50px] absolute flex items-center justify-center top-0 left-3 bg-black ">
              <Eye className="text-white text-xl" />
            </div>
          </div>
          <div className="w-full relative bg-gray-200 mt-3  w-[300px] border-b-[3px] border-red-700 flex items-end h-[185px] ">
            <div className="w-full h-[160px]  absolute buttom-0 left-0  ">
              <div className="mt-8 px-3 w-full  ">
                <h5 className="font-[600] absolute top-0 left-20">
                  {t("about.Our_Mission")}
                </h5>
                <p className="text-xs absolute top-15 text-gray-500">
                  {t("about.Our_Vission_des")}
                </p>
              </div>
            </div>
            <div className="w-[50px] h-[50px] absolute flex items-center justify-center top-2 left-3 bg-black ">
              <Users className="text-xl text-white" />
            </div>
          </div>
        </div>
        {/* SuccessNum for mobile */}
        <div className="flex w-1/3 h-[400px] bg-black text-white flex-col items-center border-b-[3px] border-red-700">
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl font-bold">
              680 <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">{t("about.Business_Trust_Us")}</p>
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl text-xl font-bold">
              1,354 <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">{t("about.Sold_Projects")}</p>
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl font-bold">
              97% <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">{t("about.Success_Rate")}</p>
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl font-bold">
              15Y <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">{t("about.Years_of_Experience")}</p>
          </div>
        </div>
      </div>
      {/* ---------------------- */}
      {/* title for large screen */}
      <div className="absolute hidden lg:block top-3 ltr:left-2 rtl:right-2 md:left-16">
        <p className="ltr:border-l-[3px] rtl:border-r-[3px] border-red-700 px-2 mt-4 font-bold text-gray-500 lg:text-white">
          {t("about.OUR_MISSION_VISION")}
        </p>
        <p
          className="font-bold text-3xl mt-3 leading-relaxed lg:text-white "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("about.Discover")}{" "}
        </p>
      </div>
    </div>
  );
}
