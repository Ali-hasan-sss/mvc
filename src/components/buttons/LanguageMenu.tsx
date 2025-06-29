"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "@/store/languageStore";
import { ChevronDown, Globe } from "lucide-react";
import { Language } from "../../../types";

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

  // إغلاق القائمة عند تغيير اللغة
  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center p-2 justify-center text-lg hover:text-red-700 cursor-pointer focus:outline-none rounded-lg hover:bg-gray-50 transition-colors"
        title="اختر اللغة"
        aria-label="Language menu"
      >
        <Globe className="w-5 h-5" />
        <span className="px-2 font-bold text-red-700 text-sm md:text-base">
          {language === "ar" ? "العربية" : "English"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-sm min-w-max">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                language === lang.code
                  ? "font-bold text-red-700 bg-red-50"
                  : "text-gray-700"
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
