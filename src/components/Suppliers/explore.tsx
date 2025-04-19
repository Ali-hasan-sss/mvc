import ExploreCard from "./card";
import { items } from "./data";

export default function Exploer() {
  return (
    <div className="w-full flex flex-col gap-1 items-center mt-4  py-6 justify-center">
      <h2
        className=" font-normal text-3xl  tracking-wider "
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        Search for Suppliers
      </h2>
      <p className="text-center text-lg leading-relaxed md:px-[60px]">
        Explore a huge database of registered suppliers by country, industry
        sector, or product type.Browse supplier profiles and review their
        information and ratings.
      </p>
      <div className="w-full py-10 flex items-center gap-10">
        <div className="">
          <img src="/images/Ellipse.png" className="w-[270px]" alt="" />
        </div>
        <div className="flex w-full items-center justify-center gap-4 overflow-x-auto px-6">
          {items.map((item, index) => (
            <ExploreCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
