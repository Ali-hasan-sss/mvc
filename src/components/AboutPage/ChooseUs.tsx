import InfoCard from "./infocsrd";

export default function ChooseUs() {
  const cards = [
    {
      image: "/images/earth.png",
      title: "Global Expansion",
      desc: "Access to suppliers and merchants from around the world",
    },
    {
      image: "/images/search.png",
      title: "Easy search",
      desc: "Advanced search tools enable you to find the perfect supplier in minutes.",
    },
    {
      image: "/images/mdi_deal.png",
      title: "Close transactions",
      desc: "A secure and reliable platform supports professional buying and selling.",
    },
  ];
  return (
    <div
      className="relative justify-center py-10 md:py-[60px] items-center flex flex-col"
      style={{ background: "#006D77" }}
    >
      <h2
        className="font-bold text-3xl text-white"
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        Why Choose Us?
      </h2>
      <div className="w-full flex flex-wrap px-1 md:px-20 py-1 md:py-6 items-senter justify-center gap-7  md:justify-between mt-10">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            isChip
            image={card.image}
            title={card.title}
            desc={card.desc}
          />
        ))}
      </div>
      <img
        src="images/Star.png"
        className="absolute top-6 left-19 md:top-10 md:left-110 w-8"
        alt=""
      />
      <img
        src="images/cercil.png"
        className=" hidden md:block absolute top-23 left-180 w-2"
        alt=""
      />
      <img
        src="images/cercil2.png"
        className=" hidden md:block  absolute top-27 left-183 w-3"
        alt=""
      />
    </div>
  );
}
