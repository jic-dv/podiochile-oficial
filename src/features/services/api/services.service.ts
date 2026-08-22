import { serviciosMock } from "@/mocks/services";
import type { Servicio, Nivel } from "@/features/services/schemas/service.schema";

export function getServicios(): Servicio[] {
  return serviciosMock;
}

export function getServicio(slug: string): Servicio | undefined {
  return serviciosMock.find((s) => s.slug === slug);
}

export function getSlugs(): string[] {
  return serviciosMock.map((s) => s.slug);
}

export function getOtrosServicios(slug: string): Servicio[] {
  return serviciosMock.filter((s) => s.slug !== slug);
}

/** Precio de entrada del servicio, para la tarjeta del home */
export function getPrecioDesde(servicio: Servicio): number {
  return Math.min(...servicio.planes.map((p) => p.precio));
}

export function getPlanPorNivel(servicio: Servicio, nivel: Nivel) {
  return servicio.planes.find((p) => p.nivel === nivel) ?? servicio.planes[0];
}
