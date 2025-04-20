export default function HowItWork() {
  return (
    <div className="relative flex flex-col items-center px-2 md:px-[150px] py-[30px] ">
      <img
        src="/images/Ellipse1.png"
        className="absolute w-[200px] top-20 right-0 hidden md:block"
        alt=""
      />
      <div className="flex flex-col items-center gap-4 mt-16">
        <h2
          className="font-bold text-3xl"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          How does the site work?
        </h2>
        <p className="text-lg leading-relaxed z-20">
          Join our global network easily
          <br /> Browse available suppliers or deals <br />
          use smart filters to find the best business opportunities.
          <br /> Connect with the right supplier
          <br /> Interact directly via chat or the request for proposal form.
          <br />
          Close your deal securely
          <br /> Complete business transactions through the website
          administration.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        <h2
          className="font-bold text-3xl mt-20"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          Website Features:
        </h2>
        <p className="text-lg leading-relaxed lg:px-30">
          A global database of thousands of suppliers and merchants.
          <br /> An advanced filtering system to quickly find the right
          supplier.
          <br />
          Professional support to ensure a smooth and secure business
          experience.
          <br />
          Integration with payment methods and logistics services to facilitate
          import and export operations.
        </p>
      </div>
    </div>
  );
}
