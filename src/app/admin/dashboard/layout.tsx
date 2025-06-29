"use client";

import "@/app/globals.css";
import NavBar from "@/components/NavBar/navBar";
import SideBar from "@/components/NavBar/sideBar";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />{" "}
        <div className="w-full h-[90vh] overflow-y-auto bg-background-light dark:bg-background-dark admin-scrollbar">
          {children}{" "}
        </div>
      </div>
    </>
  );
}
