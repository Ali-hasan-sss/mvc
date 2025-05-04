import ImageCarousel from "@/components/slider/ImageCarousel";

export default function Gallery() {
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
        <h5 className="text-2xl">How Can You</h5>
        <h1 className="text-4xl">Grow Your Business</h1>
        <h5 className="text-2xl">With the Help of Your</h5>
        <h5 className="text-2xl">
          <span className="primary-color"> MVC World Wide </span> Account?
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
