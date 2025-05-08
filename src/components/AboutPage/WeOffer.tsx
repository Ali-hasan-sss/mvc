import { useTranslation } from "react-i18next";

export default function WeOffer() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 items-center px-2 md:px-[170px] py-[30px] md:py-[75px] ">
      <h2
        className="font-bold text-3xl"
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        {t("about.What_We_Offer")}
      </h2>
      <ul
        style={{ listStyle: "disc", lineHeight: "40px" }}
        className="font-[500]"
      >
        <li className="">{t("about.What_We_Offer1")}</li>
        <li className="">{t("about.What_We_Offer2")} </li>
        <li className="">{t("about.What_We_Offer3")}</li>
        <li className="">{t("about.What_We_Offer4")}</li>
      </ul>
    </div>
  );
}
