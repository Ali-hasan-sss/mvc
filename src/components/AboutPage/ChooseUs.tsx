import { useTranslation } from "react-i18next";
import InfoCard from "./infocsrd";

export default function ChooseUs() {
  const { t } = useTranslation();
  const cards = [
    {
      image: "/images/earth.png",
      title: "Global_Expansion",
      desc: "Global_Expansion_des",
    },
    {
      image: "/images/search.png",
      title: "Easy_search",
      desc: "Easy_search_des",
    },
    {
      image: "/images/mdi_deal.png",
      title: "Close_transactions",
      desc: "Close_transactions_des",
    },
  ];
  return (
    <div
      className=" justify-center py-10 items-center flex flex-col"
      style={{ background: "#006D77" }}
    >
      <div className="relative w-[350px] flex items-center justify-center h-[100px]">
        <h2
          className="font-bold text-3xl text-white"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("about.Why_Choose_Us")}
        </h2>
        <img
          src="images/Star.png"
          className="absolute top-5 left-10 w-8"
          alt=""
        />
        <img
          src="images/cercil.png"
          className="absolute top-16 right-20 w-2"
          alt=""
        />
        <img
          src="images/cercil2.png"
          className="absolute top-20 right-15 w-3"
          alt=""
        />
      </div>
      <div className="w-full flex flex-wrap px-1 md:px-20 py-1 md:py-6 items-senter justify-center gap-7  md:justify-between mt-10">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            isChip
            image={card.image}
            title={t(`about.${card.title}`)}
            desc={t(`about.${card.desc}`)}
          />
        ))}
      </div>
    </div>
  );
}
