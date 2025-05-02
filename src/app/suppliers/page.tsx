import NavBar from "@/components/NavBar/navBar";
import FindSuppliers from "@/components/SupplierPage/FindSuppliers";
import SupplierHero from "@/components/SupplierPage/hero";
import HowStarted from "@/components/SupplierPage/howStarted";
import SupplierCarousel from "@/components/SupplierPage/SupplierCarousel";

export default function SupplierPage() {
  return (
    <section>
      <NavBar />
      <SupplierHero />
      <FindSuppliers />
      <SupplierCarousel />
      <HowStarted />
    </section>
  );
}
