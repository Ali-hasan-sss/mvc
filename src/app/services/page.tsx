"use client";
import Footer from "@/components/NavBar/Footer";
import NavBar from "@/components/NavBar/navBar";
import ServicesHero from "@/components/servicesPage/Hero";
import ServiceCard from "@/components/servicesPage/ServiceCard";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  const services = [
    {
      image: "images/service1.png",
      title: "services1",
      futuers: ["services1f1", "services1f2", "services1f3"],
    },
    {
      image: "images/service2.png",
      title: "services2",
      futuers: ["services2f1", "services2f2", "services2f3"],
    },
    {
      image: "images/service3.png",
      title: "services3",
      futuers: ["services3f1", "services3f2", "services3f3"],
    },
    {
      image: "images/service4.png",
      title: "services4",
      futuers: ["services4f1", "services4f2", "services4f3"],
    },
    {
      image: "images/service5.png",
      title: "services5",
      futuers: ["services5f1", "services5f2", "services5f3"],
    },
    {
      image: "images/service6.png",
      title: "services6",
      futuers: ["services6f1", "services6f2", "services6f3"],
    },
  ];
  return (
    <>
      <NavBar />
      <ServicesHero />
      {/* after hero */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between justify-start px-6 md:px-14">
        <h2
          className="font-bold md:mt-4 md:ml-2 text-2xl md:w-1/4 w-full"
          style={{ fontFamily: "var(--font-Timmana)" }}
        >
          {t("services.section_title")}
        </h2>
        <p className="w-full md:w-1/2 text-gray-600  md:pr-10 ">
          {t("services.section_des")}
        </p>
      </div>
      <div className=" md:px-14">
        <div className=" md:pr-10 py-6 md:mr-5 md:py-15 flex md:flex-wrap items-start md:items-center md:justify-center lg:justify-between flex-wrap md:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`w-full md:w-[300px] flex ${
                index % 2 === 0
                  ? "justify-start md:justify-center"
                  : "md:justify-between justify-end md:justify-center"
              }`}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
      {/**CTA */}
      <div className="flex items-center justify-between  md:px-14 mb-3">
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
            <p className="font-bold text-[18px] md:text-xl text-white">
              {t("services.section_q")}
            </p>
          </div>

          <button
            type="button"
            className="bg-white hover:bg-gray-300 py-2 px-4 rounded-xl md:w-1/4 cursor-pointer"
          >
            {t("Contact_us")}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
