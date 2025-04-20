import AboutHero from "@/components/AboutPage/Hero";
import Mession from "@/components/AboutPage/Missions";
import SuccessNum from "@/components/AboutPage/SuccessNum";
import NavBar from "@/components/NavBar/navBar";

export default function About() {
  return (
    <div>
      <NavBar />
      <AboutHero />
      <Mession />
      <SuccessNum />
    </div>
  );
}
