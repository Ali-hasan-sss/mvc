"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState, useRef } from "react";
import { updateScales } from "../../../utils/helperFunctions";
import SwiperCore from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CustomCarouselProps {
  data: React.ReactNode[];
  slidesPerView: number[];
  spaceBetween: number[];
  bg?: string;
  showNavigation?: boolean;
}

export default function CustomCarousel({
  data,
  slidesPerView,
  spaceBetween,
  bg,
  showNavigation = true,
}: CustomCarouselProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleOpacity = (swiper: SwiperCore) => {
    swiper.slides.forEach((slideEl) => {
      slideEl.classList.remove("opacity-100", "opacity-40");
      if (slideEl.classList.contains("swiper-slide-active")) {
        slideEl.classList.add("opacity-100");
      } else {
        slideEl.classList.add("opacity-40");
      }
    });
  };

  return (
    <div className={`${bg} py-10 w-full px-6 overflow-hidden`}>
      <div className="relative">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          centerInsufficientSlides={true}
          slidesPerView={
            slidesPerView[2] ?? slidesPerView[slidesPerView.length - 1]
          }
          spaceBetween={
            spaceBetween[2] ?? spaceBetween[spaceBetween.length - 1]
          }
          loop={true}
          className="max-w-7xl w-full mx-auto !overflow-visible"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateScales(swiper);
            handleOpacity(swiper);

            swiper.on("transitionEnd", () => {
              handleOpacity(swiper);
            });
          }}
          onSlideChange={(swiper) => {
            updateScales(swiper);
            handleOpacity(swiper);
          }}
          breakpoints={{
            0: {
              slidesPerView: slidesPerView[0],
              spaceBetween: spaceBetween[0],
            },
            640: {
              slidesPerView: slidesPerView[1],
              spaceBetween: spaceBetween[1],
            },
            768: {
              slidesPerView: slidesPerView[2],
              spaceBetween: spaceBetween[2],
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`transition-transform duration-300 ease-in-out px-2 !flex justify-center items-center ${
                !isLoaded ? "opacity-0" : ""
              }`}
            >
              {item}
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowLeft className="text-xl" />
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowRight className="text-xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
