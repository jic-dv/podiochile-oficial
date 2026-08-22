import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Sin excepciones para SVG: las maquetas de la galería se sirven tal cual
     desde /public con `unoptimized`, porque el optimizador no aporta nada a un
     vector (no hay redimensionado ni cambio de formato que ganar). Así se evita
     tener que habilitar dangerouslyAllowSVG. */
};

export default nextConfig;
