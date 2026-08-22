import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import ServicioDetalle from "@/features/services/components/ServicioDetalle";
import JsonLd from "@/shared/components/core/JsonLd";
import {
  getServicio, getSlugs, getServicios, getOtrosServicios, getPrecioDesde,
} from "@/features/services/api/services.service";

const SITIO = "https://www.podiochile.com";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);

  if (!servicio) return { title: "Servicio no encontrado" };

  const url = `${SITIO}/servicios/${servicio.slug}`;
  const title = `${servicio.titulo.es} - ${servicio.subtitulo.es}`;
  const description = `${servicio.pitch.es} ${servicio.planes.length} planes desde ${new Intl.NumberFormat(
    "es-CL",
    { style: "currency", currency: "CLP", maximumFractionDigits: 0 },
  ).format(getPrecioDesde(servicio))}.`;

  return {
    title,
    description,
    alternates: { canonical: `/servicios/${servicio.slug}` },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url,
      siteName: "Podio Chile",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicioPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const servicio = getServicio(slug);

  if (!servicio) notFound();

  const otros = getOtrosServicios(slug);
  const url = `${SITIO}/servicios/${servicio.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#servicio`,
        name: servicio.titulo.es,
        description: servicio.descripcion.es,
        url,
        serviceType: servicio.titulo.es,
        areaServed: { "@type": "Country", name: "Chile" },
        provider: {
          "@type": "Organization",
          name: "Podio Chile",
          url: SITIO,
        },
        // Un rango no se declara como Offer de precio único: schema.org tiene
        // AggregateOffer justamente para eso, y Google marca como error el
        // Offer cuyo precio publicado no es el precio real de compra.
        offers: servicio.planes.map((plan) =>
          plan.precioEstimado
            ? {
                "@type": "AggregateOffer",
                name: `${servicio.titulo.es} - ${plan.nombre.es}`,
                description: plan.resumen.es,
                lowPrice: plan.precio,
                ...(plan.precioHasta === null ? {} : { highPrice: plan.precioHasta }),
                priceCurrency: "CLP",
                offerCount: 1,
                url,
              }
            : {
                "@type": "Offer",
                name: `${servicio.titulo.es} - ${plan.nombre.es}`,
                description: plan.resumen.es,
                price: plan.precio,
                priceCurrency: "CLP",
                availability: "https://schema.org/InStock",
                url,
              },
        ),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO },
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${SITIO}/#servicios` },
          { "@type": "ListItem", position: 3, name: servicio.titulo.es, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <ServicioDetalle servicio={servicio} otros={otros} />
      </main>
      <Footer servicios={getServicios()} />
    </>
  );
}
