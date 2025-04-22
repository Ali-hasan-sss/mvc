import ChooseUs from "@/components/AboutPage/ChooseUs";
import CTA_About from "@/components/AboutPage/CTA_About";
import AboutHero from "@/components/AboutPage/Hero";
import Mession from "@/components/AboutPage/Missions";
import SuccessNum from "@/components/AboutPage/SuccessNum";
import WeOffer from "@/components/AboutPage/WeOffer";
import NavBar from "@/components/NavBar/navBar";

export default function About() {
  return (
    <>
      <NavBar />
      <AboutHero />
      <Mession />
      <SuccessNum />
      <WeOffer />
      <ChooseUs />
      <CTA_About />
    </>
  );
}
