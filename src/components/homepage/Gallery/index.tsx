import ImageCarousel from "@/components/slider/ImageCarousel";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { t } = useTranslation();
  const srcs = [
    "/images/slider.png",
    "/images/slider.png",
    "/images/slider.png",
    "/images/slider.png",
    "/images/slider.png",
    "/images/slider.png",
  ];
  const generateImageComponents = (srcArray: string[]) => {
    return srcArray.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide ${index}`}
        className="w-full h-auto rounded-xl border border-gray-400 object-cover"
      />
    ));
  };
  const images = generateImageComponents(srcs);

  return (
    <div className="bg-[#1f1f1f] py-10 px-6 tracking-wider">
      <div
        className="flex flex-col text-white ml:-1 md:ml-20 "
        style={{ fontFamily: "var(--font-Timmana)" }}
      >
        <h5 className="text-2xl">{t("home.How_Can_You")}</h5>
        <h1 className="text-4xl">{t("home.Grow_Your_Business")}</h1>
        <h5 className="text-2xl">{t("home.With_the_Help_of_Your")}</h5>
        <h5 className="text-2xl">
          <span className="primary-color px-1">
            {" "}
            {t("home.MVC_World_Wide")}{" "}
          </span>{" "}
        </h5>
      </div>
      <ImageCarousel
        bg="bg-[#1f1f1f]"
        data={images}
        spaceBetween={[20, 20, 30]}
        slidesPerView={[1.5, 2.5, 5]}
        showNavigation={false}
      />
    </div>
  );
}
