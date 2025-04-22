import { Eye, Users } from "lucide-react";

export default function Mession() {
  return (
    <div className="w-full mt-10 flex gap-4 lg:gap-0 py-4 lg:py-0 flex-col lg:flex-row items-center bg-[rgba(0,0,0,0.85)] relative">
      <div className="w-full lg:w-1/3 relative h-50 lg:h-[350px]">
        <img
          src="images/mession1.png"
          className="w-[250px] hidden lg:block absolute bottom-4 right-7"
          alt=""
        />
      </div>
      <div className="relative lg:hidden w-[250px] border-b-[3px] border-red-700 flex items-end h-[185px] ">
        <div className="w-[250px] h-[160px] absolute buttom-0 left-0 bg-white ">
          <div className="mt-8 px-3 ">
            <h5 className="font-[600]">Our Vission</h5>
            <p className="text-xs mt-1 text-gray-500">
              At MVC, Our goal is to enable merchants and suppliers from
              different countries to easily communicate, expand their businesses
              globally through an integrated digital platform.
            </p>
          </div>
        </div>
        <div className="w-[50px] h-[50px] absolute flex items-center justify-center top-0 left-3 bg-black ">
          <Eye className="text-white text-xl" />
        </div>
      </div>
      <div className="relative lg:hidden w-[250px] border-b-[3px] border-red-700 flex items-end h-[185px] ">
        <div className="w-[250px] h-[160px] absolute buttom-0 left-0 bg-white ">
          <div className="mt-8 px-3  ">
            <h5 className="font-[600]">Our Mission</h5>
            <p className="text-xs mt-1 text-gray-500">
              We seek to create a dynamic trading environment that enables
              suppliers to showcase their products and services, and merchants
              to explore global markets through a seamless and secure interface.
            </p>
          </div>
        </div>
        <div className="w-[50px] h-[50px] absolute flex items-center justify-center top-0 left-3 bg-black ">
          <Users className="text-xl text-white" />
        </div>
      </div>
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
      <div className="absolute top-3 left-2 md:left-16">
        <p className="border-l-[3px] border-red-700 px-2 mt-4 font-bold text-white">
          OUR MISSION & VISION
        </p>
        <p
          className="font-bold text-3xl mt-3 leading-relaxed text-white "
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          Discover the core principles that cuids us
        </p>
      </div>
    </div>
  );
}
