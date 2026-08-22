import type { NextConfig } from "next";

/**
 * Política de contenido.
 *
 * `script-src` lleva `'unsafe-inline'` a la fuerza: el script que restituye el
 * tema antes del primer paint es inline por necesidad (sin él hay parpadeo), y
 * Next inyecta los suyos. Firmarlos con nonce obliga a renderizar cada página
 * en cada visita, y este sitio es estático: se perdería el prerenderizado
 * completo a cambio de poco.
 *
 * Aun con esa concesión la política sirve: bloquea cargar scripts, marcos,
 * fuentes y objetos de terceros, que es por donde entra una inyección real.
 * Si algún día se suma analítica, ahí conviene reevaluar el nonce.
 */
const esDesarrollo = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  // `unsafe-eval` solo en desarrollo: React lo necesita ahí para reconstruir
  // pilas de llamada y para el recargado en caliente. En producción no lo usa,
  // y dejarlo abierto sería regalar el vector de inyección más obvio.
  `script-src 'self' 'unsafe-inline'${esDesarrollo ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // El navegador nunca llama a findic.cl: esa consulta vive en el servidor
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const CABECERAS = [
  { key: "Content-Security-Policy", value: CSP },
  // No adivinar el tipo: un .svg subido como si fuera otra cosa no se ejecuta
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  // Al salir del sitio solo viaja el origen, nunca la ruta ni los parámetros
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Un año, con subdominios. Solo tiene efecto sobre HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  /* Sin excepciones para SVG: las maquetas de la galería se sirven tal cual
     desde /public con `unoptimized`, porque el optimizador no aporta nada a un
     vector (no hay redimensionado ni cambio de formato que ganar). Así se evita
     tener que habilitar dangerouslyAllowSVG. */

  /* Decirle al mundo qué framework corre detrás no aporta nada y sí facilita
     buscar exploits por versión. */
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: CABECERAS }];
  },
};

export default nextConfig;
