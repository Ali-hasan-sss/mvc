export default function Hero() {
  return (
    <section className="px-10 py-6 w-full mb-10 md:mb-0 md:min-h-[90vh] flex items-center justify-between gap-4">
      <div className="w-1/2 hidden md:flex   items-center justify-center">
        <img src="images/herologo.png" className="w-[400px] " />
      </div>
      <div className="w-full md:w-1/2 px-2 md:px-10 flex flex-col items-center justify-center">
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
