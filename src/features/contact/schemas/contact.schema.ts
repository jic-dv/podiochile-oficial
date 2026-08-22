import { z } from "zod";
import { CODIGOS_PAIS, buscarPais } from "@/features/contact/lib/countries";

export const LIMITES = {
  nombreMin: 3,
  nombreMax: 80,
  emailMax: 254, // longitud máxima de una dirección según RFC 5321
  telefonoMax: 15, // E.164: nunca más de 15 dígitos contando el prefijo
  mensajeMax: 500,
} as const;

/** Servicios que no vienen del catálogo pero son opciones válidas del formulario */
export const SERVICIOS_EXTRA = ["mantencion", "otro"] as const;

/**
 * Letras (con acentos y diacríticos), espacios, apóstrofo, punto y guion.
 * Deja fuera dígitos y todo signo que se usa para inyectar: comillas, punto y
 * coma, paréntesis angulares, llaves y barras.
 */
const NOMBRE_PERMITIDO = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;

/**
 * Rechaza caracteres de control. Se comprueba por código y no con una expresión
 * regular con escapes: esos escapes se corrompen con facilidad al editar el
 * archivo y el fallo sería silencioso.
 *
 * `permitirSaltos` deja pasar salto de línea y retorno de carro, que el área de
 * texto sí admite pero un campo de una sola línea no.
 */
function sinControl(valor: string, permitirSaltos = false): boolean {
  for (let i = 0; i < valor.length; i++) {
    const c = valor.charCodeAt(i);
    if (c === 10 || c === 13) {
      if (!permitirSaltos) return false;
      continue;
    }
    if (c < 32 || c === 127) return false;
  }
  return true;
}

interface Opciones {
  /** Slugs del catálogo. El servidor pasa los reales; el cliente, los que pintó. */
  serviciosValidos: readonly string[];
}

/**
 * El schema se construye con la lista de servicios porque quien manda es el
 * catálogo, no una copia escrita a mano que se desincroniza al agregar uno.
 *
 * Nota sobre inyección SQL: no se previene filtrando texto, se previene con
 * consultas parametrizadas en la capa de datos. Estas reglas existen para que
 * el dato sea coherente y para cortar cargas absurdas. Cuando este formulario
 * escriba en una base, la consulta debe ir parametrizada igual.
 */
export function crearContactoSchema({ serviciosValidos }: Opciones) {
  // z.enum exige al menos un valor en el tipo; SERVICIOS_EXTRA lo garantiza
  const opciones: [string, ...string[]] = [
    ...SERVICIOS_EXTRA,
    ...serviciosValidos,
  ];

  return z
    .object({
      nombre: z
        .string()
        .trim()
        .min(LIMITES.nombreMin, "nombreCorto")
        .max(LIMITES.nombreMax, "nombreLargo")
        .refine((v) => sinControl(v), "nombreInvalido")
        .refine((v) => NOMBRE_PERMITIDO.test(v), "nombreInvalido")
        // El campo pide nombre completo: se exige al menos nombre y apellido
        .refine((v) => v.split(/\s+/).filter(Boolean).length >= 2, "nombreIncompleto"),

      email: z
        .string()
        .trim()
        .toLowerCase()
        .max(LIMITES.emailMax, "emailLargo")
        .refine((v) => sinControl(v), "emailInvalido")
        .pipe(z.email("emailInvalido")),

      pais: z.enum(CODIGOS_PAIS, { message: "paisInvalido" }),

      telefono: z
        .string()
        .trim()
        .regex(/^[0-9]+$/, "telefonoInvalido")
        .max(LIMITES.telefonoMax, "telefonoInvalido"),

      servicio: z.enum(opciones, { message: "servicioInvalido" }),

      mensaje: z
        .string()
        .trim()
        .max(LIMITES.mensajeMax, "mensajeLargo")
        .refine((v) => sinControl(v, true), "mensajeInvalido")
        .optional()
        .or(z.literal("")),

      /** Trampa para robots: está oculta, así que una persona nunca la llena */
      sitioWeb: z.string().max(0, "spam").optional().or(z.literal("")),
    })
    .superRefine((datos, ctx) => {
      // La cantidad de dígitos válida depende del país elegido
      const pais = buscarPais(datos.pais);
      if (!pais) return;

      const n = datos.telefono.length;
      if (n < pais.min || n > pais.max) {
        ctx.addIssue({ code: "custom", path: ["telefono"], message: "telefonoLongitud" });
      }
    });
}

export type DatosContacto = z.infer<ReturnType<typeof crearContactoSchema>>;

export type CampoContacto =
  | "nombre"
  | "email"
  | "pais"
  | "telefono"
  | "servicio"
  | "mensaje";

export type ResultadoEnvio =
  | { ok: true }
  | { ok: false; errores: Partial<Record<CampoContacto, string>>; general?: string };
