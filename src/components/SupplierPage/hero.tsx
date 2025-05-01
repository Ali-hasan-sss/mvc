import Badg from "../common/padg";

export default function SupplierHero() {
  return (
    <div className="w-full px-2 lg:px-20 py-5 md:py-8   flex flex-col md:flex-row items-center justify-center  md:justify-between ">
      <div className="w-full md:w-[400px] text-gray-600">
        <div className="relative w-[250px]  h-[60px]">
          <img
            src="images/Star1.png"
            className="w-5 absolute right-5 top-0"
            alt=""
          />
          <img
            src="images/Star1.png"
            className="w-4 absolute right-3 top-5"
            alt=""
          />
          <h1
            className="text-3xl absolute bottom-0 font-bold"
            style={{ fontFamily: "var(--font-Timmana)" }}
          >
            WELCOME TO <span className="text-red-700 px-1">MVC</span>{" "}
          </h1>
        </div>
        <p>
          you can explore a wide network of suppliers from around the world,
          allowing you to find the ideal partners to grow your business and
          expand your international trade.
        </p>
      </div>
      {/* image section */}
      <div className="w-[350px] md:w-[420px] h-[400px] relative flex items-end justify-center">
        {/* badg */}
        <div className="absolute  top-40 z-10 left-0">
          <Badg
            title="50 +"
            desc="Brands Joined"
            image="images/infinityIcon.png"
          />
        </div>
        {/* badg */}
        <div className="absolute bottom-20 z-10 right-0 lg:right-0 ">
          <Badg title="85 %" desc="Sales Growth" image="images/rateicon.png" />
        </div>
        <div className="w-[300px] h-[370px]  relative flex items-end">
          <img
            src="images/suppliers1.png"
            className="absolute w-full top-1 right-1 h-full"
            alt=""
          />
          <div className="w-[300px] h-[300px] ">
            <div className="w-[290px] h-[290px] bg-[rgba(0,109,119,1)] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
