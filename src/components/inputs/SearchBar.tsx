// SearchBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsOpen((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  // ⛔️ إغلاق عند الضغط خارج العنصر
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center">
      {/* أيقونة البحث */}
      <button
        onClick={toggleSearch}
        className="p-2 text-gray-600 hover:text-blac cursor-pointer"
      >
        <Search />
      </button>

      {/* input يظهر بشكل سلس */}
      <AnimatePresence>
        {isOpen && (
          <motion.input
            ref={inputRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            placeholder={t("admin.search")}
            className="ml-2 px-3 py-1 text-sm border border-gray-300 rounded-full outline-none focus:ring focus:ring-red-700"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
