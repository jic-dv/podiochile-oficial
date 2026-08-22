import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import NoEncontrado from "@/features/landing/components/NoEncontrado";
import { getServicios } from "@/features/services/api/services.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o cambió de dirección. Vuelve al inicio o revisa nuestros servicios de desarrollo web.",
  // El estado 404 ya evita la indexación; esto lo deja explícito para los
  // rastreadores que igualmente sigan el enlace
  robots: { index: false, follow: true },
};

/**
 * 404 global. Cubre las rutas inexistentes y también las llamadas a
 * notFound(), que es como responde /servicios/[slug] ante un slug que no
 * está en el catálogo.
 */
export default function NotFound() {
  const servicios = getServicios();

  return (
    <>
      <Navbar />
      <main>
        <NoEncontrado servicios={servicios} />
      </main>
      <Footer servicios={servicios} />
    </>
  );
}
