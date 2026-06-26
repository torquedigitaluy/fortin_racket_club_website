import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import ClasesPersonalizadas from "@/components/sections/ClasesPersonalizadas";
import TorneoCalendario from "@/components/sections/TorneoCalendario";
import Beneficios from "@/components/sections/Beneficios";
import CtaPatrocinadores from "@/components/sections/CtaPatrocinadores";
import Entrenadores from "@/components/sections/Entrenadores";
import PlanesSocio from "@/components/sections/PlanesSocio";
import ReservaCanchas from "@/components/sections/ReservaCanchas";
import Estadisticas from "@/components/sections/Estadisticas";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <ClasesPersonalizadas />
        <TorneoCalendario />
        <Beneficios />
        <CtaPatrocinadores />
        <Entrenadores />
        <PlanesSocio />
        <ReservaCanchas />
        <Estadisticas />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
