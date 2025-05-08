// src/components/providers/LanguageProvider.tsx
"use client";

import { useLanguageStore } from "@/store/languageStore";
import { useEffect, useState } from "react";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguageStore();

  useEffect(() => {
    setMounted(true);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  if (!mounted) return null;
  return <>{children}</>;
}
