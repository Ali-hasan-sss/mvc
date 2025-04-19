"use client";
import Hero from "@/components/hero";
import WellCome from "@/components/hero/wellCome";
import NavBar from "@/components/NavBar/navBar";
import Gallery from "@/components/slider/Gallery";
import Exploer from "@/components/Suppliers/explore";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <Hero />
      <WellCome />
      <Exploer />
      <Gallery />
    </div>
  );
}
