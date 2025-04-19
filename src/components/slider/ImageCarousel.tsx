"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";

const images = [
  "/images/slider.png",
  "/images/slider.png",
  "/images/slider.png",
  "/images/slider.png",
  "/images/slider.png",
  "/images/slider.png",
];

export default function CustomCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-[#1f1f1f] py-10 px-6 overflow-hidden">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        className="max-w-7xl mx-auto !overflow-visible"
        onSwiper={(swiper) => updateScales(swiper)}
        onSlideChange={(swiper) => updateScales(swiper)}
        breakpoints={{
          0: {
            slidesPerView: 1.5, // صورة ونصف على الموبايل
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2.5, // للتابلت الصغير
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className={`transition-transform duration-200 ease-in-out px-2 ${
              !isLoaded ? "opacity-0" : ""
            }`}
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-auto rounded-xl border border-gray-400 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateScales(swiper: any) {
  swiper.slides.forEach((slide: HTMLElement, index: number) => {
    const distance =
      Math.abs(index - swiper.activeIndex) % swiper.slides.length;

    slide.style.transition = "transform 0.1s";
    slide.style.transform = "scale(1)";

    if (distance === 0) {
      slide.style.transform = "scale(1.3)";
    } else if (distance === 1 || distance === swiper.slides.length - 1) {
      slide.style.transform = "scale(1.1)";
    } else if (distance === 2 || distance === swiper.slides.length - 2) {
      slide.style.transform = "scale(0.95)";
    } else {
      slide.style.transform = "scale(0.85)";
    }
  });
}
