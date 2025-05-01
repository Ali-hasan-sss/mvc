import { Star } from "lucide-react";
import SearchSupliers from "../inputs/suppliersSearch";

export default function FindSuppliers() {
  return (
    <div className="w-full px-2 lg:px-20 py-5 md:py-8 flex flex-col lg:flex-row gap-10 lg:gap-0 items-center justify-center  lg:justify-between ">
      {/* images container */}
      <div className="w-[350px]  relative md:w-[450px] h-[350px] ">
        <div className="w-[250px] md:w-[320px]  h-[350px] relative ">
          <div className="w-[250px] md:w-[320px] h-[350px] border rounded-[50%]">
            <img
              src="images/find1.png"
              className="w-[220px] md:w-[290px] absolute left-3 bottom-3"
              alt=""
            />
          </div>
          {/* icons */}
          <img
            src="images/location.png"
            className="absolute top-20 left-55 md:left-71 w-10"
            alt=""
          />
          <img
            src="images/shoppingCart.png"
            className="absolute bottom-0 md:bottom-1 right-10 md:right-14 w-10"
            alt=""
          />
          <img
            src="images/sittings.png"
            className="absolute bottom-7 md:bottom-9 left-4 w-11"
            alt=""
          />
          <img
            src="images/earth11.png"
            className="absolute top-8 left-2 w-15"
            alt=""
          />
        </div>
        {/* badg */}
        <div className="absolute py-2 md:py-3 px-1 md:px-4 z-[-1] w-[150px] md:w-[175px] h-[70px] md:h-[85px] rounded-xl bg-[rgba(157,157,157,0.15)] bottom-18 md:bottom-23 right-0 md:right-3 flex flex-col justify-center items-center gap-1">
          <p className="text-xs text-gray-700  font-bold">
            Evaluate your supplier
          </p>
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-500 text-yellow-500 text-lg" />
            <Star className="fill-yellow-500 text-yellow-500 text-lg" />
            <Star className="fill-yellow-500 text-yellow-500 text-lg" />
            <Star className="fill-yellow-500 text-yellow-500 text-lg" />
            <Star className="fill-gray-400 text-gray-400 text-lg" />
          </div>
        </div>
        <img
          src="images/Rectangle1Find.png"
          className="absolute w-25 md:w-30 left-70 md:left-93 top-35 md:top-23 "
          alt=""
        />
      </div>
      {/*------ end images container -------*/}
      <SearchSupliers />
    </div>
  );
}
