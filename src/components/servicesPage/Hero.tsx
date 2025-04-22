export default function ServicesHero() {
  return (
    <div>
      <div className="w-[100vw] flex py-10 services_hero h-[40vh] px-10 ">
        <div className="flex w-full z-20 flex-col items-">
          <p className="border-l-[2px] text-white pl-2 border-red-700 text-sm font-bold">
            WHAT WE OFFERS
          </p>
          <h1
            className="font-bold text-white mt-4 ml-2 text-3xl"
            style={{ fontFamily: "var(--font-Timmana)" }}
          >
            Our Service
          </h1>
        </div>
        <div className="w-[90vw] flex items-end px-6 z-20 bg-white h-20 absolute bottom-0">
          <p className="border-l-[2px] text-lg pl-2 border-red-700">
            OUR SERVICES
          </p>
        </div>
      </div>
    </div>
  );
}
