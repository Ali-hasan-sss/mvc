"use client";

import { create } from "zustand";
import i18n from "@/i18n";
import { Language } from "../../types";

type LanguageStore = {
  language: Language;
  availableLanguages: { code: Language; name: string; dir: "ltr" | "rtl" }[];
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => {
  // احصل على اللغة فقط إذا كنت في المتصفح
  const defaultLang =
    typeof window !== "undefined"
      ? (localStorage.getItem("i18nextLng") as Language) || "en"
      : "en";

  return {
    language: defaultLang,
    availableLanguages: [
      { code: "en", name: "English", dir: "ltr" },
      { code: "ar", name: "العربية", dir: "rtl" },
    ],
    setLanguage: (lang) => {
      if (typeof window !== "undefined") {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
        const dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
      }
      set({ language: lang });
    },
  };
});
