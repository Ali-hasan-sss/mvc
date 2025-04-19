import ImageCarousel from "@/components/slider/ImageCarousel";

export default function Gallery() {
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
      <ImageCarousel />
    </div>
  );
}
