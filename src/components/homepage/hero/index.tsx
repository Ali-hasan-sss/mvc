export default function Hero() {
  return (
    <section className=" bg-hero h-[70vh]  w-full flex items-center justify-between gap-4">
      <div
        className="w-full md:w-1/2 h-full px-5 flex flex-col items-center justify-center"
        style={{ background: "rgba(255, 255, 255, 0.7)" }}
      >
        <h1 className="text-[50px] font-bold primary-color m-0 p-0">MVC</h1>
        <p className="text-sm mb-8 ml-2 title_logo">CARDS</p>
        <p className="text-lg font-medium italic">
          &quot;Your Global Platform for Connecting Suppliers and Merchants -
          Discover New Opportunities in Global Markets &quot;
        </p>
        <button className="linear_btn font-bold py-1 px-8 mt-10" type="button">
          Next
        </button>
      </div>
    </section>
  );
}
