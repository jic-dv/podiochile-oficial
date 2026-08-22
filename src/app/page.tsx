import ComoFuncionaSection from "@/features/landing/components/ComoFuncionaSection";
import ContactoSection from "@/features/landing/components/ContactoSection";
import FaqSection from "@/features/landing/components/FaqSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import Navbar from "@/features/landing/components/Navbar";
import PreciosSection from "@/features/landing/components/PreciosSection";
import ServiciosSection from "@/features/landing/components/ServiciosSection";
import { getServicios } from "@/features/services/api/services.service";
import JsonLd from "@/shared/components/core/JsonLd";

export default function HomePage() {
  const servicios = getServicios();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.podiochile.com/#organizacion",
        name: "Podio Chile",
        url: "https://www.podiochile.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.podiochile.com/images/logo/logo-podio-chile.svg",
          width: 800,
          height: 150,
        },
        image: "https://www.podiochile.com/opengraph-image",
        email: "contacto@podiochile.com",
        telephone: "+56951730743",
        description:
          "Landing pages, sitios web multipágina y aplicaciones web a medida como CRM, para profesionales y empresas.",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.podiochile.com/#sitio",
        url: "https://www.podiochile.com",
        name: "Podio Chile",
        inLanguage: "es-CL",
        publisher: { "@id": "https://www.podiochile.com/#organizacion" },
      },
      {
        "@type": "ItemList",
        name: "Servicios de desarrollo de páginas y aplicaciones web",
        itemListElement: servicios.map((servicio, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: servicio.titulo.es,
            description: servicio.pitch.es,
            url: `https://www.podiochile.com/servicios/${servicio.slug}`,
            provider: { "@id": "https://www.podiochile.com/#organizacion" },
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <Hero />
        <ServiciosSection servicios={servicios} />
        <ComoFuncionaSection />
        <FeaturesSection />
        <PreciosSection servicios={servicios} />
        <FaqSection />
        <ContactoSection servicios={servicios} />
      </main>
      <Footer servicios={servicios} />
    </>
  );
}
