import { Eye, Users } from "lucide-react";

export default function Mession() {
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
        <p className="border-l-[3px] md:text-xl border-red-700 px-2 mt-4 font-bold text-gray-500">
          OUR MISSION & VISION
        </p>
        <p
          className="font-bold text-xl md:text-3xl mt-3 leading-relaxed lg:text-white "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          Discover the core principles that cuids us
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
              <h5 className="font-[600]">Our Vission</h5>
              <p className="text-xs mt-1 text-gray-500">
                At MVC, Our goal is to enable merchants and suppliers from
                different countries to easily communicate, expand their
                businesses globally through an integrated digital platform.
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
              <h5 className="font-[600]">Our Mission</h5>
              <p className="text-xs mt-1 text-gray-500">
                We seek to create a dynamic trading environment that enables
                suppliers to showcase their products and services, and merchants
                to explore global markets through a seamless and secure
                interface.
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
                  Our Vission
                </h5>
                <p className="text-xs absolute top-15 text-gray-500">
                  At MVC, Our goal is to enable merchants and suppliers from
                  different countries to easily communicate, expand their
                  businesses globally through an integrated digital platform.
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
                  Our Mission
                </h5>
                <p className="text-xs absolute top-15 text-gray-500">
                  We seek to create a dynamic trading environment that enables
                  suppliers to showcase their products and services, and
                  merchants to explore global markets through a seamless and
                  secure interface.
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
            <p className="text-xs">Business Trust Us</p>
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl text-xl font-bold">
              1,354 <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">Sold Projects</p>
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl font-bold">
              97% <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">Success Rate</p>
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center relative">
            <p className="text-xl font-bold">
              15Y <sup className="font-normal">+</sup>{" "}
            </p>
            <p className="text-xs">Years of Experience</p>
          </div>
        </div>
      </div>
      {/* ---------------------- */}
      {/* title for large screen */}
      <div className="absolute hidden lg:block top-3 left-2 md:left-16">
        <p className="border-l-[3px] border-red-700 px-2 mt-4 font-bold text-gray-500 lg:text-white">
          OUR MISSION & VISION
        </p>
        <p
          className="font-bold text-3xl mt-3 leading-relaxed lg:text-white "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          Discover the core principles that cuids us
        </p>
      </div>
    </div>
  );
}
