import {
  construirEnlaceFormulario,
  construirEnlaceWhatsapp,
  construirResumen,
  etiquetaPrecio,
  etiquetaTramo,
  precioTramo,
  tramoIncluido,
  tramosAmpliables,
} from "@/features/quotes/lib/quotes";
import { serviciosMock } from "@/mocks/services";
import { formatCLP, formatUSD } from "@/shared/lib/formatters";
import { clpAUsd, usdAClp } from "@/shared/lib/currency/dolar.service";
import { es } from "@/shared/lib/i18n/dictionaries";

const landing = serviciosMock.find((s) => s.slug === "landing-page")!;
const crm = serviciosMock.find((s) => s.slug === "crm-personalizado")!;

const basicoLanding = landing.planes[0];
const basicoCrm = crm.planes[0];

const tramoGratis = landing.mantencion!.tramos[0];
const tramoSeis = landing.mantencion!.tramos.find((x) => x.meses === 6)!;
const tramoAnio = landing.mantencion!.tramos.find((x) => x.meses === 12)!;
const tramoCrm = crm.mantencion!.tramos.find((x) => x.meses === 6)!;

const resumen = construirResumen({
  servicio: landing,
  plan: basicoLanding,
  tramo: tramoSeis,
  locale: "es",
  t: es,
});
const resumenSinTramo = construirResumen({
  servicio: landing,
  plan: basicoLanding,
  tramo: null,
  locale: "es",
  t: es,
});
const resumenCrm = construirResumen({
  servicio: crm,
  plan: basicoCrm,
  tramo: tramoGratis,
  locale: "es",
  t: es,
});

const comprobaciones: [string, boolean][] = [
  // Etiquetas de tramo
  [
    "el tramo incluido se rotula como incluido",
    precioTramo(tramoGratis, es) === "Incluida",
  ],
  ["1 mes va en singular", etiquetaTramo(tramoGratis, es) === "1 mes"],
  ["6 meses va en plural", etiquetaTramo(tramoSeis, es) === "6 meses"],
  ["12 meses se escribe como 1 año", etiquetaTramo(tramoAnio, es) === "1 año"],
  [
    "el tramo sin tarifa se rotula a cotizar",
    precioTramo(tramoCrm, es) === "A cotizar",
  ],
  [
    "el tramo con precio muestra el valor",
    precioTramo(tramoSeis, es) === formatCLP(tramoSeis.precio!),
  ],

  // Un precio cerrado no se rotula referencial
  [
    "precio cerrado se rotula Precio",
    etiquetaPrecio(basicoLanding, es) === "Precio",
  ],
  [
    "precio en rango se rotula referencial",
    etiquetaPrecio(basicoCrm, es) === "Precio referencial",
  ],

  // Resumen que viaja por WhatsApp
  ["el resumen nombra el servicio", resumen.includes("Landing Page")],
  ["el resumen nombra el plan", resumen.includes("Plan: Básico")],
  [
    "el resumen lleva los 6 destacados y también el resto",
    basicoLanding.bullets.es.every((b) => resumen.includes(b)) &&
      basicoLanding.incluye.es.every((i) => resumen.includes(i)),
  ],
  [
    "el resumen lleva la mantención elegida",
    resumen.includes(`Mantención: 6 meses (${formatCLP(tramoSeis.precio!)})`),
  ],
  [
    "sin tramo no aparece la línea de mantención",
    !resumenSinTramo.includes("Mantención"),
  ],
  [
    "el CRM muestra el rango completo",
    resumenCrm.includes(
      `${formatCLP(basicoCrm.precio)} - ${formatCLP(basicoCrm.precioHasta!)}`,
    ),
  ],
  [
    "el CRM marca su precio como referencial",
    resumenCrm.includes("Precio referencial:"),
  ],
  [
    "el resumen del CRM lleva el mes incluido",
    resumenCrm.includes("Mantención: 1 mes (Incluida)"),
  ],

  // Conversión de moneda
  ["1 USD a 923 pesos convierte 220.000 en 238", clpAUsd(220000, 923) === 238],
  ["la vuelta redondea al mil", usdAClp(238, 923) === 220000],
  ["el dólar se rotula con código, no con símbolo", formatUSD(238) === "USD 238"],
  [
    "el resumen lleva la conversión cuando hay valor de dólar",
    construirResumen({
      servicio: landing, plan: basicoLanding, tramo: null,
      dolar: { valor: 923, fecha: "2026-08-21", respaldo: false },
      locale: "es", t: es,
    }).includes("≈ USD"),
  ],
  [
    "sin valor de dólar el resumen no inventa la conversión",
    !construirResumen({
      servicio: landing, plan: basicoLanding, tramo: null, locale: "es", t: es,
    }).includes("≈"),
  ],

  // Enlaces
  [
    "wa.me codifica el resumen",
    construirEnlaceWhatsapp(resumen).startsWith(
      "https://wa.me/56951730743?text=",
    ),
  ],
  [
    "el enlace al formulario lleva servicio, plan y tramo",
    construirEnlaceFormulario("landing-page", "basico", 6) ===
      "/?servicio=landing-page&plan=basico&mantencion=6#contacto",
  ],
  [
    "sin tramo el enlace no inventa el parámetro",
    construirEnlaceFormulario("landing-page", "basico") ===
      "/?servicio=landing-page&plan=basico#contacto",
  ],
];

// El catálogo tiene que cumplir sus propias reglas
for (const servicio of serviciosMock) {
  comprobaciones.push([
    `${servicio.slug}: el soporte incluido sube de plan en plan`,
    servicio.planes[0].soporteMeses < servicio.planes[1].soporteMeses &&
      servicio.planes[1].soporteMeses < servicio.planes[2].soporteMeses,
  ]);
  comprobaciones.push([
    `${servicio.slug}: nunca se ofrece pagar por menos de lo ya incluido`,
    servicio.planes.every((p) =>
      tramosAmpliables(servicio, p).every((x) => x.meses > p.soporteMeses),
    ),
  ]);
  comprobaciones.push([
    `${servicio.slug}: el tramo incluido no tiene costo`,
    servicio.planes.every((p) => tramoIncluido(p).precio === 0),
  ]);
  comprobaciones.push([
    `${servicio.slug}: los 6 destacados no se repiten en el resto`,
    servicio.planes.every((p) => {
      const destacados = new Set(p.bullets.es);
      return p.incluye.es.every((x) => !destacados.has(x));
    }),
  ]);
  comprobaciones.push([
    `${servicio.slug}: todos los planes nombran el código fuente`,
    servicio.planes.every((p) =>
      [...p.bullets.es, ...p.incluye.es].some((x) =>
        x.includes("Código fuente"),
      ),
    ),
  ]);
  comprobaciones.push([
    `${servicio.slug}: cada plan lista 10 inclusiones o menos`,
    servicio.planes.every(
      (p) => p.incluye.es.length <= 10 && p.incluye.en.length <= 10,
    ),
  ]);
  comprobaciones.push([
    `${servicio.slug}: el primer tramo de mantención va incluido`,
    servicio.mantencion === null || servicio.mantencion.tramos[0].precio === 0,
  ]);
  comprobaciones.push([
    `${servicio.slug}: solo el primer tramo es gratis`,
    servicio.mantencion === null ||
      servicio.mantencion.tramos.slice(1).every((x) => x.precio !== 0),
  ]);
  comprobaciones.push([
    `${servicio.slug}: cada plan muestra exactamente 6 beneficios`,
    servicio.planes.every(
      (p) => p.bullets.es.length === 6 && p.bullets.en.length === 6,
    ),
  ]);
  comprobaciones.push([
    `${servicio.slug}: un solo plan destacado`,
    servicio.planes.filter((p) => p.destacado).length === 1,
  ]);
  comprobaciones.push([
    `${servicio.slug}: el destacado es el Estándar`,
    servicio.planes.find((p) => p.destacado)?.nivel === "estandar",
  ]);
  comprobaciones.push([
    `${servicio.slug}: el plazo de entrega sube de plan en plan`,
    servicio.planes[0].entregaDias < servicio.planes[1].entregaDias &&
      servicio.planes[1].entregaDias < servicio.planes[2].entregaDias,
  ]);
  comprobaciones.push([
    `${servicio.slug}: el plazo se redacta como "Entrega en ..."`,
    servicio.planes.every((p) => p.entrega.es.startsWith("Entrega en ")),
  ]);
  comprobaciones.push([
    `${servicio.slug}: el plazo no habla de días hábiles`,
    servicio.planes.every((p) => !/hábiles|business days/i.test(p.entrega.es + p.entrega.en)),
  ]);
  comprobaciones.push([
    `${servicio.slug}: los precios suben de plan en plan`,
    servicio.planes[0].precio < servicio.planes[1].precio &&
      servicio.planes[1].precio < servicio.planes[2].precio,
  ]);
}

let ok = 0;
for (const [nombre, paso] of comprobaciones) {
  if (paso) ok++;
  else console.log("  FALLA:", nombre);
}

console.log(
  `\n--- resultado: ${ok}/${comprobaciones.length} comprobaciones ---`,
);
if (ok !== comprobaciones.length) process.exit(1);
