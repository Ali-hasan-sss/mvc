"use client";
import NavBar from "@/components/NavBar/navBar";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../utils/helperFunctions";
import SupplierDiscription from "@/components/SupplierPage/details/supplierDesc";
import Reviews from "@/components/SupplierPage/details/reviews";
import { supplier } from "../../../../types";
import useVisitorSuppliersStore from "@/store/visitorSuppliers";

export default function SupplierDetails() {
  const [activeTab, setActiveTab] = useState("desc");
  const [supplier, setSupplier] = useState<supplier | null>(null);
  const { selectedSupplier, loading } = useVisitorSuppliersStore();

  useEffect(() => {
    // إذا كانت البيانات موجودة في store، استخدمها
    if (selectedSupplier) {
      // تحويل البيانات من VisitorSupplierDetail إلى supplier format
      const supplierData: supplier = {
        id: selectedSupplier.id,
        name: `${selectedSupplier.first_name} ${selectedSupplier.last_name}`,
        description: selectedSupplier.description,
        image: selectedSupplier.image,
        Clients: 0, // يمكن إضافته لاحقاً إذا كان متوفراً في API
        contact: {
          country: "",
          city: "",
          Facebook: "",
          Email: selectedSupplier.email,
        },
        reviews: {
          average_reviews: 0,
          total_reviews: 0,
          customers_comments: [],
        },
        companies:
          selectedSupplier.companies?.map((company) => ({
            id: company.id,
            companyName: company.title,
          })) || [],
      };
      setSupplier(supplierData);
    } else {
      // إذا لم تكن البيانات موجودة في store، جرب localStorage كاحتياطي
      const stored = localStorage.getItem("suplier");
      if (stored) {
        setSupplier(JSON.parse(stored));
      }
    }
  }, [selectedSupplier]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="p-10 text-center text-gray-600">Loading...</div>
      </>
    );
  }

  if (!supplier) {
    return (
      <>
        <NavBar />
        <div className="p-10 text-center text-gray-600">
          No supplier data available
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col py-4 px-2 gap-5 md:px-10">
        <div className="header w-full flex flex-col items-center justify-center">
          <h1
            className="text-xl text-center md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-Timmana)" }}
          >
            Suppliers <span className="text-[#006D77] px-1"> Details</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-600">
            Home &gt; Suppliers &gt; Search
          </p>
        </div>
        <div className="flex items-center gap-3 ">
          <div className="w-1/2 flex justify-center items-center md:gap-2 ">
            {/* social media for large screen */}
            <div className="socialinfo hidden md:flex w-1/3 flex-col items-center justify-center gap-3">
              <div className="py-1 px-3 w-[130px] h-[50px] rounded-full flex flex-col items-center justify-center bg-[#F5A623CC]">
                <p className="text-sm font-bold text-white">Clients</p>
                <p className="text-xs text-white">
                  {supplier.Clients && formatNumber(supplier.Clients)}
                </p>
              </div>
              <div className="py-1 px-3 w-[130px] h-[50px] rounded-full flex flex-col items-center justify-center bg-blue-500">
                <a
                  href={supplier.contact?.Facebook}
                  className="text-sm font-bold text-white"
                >
                  Facebook
                </a>
              </div>
              <div className="py-1 px-3 w-[130px] h-[50px] rounded-full flex flex-col items-center justify-center bg-[#BF1E2EE5]">
                <a
                  href={supplier.contact?.Email}
                  className="text-sm font-bold text-white"
                >
                  Gmail
                </a>
              </div>
            </div>
            {/* image container */}
            <div className="image">
              <div className="flex items-center overflow-hidden justify-center h-[150px] md:h-[230px] w-[150px] md:w-[230px] rounded-full bg-gray-100">
                <img
                  src={`/${supplier.image}`}
                  className="z-10 w-[150px] md:w-[180px]"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* rate */}
          <div className="w-1/2 flex flex-col gap-2 ">
            <h1 className="text-xl md:text-3xl font-bold">{supplier.name}</h1>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`text-sm md:text-lg ${
                    index < supplier.reviews.average_reviews
                      ? "fill-yellow-500 text-yellow-500"
                      : "fill-gray-400 text-gray-400"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400">
                {" "}
                {supplier.reviews.total_reviews} (reviews)
              </span>
            </div>
            {/* country */}
            <p className="text-sm md:text-lg font-bold text-[#006D77]">
              {supplier.contact?.country},{supplier.contact?.city}
            </p>
            <div>
              <p className="text-xs h-20 overflow-hidden md:text-sm font-bold text-gray-800">
                {supplier.description}
              </p>
              <span>...</span>
            </div>
          </div>
        </div>
        {/* social media for small screen */}
        <div className="flex items-center justify-center gap-2 md:hidden w-full">
          <div className="py-1 px-3 w-[120px] h-[50px] rounded-full flex flex-col items-center justify-center bg-[#F5A623CC]">
            <p className="text-sm font-bold text-white">Clients</p>
            <p className="text-xs text-white">{supplier.Clients}</p>
          </div>
          <div className="py-1 px-3 w-[120px] h-[50px] rounded-full flex flex-col items-center justify-center bg-blue-500">
            <a
              href={supplier.contact?.Facebook}
              className="text-sm font-bold text-white"
            >
              Facebook
            </a>
          </div>
          <div className="py-1 px-3 w-[120px] h-[50px] rounded-full flex flex-col items-center justify-center bg-[#BF1E2EE5]">
            <a
              href={supplier.contact?.Email}
              className="text-sm font-bold text-white"
            >
              Gmail
            </a>
          </div>
        </div>
      </div>
      {/* discription and reviews */}
      <div className="w-full flex flex-col gap-5 md:gap-10 py-6 mt-5 ">
        <div className="flex w-full items-center justify-center border-b-2 border-gray-300 px-2 md:px-10">
          <div className="flex gap-5 md:gap-10">
            <button
              className={`relative pb-2 cursor-pointer text-sm md:text-base font-bold transition-all duration-200 ${
                activeTab === "desc" ? "text-red-700" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("desc")}
            >
              Description
              {activeTab === "desc" && (
                <span className="absolute left-0 -bottom-[2px] h-[4px] w-full bg-yellow-400 rounded-full"></span>
              )}
            </button>
            <button
              className={`relative pb-2 cursor-pointer text-sm md:text-base font-bold transition-all duration-200 ${
                activeTab === "reviews" ? "text-red-700" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
              {activeTab === "reviews" && (
                <span className="absolute left-0 -bottom-[2px] h-[4px] w-full bg-yellow-400 rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {activeTab === "desc" ? (
          <SupplierDiscription supplier={supplier} />
        ) : (
          <Reviews supplier={supplier} />
        )}
      </div>
    </>
  );
}
