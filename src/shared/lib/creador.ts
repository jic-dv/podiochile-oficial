/**
 * Datos del creador. Están aquí y no dentro de un componente porque los usan
 * el crédito del pie y el botón flotante de WhatsApp.
 *
 * El avatar se sirve desde nuestro propio dominio y no desde github.com a
 * propósito: traerlo de un tercero haría que cada visita enviara la IP del
 * visitante a esa empresa, y habría que declararlo en la política de privacidad.
 */
export const CREADOR = {
  nombre: "José Ignacio Contreras Castro",
  avatar: "/images/creador/avatar.webp",
  linkedin: "https://www.linkedin.com/in/jic-dv/",
  github: "https://github.com/jic-dv",
} as const;
