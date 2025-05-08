"use client";

import { Facebook, LocationEdit, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const menuItems = [
    { label: "Cup_Cake", link: "#" },
    { label: "Sandwich", link: "#" },
    { label: "Cookies", link: "#" },
    { label: "Bread", link: "#" },
    { label: "Biscuites", link: "#" },
    { label: "Stoberry_Cake", link: "#" },
  ];
  const servicesItems = [
    { label: "Home_Delivery", link: "#" },
    { label: "Office_Delivery", link: "#" },
    { label: "Event", link: "#" },
    { label: "Birthday", link: "#" },
    { label: "Resturent", link: "#" },
  ];
  const contactItems = [
    {
      label: "Location",
      link: "#",
      icon: <LocationEdit className="text-red-700 py-1" />,
    },
    {
      label: "+9688537172",
      link: "#",
      icon: <Phone className="text-red-700 py-1" />,
    },
    {
      label: "+9688537172",
      link: "#",
      icon: <Facebook className="text-red-700  py-1" />,
    },
  ];
  return (
    <div className="flex items-center gap-10 w-full bg-black px-2 py-5 md:py-20 md:px-10 lg:px-20 ">
      <div className="hidden md:flex items-crnter justify-center w-1/4">
        <img src="/images/herologo.png" className="w-[200px]" alt="" />
      </div>
      <div className="flex items-crnter justify-between w-full md:w-3/4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">{t("footer.Menu")}</h3>
          <ul className="text-gray-300 text-sm md:text-lg">
            {menuItems.map((item, index) => (
              <li className="py-1" key={index}>
                <Link className="hover:text-red-700" href={item.link}>
                  {t(`footer.${item.label}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">
            {t("navbar.Services")}
          </h3>
          <ul className="text-gray-300 text-sm md:text-lg">
            {servicesItems.map((item, index) => (
              <li className="py-1" key={index}>
                <Link className="hover:text-red-700" href={item.link}>
                  {t(`footer.${item.label}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">
            {t("footer.Contact")}
          </h3>
          <ul className="text-gray-300 text-sm md:text-lg">
            {contactItems.map((item, index) => (
              <li className="py-3" key={index}>
                <Link
                  className="flex items-center hover:text-red-700"
                  href={item.link}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
