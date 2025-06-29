"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBar from "../inputs/SearchBar";
import LangMenu from "../buttons/LanguageMenu";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const NavItems = [
    { label: "Home", path: "/" },
    { label: "About_us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Suppliers", path: "/suppliers" },
  ];

  // منع السكرول عند فتح القائمة على الأجهزة الصغيرة
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <nav className="relative bg-white w-full z-50">
      <div className="px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        {/* Header with Logo and Mobile Controls */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <img className="w-10" src="/images/logo.png" alt="Logo" />
          </Link>

          {/* Mobile Search Bar */}
          <div className="md:hidden">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none p-2"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen
              ? "translate-x-0 opacity-100 visible"
              : "translate-x-full opacity-0 invisible"
          } fixed inset-0 z-50 bg-white md:hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <img className="w-10" src="/images/logo.png" alt="Logo" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-600 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 px-6 py-4">
              <div className="flex flex-col space-y-4">
                {NavItems.map((item, index) => (
                  <Link
                    key={index}
                    className={`py-3 px-4 text-lg font-medium border-b border-gray-100 ${
                      pathName === item.path
                        ? "text-red-700 border-red-700"
                        : "text-gray-700 hover:text-red-700"
                    }`}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(`navbar.${item.label}`)}
                  </Link>
                ))}

                {/* Language Menu for Mobile */}
                <div className="py-3 px-4 border-b border-gray-100">
                  <LangMenu />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <div className="flex items-center space-x-6">
            {NavItems.map((item, index) => (
              <Link
                key={index}
                className={`py-2 px-4 text-gray-700 hover:text-red-700 font-bold transition-colors ${
                  pathName === item.path ? "text-red-700" : ""
                }`}
                href={item.path}
              >
                {t(`navbar.${item.label}`)}
              </Link>
            ))}
          </div>

          {/* Desktop Language Menu */}
          <div className="ml-4">
            <LangMenu />
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
