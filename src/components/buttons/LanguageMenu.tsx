"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "@/store/languageStore";
import { ChevronDown, Globe } from "lucide-react";

export default function LangMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language, availableLanguages, setLanguage } = useLanguageStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center p-1 w-17 h-10 justify-center text-lg hover:text-red-700 cursor-pointer focus:outline-none"
        title="اختر اللغة"
      >
        <Globe className="" />
        <span className="px-1 font-bold  text-red-700"> {language} </span>
        <ChevronDown />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 z-20 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-sm">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                language === lang.code ? "font-bold text-red-700" : ""
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
