"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBar from "../inputs/SearchBar";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const NavItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
    { label: "Service", path: "/services" },
    { label: "Suppliers", path: "/suppliers" },
  ];
  const pathName = usePathname();
  return (
    <nav className="relative bg-white">
      <div className=" px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex  items-center justify-between">
          <Link href="/">
            <img className="w-10" src="/images/logo.png" alt="" />
          </Link>
          <div className=" md:hidden">
            <SearchBar />
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600  focus:outline-none"
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

        <div
          className={`${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          } absolute inset-x-0 z-50 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            {NavItems.map((item, index) => (
              <Link
                key={index}
                className={`py-2 px-4 text-gray-700  hover:text-red-700 font-bold ${
                  pathName === item.path ? "text-red-700" : ""
                }  `}
                href={item.path}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
