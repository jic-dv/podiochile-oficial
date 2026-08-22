import BannerCookies from "@/features/consent/components/BannerCookies";
import ScrollAlTope from "@/shared/components/core/ScrollAlTope";
import BotonesFlotantes from "@/shared/components/ui/BotonesFlotantes";
import { DolarProvider } from "@/shared/lib/currency/DolarProvider";
import { getDolar } from "@/shared/lib/currency/dolar.service";
import { initScript } from "@/shared/lib/theme";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const SITIO = "https://www.podiochile.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default:
      "Podio Chile - Páginas y Aplicaciones Web Profesionales para Emprendedores y Empresas",
    template: "%s | Podio Chile",
  },
  description:
    "Diseño y desarrollo de landing pages, sitios web multipágina y aplicaciones web a medida como CRM, para profesionales, emprendedores y empresas. Precios transparentes y entrega con fecha.",
  keywords: [
    "diseño web Chile",
    "desarrollo web Chile",
    "aplicaciones web a medida Chile",
    "desarrollo de software a medida Chile",
    "landing page Chile",
    "página web empresa Chile",
    "CRM a medida Chile",
    "sistema de gestión para pymes Chile",
    "páginas web para emprendedores",
  ],
  authors: [{ name: "Podio Chile" }],
  publisher: "Podio Chile",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITIO,
    siteName: "Podio Chile",
    title:
      "Podio Chile - Páginas y Aplicaciones Web Profesionales para Emprendedores y Empresas",
    description:
      "Landing pages, sitios web multipágina y aplicaciones web a medida como CRM, para profesionales y empresas.",
    // La imagen la genera app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Podio Chile - Páginas y Aplicaciones Web Profesionales",
    description:
      "Landing pages, sitios multipágina y aplicaciones web a medida como CRM, para empresas.",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  applicationName: "Podio Chile",
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  // Valores tomados de --color-surface en cada tema, no elegidos a ojo
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Una sola consulta cada 6 horas para todo el tráfico: el valor baja por
  // contexto y ningún navegador golpea la API de terceros
  const dolar = await getDolar();

  return (
    <html lang="es-CL" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Restituye tema, idioma y la clase js antes del primer paint */}
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        <DolarProvider valor={dolar}>
          <ScrollAlTope />
          {children}
          <BotonesFlotantes />
          <BannerCookies />
        </DolarProvider>
      </body>
    </html>
  );
}
