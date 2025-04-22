import NavBar from "@/components/NavBar/navBar";
import ServicesHero from "@/components/servicesPage/Hero";
import ServiceCard from "@/components/servicesPage/ServiceCard";

export default function Services() {
  const services = [
    {
      image: "images/service1.png",
      title: "Global Supplier Directory",
      futuers: [
        "A massive database containing suppliers from various industries and countries.",
        "Search by country, industrial sector, and product type to quickly locate the right supplier.",
        "Detailed profiles for each supplier, including contact information, products, and certifications",
      ],
    },
    {
      image: "images/service2.png",
      title: "Deal and Offer Management",
      futuers: [
        "A platform to assist with purchase orders and offers.",
        "Ability to communicate with other suppliers via the messaging system.",
        "Easily track orders and manage all business transactions.",
      ],
    },
    {
      image: "images/service3.png",
      title: "Import and Export Support",
      futuers: [
        "Helping merchants find reliable international suppliers.",
        "Support for shipping and customs clearance operations through specialized partners.",
        "Providing logistics solutions to facilitate transportation and delivery operations.",
      ],
    },
    {
      image: "images/service4.png",
      title: "Smart Search and Filtering Tools",
      futuers: [
        "An advanced search system allows users to easily find suppliers.",
        "Filter results by ratings, prices, countries, and product availability.",
        "The ability to compare suppliers to get the best deals.",
      ],
    },
    {
      image: "images/service5.png",
      title: " Customer Support and Business Consulting",
      futuers: [
        "Allows merchants to evaluate suppliers based on their actual experience.",
        " Transparent reviews help make better business decisions.",
        "Build a trusted reputation for verified suppliers.",
      ],
    },
    {
      image: "images/service6.png",
      title: " Customer Support and Business Consulting",
      futuers: [
        "A support team is available to answer merchant and supplier inquiries.",
        "Provide consultations on best business practices, negotiation, and deal management.",
        "Assist in resolving business disputes and building trust between parties.",
      ],
    },
  ];
  return (
    <>
      <NavBar />
      <ServicesHero />
      {/* after hero */}
      <div className="flex items-center justify-between px-14">
        <h2
          className="font-bold mt-4 ml-2 text-2xl w-1/4"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          Take Business Services From Our Experienced Stuff
        </h2>
        <p className="w-1/2 text-gray-600 pr-10 ">
          MVC offers a range of services designed to connect suppliers and
          merchants from around the world, facilitating trade and expanding
          global markets.
        </p>
      </div>
      <div className=" px-14">
        <div className=" pr-10 py-15 flex flex-wrap items-center justify-between gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
      {/**CTA */}
      <div className="flex items-center justify-between px-14 mb-3">
        <div
          className="py-10 px-5 flex w-full flex-col md:flex-row gap-4 items-center justify-between"
          style={{
            background:
              "linear-gradient(to left, #F5A623CC 40%, #006D77CC 70%)",
          }}
        >
          <div className="flex items-center gap-4">
            {" "}
            <img src="images/servicesCTA.png" className="w-10" alt="" />
            <p className="font-bold text-xl text-white">
              Are you a supplier or merchant?
            </p>
          </div>

          <button
            type="button"
            className="bg-white hover:bg-gray-300 py-2 px-4 rounded-xl md:w-1/4 cursor-pointer"
          >
            Contact us{" "}
          </button>
        </div>
      </div>
    </>
  );
}
