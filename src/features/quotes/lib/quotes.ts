import { formatCLP, formatPrecioPlan, formatUSD } from "@/shared/lib/formatters";
import { clpAUsd, type Dolar } from "@/shared/lib/currency/dolar.service";
import type {
  Servicio, Plan, TramoMantencion,
} from "@/features/services/schemas/service.schema";
import type { Locale, Dictionary } from "@/shared/lib/i18n/dictionaries";

/** Número comercial en formato internacional sin signos, como lo exige wa.me */
export const WHATSAPP_NUMERO = "56951730743";
export const WHATSAPP_DISPLAY = "+56 9 5173 0743";
export const CORREO = "contacto@podiochile.com";

/** Un precio cerrado no se rotula "referencial": eso lo desvaloriza */
export function etiquetaPrecio(plan: Plan, t: Dictionary): string {
  return plan.precioEstimado ? t.cotizar.precioEstimado : t.cotizar.precio;
}

/** El tramo que ya viene en el precio del plan */
export function tramoIncluido(plan: Plan): TramoMantencion {
  return { meses: plan.soporteMeses, precio: 0 };
}

/** Tramos que el cliente puede sumar: solo los que superan lo ya incluido */
export function tramosAmpliables(
  servicio: Servicio,
  plan: Plan,
): TramoMantencion[] {
  return (servicio.mantencion?.tramos ?? []).filter(
    (x) => x.meses > plan.soporteMeses,
  );
}

/** "1 mes", "3 meses", "1 año": el año no se escribe como 12 meses */
export function etiquetaTramo(tramo: TramoMantencion, t: Dictionary): string {
  if (tramo.meses === 12) return t.detalle.mantencionAnio;
  const unidad = tramo.meses === 1 ? t.detalle.mantencionMes : t.detalle.mantencionMeses;
  return `${tramo.meses} ${unidad}`;
}

/** Precio de un tramo: incluido, a cotizar, o el valor */
export function precioTramo(tramo: TramoMantencion, t: Dictionary): string {
  if (tramo.precio === null) return t.detalle.mantencionCotizar;
  if (tramo.precio === 0) return t.detalle.mantencionIncluida;
  return formatCLP(tramo.precio);
}

interface ResumenArgs {
  servicio: Servicio;
  plan: Plan;
  /** Tramo de mantención elegido, o null si el servicio no la ofrece */
  tramo: TramoMantencion | null;
  /** Valor del dólar, para adjuntar la conversión. null la omite. */
  dolar?: Dolar | null;
  locale: Locale;
  t: Dictionary;
}

/** Resumen en texto plano del servicio y plan elegidos, para WhatsApp o correo */
export function construirResumen({
  servicio, plan, tramo, dolar, locale, t,
}: ResumenArgs): string {
  // La conversión viaja en el mensaje porque es el número sobre el que el
  // cliente decide, y quien lee en inglés no tiene por qué convertir a mano
  const enUsd = dolar
    ? ` (≈ ${formatUSD(clpAUsd(plan.precio, dolar.valor))}${
        plan.precioHasta ? ` - ${formatUSD(clpAUsd(plan.precioHasta, dolar.valor))}` : ""
      })`
    : "";

  const lineas = [
    t.cotizar.mensajeWhatsapp,
    "",
    `${t.cotizar.servicio}: ${servicio.titulo[locale]}`,
    `${t.cotizar.plan}: ${plan.nombre[locale]}`,
    `${etiquetaPrecio(plan, t)}: ${formatPrecioPlan(plan, t.servicios.desde)} CLP${enUsd}`,
    `${t.cotizar.plazo}: ${plan.entrega[locale]}`,
    ...(tramo
      ? [`${t.cotizar.mantencion}: ${etiquetaTramo(tramo, t)} (${precioTramo(tramo, t)})`]
      : []),
    "",
    `${t.cotizar.mensajeIncluye}`,
    // bullets son los 6 destacados e incluye es el resto: al cliente le llega
    // la lista completa, no solo la mitad que estaba plegada en pantalla
    ...[...plan.bullets[locale], ...plan.incluye[locale]].map((item) => `- ${item}`),
    "",
    t.cotizar.mensajeCierre,
  ];

  return lineas.join("\n");
}

/** Enlace wa.me con el resumen ya redactado */
export function construirEnlaceWhatsapp(resumen: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(resumen)}`;
}

/** Enlace al formulario de contacto con el servicio y plan preseleccionados */
export function construirEnlaceFormulario(
  slug: string,
  nivel: string,
  mesesMantencion?: number,
): string {
  const params = new URLSearchParams({ servicio: slug, plan: nivel });
  if (mesesMantencion !== undefined) params.set("mantencion", String(mesesMantencion));
  return `/?${params.toString()}#contacto`;
}
