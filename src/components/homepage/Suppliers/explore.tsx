"use client";
import { useTranslation } from "react-i18next";
import ExploreCard from "./card";
import { items } from "./data";

export default function Exploer() {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-1 items-center mt-4  py-6 justify-center">
      <h2
        className=" font-normal text-3xl  tracking-wider "
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        {t("home.Search_for_Suppliers")}
      </h2>
      <p className="text-center text-lg leading-relaxed md:px-[60px]">
        {t("home.Explore")}
      </p>
      <div
        className="w-full pt-10 flex items-center gap-10"
        style={{ direction: "ltr" }}
      >
        <div className="hidden md:block">
          <img src="/images/Ellipse.png" className="w-[270px]" alt="" />
        </div>
        <div className="flex w-full items-center md:justify-center gap-4 overflow-x-auto px-6">
          {items.map((item, index) => (
            <ExploreCard item={item} key={index} />
          ))}
        </div>
      </div>
      <button className="linear_btn font-bold py-2 px-8 mt-10" type="button">
        {t("See_More")}
      </button>
    </div>
  );
}
