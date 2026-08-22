import { construirMailto } from "@/features/contact/lib/mailto";
import { es } from "@/shared/lib/i18n/dictionaries";
import { serviciosMock } from "@/mocks/services";
import type { DatosContacto } from "@/features/contact/schemas/contact.schema";

const datos: DatosContacto = {
  nombre: "José Ignacio Contreras",
  email: "jose@ejemplo.cl",
  pais: "CL",
  telefono: "951730743",
  servicio: "crm-personalizado",
  mensaje: "Necesito un CRM para mi equipo de ventas.\nSomos 8 personas.",
  sitioWeb: "",
};

const url = construirMailto({ datos, servicios: serviciosMock, locale: "es", t: es });

const [esquemaYDest, query] = url.split("?");
const params = new URLSearchParams(query);
const asunto = params.get("subject") ?? "";
const cuerpo = params.get("body") ?? "";

const comprobaciones: [string, boolean][] = [
  ["el esquema es mailto", esquemaYDest.startsWith("mailto:")],
  ["va al correo comercial", esquemaYDest.includes("contacto@podiochile.com")],
  ["el asunto nombra el servicio", asunto.includes("CRM Personalizado")],
  ["el cuerpo trae el nombre", cuerpo.includes("José Ignacio Contreras")],
  ["el cuerpo trae el correo", cuerpo.includes("jose@ejemplo.cl")],
  ["el telefono va en formato internacional", cuerpo.includes("+56951730743")],
  ["indica el pais", cuerpo.includes("Chile")],
  ["el servicio va con su nombre y no con el slug", cuerpo.includes("CRM Personalizado")],
  ["no filtra el slug crudo", !cuerpo.includes("crm-personalizado")],
  ["conserva el mensaje", cuerpo.includes("Necesito un CRM")],
  ["respeta el salto de linea del mensaje", cuerpo.includes("Somos 8 personas.")],
  ["usa CRLF para los saltos", url.includes("%0D%0A")],
  ["la trampa de robots no viaja", !cuerpo.includes("sitioWeb")],
];

// Servicio "otro" y mensaje vacío: el caso mínimo
const minimo = construirMailto({
  datos: { ...datos, servicio: "otro", mensaje: "" },
  servicios: serviciosMock,
  locale: "es",
  t: es,
});
const cuerpoMinimo = new URLSearchParams(minimo.split("?")[1]).get("body") ?? "";
comprobaciones.push(
  ["servicio 'otro' se traduce", cuerpoMinimo.includes("Otro / No sé cuál necesito")],
  ["mensaje vacio se indica", cuerpoMinimo.includes("(sin mensaje adicional)")],
);

let ok = 0;
for (const [nombre, paso] of comprobaciones) {
  if (paso) ok++;
  else console.log("  FALLA:", nombre);
}

console.log("\n--- asunto ---");
console.log(asunto);
console.log("\n--- cuerpo ---");
console.log(cuerpo);
console.log(`\n--- resultado: ${ok}/${comprobaciones.length} comprobaciones ---`);

if (ok !== comprobaciones.length) process.exit(1);
