"use client";

import NavBar from "@/components/NavBar/navBar";

export default function ProductsPage() {
  //const id = localStorage.getItem("selectCompany");
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full items-center gap-10 py-5 md:py-10 mt-10">
        company
        {/* <h1 className="text-red-700">{id}</h1> */}
      </div>
    </>
  );
}
