import { crearContactoSchema } from "@/features/contact/schemas/contact.schema";

const schema = crearContactoSchema({
  serviciosValidos: ["landing-page", "pagina-web-multipagina", "crm-personalizado"],
});

const NUL = String.fromCharCode(0);
const LF = String.fromCharCode(10);
const TAB = String.fromCharCode(9);

const base = {
  nombre: "José Ignacio Contreras",
  email: "jose@ejemplo.cl",
  pais: "CL",
  telefono: "912345678",
  servicio: "landing-page",
  mensaje: "Hola, quiero una landing.",
  sitioWeb: "",
};

interface Caso {
  nombre: string;
  datos: Record<string, unknown>;
  esperado: "acepta" | "rechaza";
  campo?: string;
}

const casos: Caso[] = [
  { nombre: "caso valido", datos: base, esperado: "acepta" },
  { nombre: "acentos y apostrofo", datos: { ...base, nombre: "María O'Higgins Ñuñez" }, esperado: "acepta" },
  { nombre: "espacios sobrantes se recortan", datos: { ...base, nombre: "  Ana Pérez  " }, esperado: "acepta" },
  { nombre: "mensaje vacio (opcional)", datos: { ...base, mensaje: "" }, esperado: "acepta" },
  { nombre: "mensaje ausente", datos: { ...base, mensaje: undefined }, esperado: "acepta" },
  { nombre: "servicio mantencion", datos: { ...base, servicio: "mantencion" }, esperado: "acepta" },
  { nombre: "servicio otro", datos: { ...base, servicio: "otro" }, esperado: "acepta" },
  { nombre: "mensaje de 500", datos: { ...base, mensaje: "a".repeat(500) }, esperado: "acepta" },

  { nombre: "nombre sin apellido", datos: { ...base, nombre: "Jose" }, esperado: "rechaza", campo: "nombre" },
  { nombre: "nombre con digitos", datos: { ...base, nombre: "Juan 123" }, esperado: "rechaza", campo: "nombre" },
  { nombre: "nombre 81 chars", datos: { ...base, nombre: "A".repeat(40) + " " + "B".repeat(41) }, esperado: "rechaza", campo: "nombre" },
  { nombre: "INYECCION SQL en nombre", datos: { ...base, nombre: "Robert'); DROP TABLE alumnos;--" }, esperado: "rechaza", campo: "nombre" },
  { nombre: "XSS en nombre", datos: { ...base, nombre: "<script>alert(1)</script>" }, esperado: "rechaza", campo: "nombre" },
  { nombre: "byte nulo en nombre", datos: { ...base, nombre: `Ana${NUL}Perez` }, esperado: "rechaza", campo: "nombre" },
  { nombre: "salto de linea en nombre", datos: { ...base, nombre: `Ana${LF}Perez` }, esperado: "rechaza", campo: "nombre" },
  { nombre: "tabulador en nombre", datos: { ...base, nombre: `Ana${TAB}Perez` }, esperado: "rechaza", campo: "nombre" },

  { nombre: "correo sin dominio", datos: { ...base, email: "ana@" }, esperado: "rechaza", campo: "email" },
  { nombre: "correo sin arroba", datos: { ...base, email: "ana.ejemplo.cl" }, esperado: "rechaza", campo: "email" },
  { nombre: "inyeccion de cabecera en correo", datos: { ...base, email: "a@b.cl\nBcc: otro@x.cl" }, esperado: "rechaza", campo: "email" },

  { nombre: "telefono con letras", datos: { ...base, telefono: "9123abcd" }, esperado: "rechaza", campo: "telefono" },
  { nombre: "telefono con guiones", datos: { ...base, telefono: "9-1234-5678" }, esperado: "rechaza", campo: "telefono" },
  { nombre: "CL con 8 digitos (corto)", datos: { ...base, telefono: "91234567" }, esperado: "rechaza", campo: "telefono" },
  { nombre: "CL con 10 digitos (largo)", datos: { ...base, telefono: "9123456789" }, esperado: "rechaza", campo: "telefono" },
  { nombre: "AR con 10 digitos", datos: { ...base, pais: "AR", telefono: "1112345678" }, esperado: "acepta" },
  { nombre: "AR con 9 digitos (corto)", datos: { ...base, pais: "AR", telefono: "111234567" }, esperado: "rechaza", campo: "telefono" },
  { nombre: "BR con 11 (rango alto)", datos: { ...base, pais: "BR", telefono: "11912345678" }, esperado: "acepta" },
  { nombre: "pais inexistente", datos: { ...base, pais: "XX" }, esperado: "rechaza", campo: "pais" },

  { nombre: "servicio inventado", datos: { ...base, servicio: "hackeo" }, esperado: "rechaza", campo: "servicio" },
  { nombre: "servicio vacio", datos: { ...base, servicio: "" }, esperado: "rechaza", campo: "servicio" },
  { nombre: "servicio con titulo en vez de slug", datos: { ...base, servicio: "Landing Page" }, esperado: "rechaza", campo: "servicio" },

  { nombre: "mensaje de 501", datos: { ...base, mensaje: "a".repeat(501) }, esperado: "rechaza", campo: "mensaje" },
  { nombre: "mensaje con salto de linea", datos: { ...base, mensaje: "linea1\nlinea2" }, esperado: "acepta" },
  { nombre: "mensaje con byte nulo", datos: { ...base, mensaje: `hola${NUL}` }, esperado: "rechaza", campo: "mensaje" },

  { nombre: "trampa de robots llena", datos: { ...base, sitioWeb: "http://spam.cl" }, esperado: "rechaza", campo: "sitioWeb" },
];

let ok = 0;
const fallos: string[] = [];

for (const c of casos) {
  const r = schema.safeParse(c.datos);
  const acepto = r.success;
  const esperaAceptar = c.esperado === "acepta";
  let bien = acepto === esperaAceptar;

  if (bien && !acepto && c.campo) {
    const campos = r.error.issues.map((i) => String(i.path[0]));
    if (!campos.includes(c.campo)) {
      bien = false;
      fallos.push(`${c.nombre}: rechazo pero por ${campos.join(",")} y no por ${c.campo}`);
    }
  }
  if (bien) ok++;
  else if (acepto !== esperaAceptar) {
    fallos.push(`${c.nombre}: esperaba ${c.esperado} y ${acepto ? "acepto" : "rechazo"}`);
  }
}

// Normalizaciones
const recorte = schema.safeParse({ ...base, nombre: "  Ana Pérez  ", email: "  ANA@Ejemplo.CL " });
console.log("\n--- normalizacion ---");
if (recorte.success) {
  console.log("nombre recortado:", JSON.stringify(recorte.data.nombre));
  console.log("correo en minusculas:", JSON.stringify(recorte.data.email));
}

console.log(`\n--- resultado: ${ok}/${casos.length} casos correctos ---`);
if (fallos.length) {
  console.log("FALLOS:");
  for (const f of fallos) console.log("  -", f);
  process.exit(1);
}
