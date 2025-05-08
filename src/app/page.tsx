"use client";
import Hero from "@/components/homepage/hero";
import WellCome from "@/components/homepage/hero/wellCome";
import NavBar from "@/components/NavBar/navBar";
import Gallery from "@/components/homepage/Gallery";
import Exploer from "@/components/homepage/Suppliers/explore";
import HowItWork from "@/components/homepage/how_It_Work";
import CTA from "@/components/homepage/CTA";
import Footer from "@/components/NavBar/Footer";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <Hero />
      <WellCome />
      <Exploer />
      <Gallery />
      <HowItWork />
      <CTA />
      <Footer />
    </div>
  );
}
