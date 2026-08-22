import { componerTelefono, buscarPais } from "@/features/contact/lib/countries";
import type { DatosContacto } from "@/features/contact/schemas/contact.schema";
import type { Dictionary, Locale } from "@/shared/lib/i18n/dictionaries";
import { CORREO } from "@/features/quotes/lib/quotes";
import type { Servicio } from "@/features/services/schemas/service.schema";

interface Args {
  datos: DatosContacto;
  servicios: Servicio[];
  locale: Locale;
  t: Dictionary;
}

/** Nombre legible del servicio: los valores del formulario son slugs */
function nombreServicio({ datos, servicios, locale, t }: Args): string {
  const servicio = servicios.find((s) => s.slug === datos.servicio);
  if (servicio) return servicio.titulo[locale];
  if (datos.servicio === "mantencion") return t.contacto.mantencion;
  return t.contacto.servicioOtro;
}

/**
 * Construye el enlace `mailto:` que abre la aplicación de correo del
 * dispositivo con la solicitud ya redactada.
 *
 * Los saltos de línea van como %0D%0A (CRLF) porque es lo que respetan de
 * forma consistente los clientes de correo; solo con %0A algunos los ignoran.
 */
export function construirMailto(args: Args): string {
  const { datos, t } = args;
  const pais = buscarPais(datos.pais);
  const telefono = componerTelefono(datos.pais, datos.telefono);

  const lineas = [
    t.contacto.correoIntro,
    "",
    `${t.contacto.correoDatos}:`,
    `- ${t.contacto.correoNombre}: ${datos.nombre}`,
    `- ${t.contacto.correoCorreo}: ${datos.email}`,
    `- ${t.contacto.correoTelefono}: ${telefono}${pais ? ` (${pais.nombre})` : ""}`,
    "",
    `${t.contacto.correoDetalle}:`,
    `- ${t.contacto.correoServicio}: ${nombreServicio(args)}`,
    "",
    `${t.contacto.correoMensaje}:`,
    datos.mensaje?.trim() || t.contacto.correoSinMensaje,
    "",
    t.contacto.correoCierre,
    datos.nombre,
  ];

  const asunto = `${t.contacto.correoAsunto} - ${nombreServicio(args)}`;
  const cuerpo = lineas.join("\r\n");

  return `mailto:${CORREO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
