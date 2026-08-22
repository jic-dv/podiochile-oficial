import { z } from "zod";

/** Cadena traducible. El español es la fuente; el inglés es obligatorio para no dejar huecos en la UI. */
export const LocalizedSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

export const LocalizedListSchema = z.object({
  es: z.array(z.string().min(1)),
  en: z.array(z.string().min(1)),
});

/** Imagen de la galería. Las dimensiones son obligatorias: sin ellas el
 *  carrusel provoca desplazamiento de layout al cargar (CLS). */
export const ImagenSchema = z.object({
  src: z.string().min(1),
  alt: LocalizedSchema,
  ancho: z.number().int().positive(),
  alto: z.number().int().positive(),
});

/** Bloque "Acerca de este trabajo": el argumento de venta largo */
export const AcercaDeSchema = z.object({
  titular: LocalizedSchema,
  parrafos: LocalizedListSchema,
  listaTitulo: LocalizedSchema,
  lista: LocalizedListSchema,
});

export const NIVELES = ["basico", "estandar", "premium"] as const;
export const NivelSchema = z.enum(NIVELES);

export const PlanSchema = z.object({
  nivel: NivelSchema,
  nombre: LocalizedSchema,
  /** Precio cerrado, o piso del rango cuando `precioEstimado` es true */
  precio: z.number().int().positive(),
  /** Techo del rango. null = precio cerrado, o "desde" sin techo publicado */
  precioHasta: z.number().int().positive().nullable(),
  /**
   * true cuando el precio NO es un compromiso sino una referencia: rangos y
   * "desde". Un CRM cotizado a precio de lista cerrado es la forma más rápida
   * de reventar un presupuesto, así que el dato lleva la marca y la UI la
   * respeta en lugar de confiar en que cada componente se acuerde.
   */
  precioEstimado: z.boolean(),
  entregaDias: z.number().int().positive(),
  entrega: LocalizedSchema,
  revisiones: z.number().int().nonnegative(),
  /**
   * Meses de soporte incluidos en el precio. Sube con el plan, así que no
   * puede vivir en el servicio: si el panel dijera "1 mes incluido" mientras
   * la lista promete tres, la cotización se contradice sola.
   */
  soporteMeses: z.number().int().positive(),
  resumen: LocalizedSchema,
  /** Las 3 lineas cortas que se ven en la pestaña del plan, sin abrir nada */
  bullets: LocalizedListSchema,
  incluye: LocalizedListSchema,
  entregables: LocalizedListSchema,
  /** Rotulo comercial sobre el plan: "Mas vendido", "Recomendado" */
  badge: LocalizedSchema.nullable(),
  destacado: z.boolean(),
}).refine(
  (p) => p.precioHasta === null || p.precioHasta > p.precio,
  { message: "El techo del rango debe superar al piso", path: ["precioHasta"] },
);

/** Celda de la comparativa: presente/ausente, una cantidad, o un texto */
export const CeldaComparativaSchema = z.union([
  z.boolean(),
  z.number(),
  LocalizedSchema,
]);

export const ComparativaFilaSchema = z.object({
  label: LocalizedSchema,
  basico: CeldaComparativaSchema,
  estandar: CeldaComparativaSchema,
  premium: CeldaComparativaSchema,
});

/** Tramo de mantención posterior a la entrega */
export const TramoMantencionSchema = z.object({
  meses: z.number().int().positive(),
  /** 0 = incluido sin costo. null = se cotiza aparte (el CRM no tiene tarifa de lista) */
  precio: z.number().int().nonnegative().nullable(),
});

export const MantencionSchema = z.object({
  /** Referencia mensual sin permanencia, para comparar contra el prepago */
  mensualDesde: z.number().int().positive(),
  /** Ordenados de menor a mayor. El primero es el que va incluido */
  tramos: z.array(TramoMantencionSchema).min(2),
});

export const FaqSchema = z.object({
  pregunta: LocalizedSchema,
  respuesta: LocalizedSchema,
});

export const ServicioSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "El slug debe ser kebab-case en minúsculas"),
  icono: z.enum(["landing", "multipagina", "crm"]),
  titulo: LocalizedSchema,
  subtitulo: LocalizedSchema,
  /** Gancho corto para la tarjeta del home: al grano */
  pitch: LocalizedSchema,
  /** Descripción larga para la página de detalle */
  descripcion: LocalizedSchema,
  galeria: z.array(ImagenSchema).min(1),
  acercaDe: AcercaDeSchema,
  idealPara: LocalizedListSchema,
  tecnologias: z.array(z.string().min(1)),
  proceso: z.array(
    z.object({
      titulo: LocalizedSchema,
      descripcion: LocalizedSchema,
    }),
  ),
  comparativa: z.array(ComparativaFilaSchema),
  faq: z.array(FaqSchema),
  planes: z.tuple([PlanSchema, PlanSchema, PlanSchema]),
  /**
   * Levantamiento pagado previo a la cotización firme, o null si el servicio
   * se cotiza directo. Existe porque un CRM sin alcance cerrado no se puede
   * cotizar: el discovery es el producto que convierte el "a cotizar" en un
   * número, y se descuenta si el proyecto se contrata.
   */
  discovery: z
    .object({
      precio: z.number().int().positive(),
      duracion: LocalizedSchema,
      nota: LocalizedSchema,
    })
    .nullable(),
  destacado: z.boolean(),
  /** Tramos de mantención ofrecidos, o null si el servicio no la ofrece */
  mantencion: MantencionSchema.nullable(),
  /**
   * true cuando la mantención no es opcional sino condición de la entrega.
   * Un CRM en producción sin mantención es un pasivo, no un activo, y
   * ofrecerla como "ahorro" invita a rechazarla.
   */
  mantencionObligatoria: z.boolean(),
});

export type Localized = z.infer<typeof LocalizedSchema>;
export type LocalizedList = z.infer<typeof LocalizedListSchema>;
export type Nivel = z.infer<typeof NivelSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type ComparativaFila = z.infer<typeof ComparativaFilaSchema>;
export type CeldaComparativa = z.infer<typeof CeldaComparativaSchema>;
export type Imagen = z.infer<typeof ImagenSchema>;
export type AcercaDe = z.infer<typeof AcercaDeSchema>;
export type TramoMantencion = z.infer<typeof TramoMantencionSchema>;
export type Mantencion = z.infer<typeof MantencionSchema>;
export type Servicio = z.infer<typeof ServicioSchema>;
