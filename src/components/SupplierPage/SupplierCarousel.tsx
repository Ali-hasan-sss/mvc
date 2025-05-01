"use client";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  Paperclip,
} from "lucide-react";
import { useState } from "react";
import { suppliers } from "./data";

export default function SupplierCarousel() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % suppliers.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + suppliers.length) % suppliers.length);
  };

  const displayedSuppliers = Array.from({ length: 7 }, (_, i) => {
    const index = (current - 3 + i + suppliers.length) % suppliers.length;
    return suppliers[index];
  });

  return (
    <div className=" w-full bg-[rgba(0,109,119,0.11)] mt-20 flex flex-col gap-5 items-center text-center">
      {/* Suppliers V Layout */}
      <div className="relative w-full h-[150px]">
        <div
          className="absolute left-0 bottom-3 w-0 h-0"
          style={{
            borderLeft: "49vw solid transparent",
            borderRight: "49vw solid transparent",
            borderTop: "150px solid white",
          }}
        ></div>

        <h2
          style={{ fontFamily: "var(--font-Timmana)" }}
          className="text-3xl absolute left-1/2 transform -translate-x-1/2 font-bold mb-10"
        >
          Available Suppliers
        </h2>
        {displayedSuppliers.map((supplier, idx, visibleSuppliers) => {
          const relativeIndex = idx - Math.floor(visibleSuppliers.length / 2); // -3 إلى 3
          const absIndex = Math.abs(relativeIndex);

          const spacingX = 150;
          const spacingY = 30;

          const top = (3 - absIndex) * spacingY;
          const left = `calc(50% + ${relativeIndex * spacingX}px)`;

          return (
            <img
              key={supplier.id}
              src={supplier.image}
              alt={supplier.name}
              style={{
                position: "absolute",
                top: `${top}px`,
                left,
                transform: "translateX(-50%)",
                zIndex: relativeIndex === 0 ? 10 : 1,
              }}
              className={`w-20 h-20 rounded-full z-50 border-4 transition duration-300 ${
                relativeIndex === 0
                  ? "border-yellow-500 scale-110"
                  : "border-gray-300 opacity-80"
              }`}
            />
          );
        })}
      </div>

      {/* Supplier Card */}
      <div className=" relative w-[90%] mt-15 flex items-center justify-center md:w-[700px]">
        <div className="bg-white w-[85%] md:w-[650px] h-[250px] rounded-xl  p-5 shadow-md">
          <h3 className="text-2xl font-bold text-yellow-600">
            {suppliers[current].name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">
            {suppliers[current].location}
          </p>
          <p className="text-gray-700 px-5 text-sm mt-10 overflow-y-auto">
            {suppliers[current].description}
          </p>
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 cursor-pointer left-1 transform -translate-y-1/2 text-white bg-[rgba(0,109,119,1)] hover:bg-[rgba(0,109,119,0.8)] p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 cursor-pointer right-1 transform -translate-y-1/2 text-white bg-[rgba(0,109,119,1)] hover:bg-[rgba(0,109,119,0.8)] p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-6 py-5">
        <button className="text-red-500 p-3 rounded-full bg-white hover:bg-gray-50 text-xl cursor-pointer ">
          <Heart className="fill-red-500" />
        </button>
        <button className="text-cyan-500 p-3 rounded-full bg-white hover:bg-gray-50 text-xl cursor-pointer">
          <Paperclip />
        </button>
        <button className="text-yellow-500 p-3 rounded-full bg-white hover:bg-gray-50 text-xl cursor-pointer">
          <Bookmark />
        </button>
      </div>
    </div>
  );
}
