/**
 * Países ofrecidos en el selector de prefijo telefónico: Sudamérica completa
 * más los destinos desde los que más llegan consultas.
 *
 * `min` y `max` son la cantidad de dígitos del número nacional, ya sin el
 * prefijo internacional y sin el 0 de tránsito. Chile son 9 exactos (9 XXXX
 * XXXX en móvil, 2 XXXX XXXX en fijo de Santiago).
 *
 * La bandera es un emoji y no una imagen: no añade peticiones de red, escala
 * con la tipografía y no obliga a servir un sprite de banderas.
 */
export interface Pais {
  codigo: string;
  nombre: string;
  dial: string;
  bandera: string;
  min: number;
  max: number;
  ejemplo: string;
}

export const PAISES: readonly Pais[] = [
  { codigo: "CL", nombre: "Chile",          dial: "+56",  bandera: "🇨🇱", min: 9,  max: 9,  ejemplo: "9 1234 5678" },
  { codigo: "AR", nombre: "Argentina",      dial: "+54",  bandera: "🇦🇷", min: 10, max: 10, ejemplo: "11 1234 5678" },
  { codigo: "BO", nombre: "Bolivia",        dial: "+591", bandera: "🇧🇴", min: 8,  max: 8,  ejemplo: "7123 4567" },
  { codigo: "BR", nombre: "Brasil",         dial: "+55",  bandera: "🇧🇷", min: 10, max: 11, ejemplo: "11 91234 5678" },
  { codigo: "CO", nombre: "Colombia",       dial: "+57",  bandera: "🇨🇴", min: 10, max: 10, ejemplo: "301 234 5678" },
  { codigo: "EC", nombre: "Ecuador",        dial: "+593", bandera: "🇪🇨", min: 9,  max: 9,  ejemplo: "99 123 4567" },
  { codigo: "PY", nombre: "Paraguay",       dial: "+595", bandera: "🇵🇾", min: 9,  max: 9,  ejemplo: "981 234 567" },
  { codigo: "PE", nombre: "Perú",           dial: "+51",  bandera: "🇵🇪", min: 9,  max: 9,  ejemplo: "912 345 678" },
  { codigo: "UY", nombre: "Uruguay",        dial: "+598", bandera: "🇺🇾", min: 8,  max: 9,  ejemplo: "9 123 4567" },
  { codigo: "VE", nombre: "Venezuela",      dial: "+58",  bandera: "🇻🇪", min: 10, max: 10, ejemplo: "412 123 4567" },
  { codigo: "MX", nombre: "México",         dial: "+52",  bandera: "🇲🇽", min: 10, max: 10, ejemplo: "55 1234 5678" },
  { codigo: "ES", nombre: "España",         dial: "+34",  bandera: "🇪🇸", min: 9,  max: 9,  ejemplo: "612 345 678" },
  { codigo: "US", nombre: "Estados Unidos", dial: "+1",   bandera: "🇺🇸", min: 10, max: 10, ejemplo: "212 555 0123" },
] as const;

export const PAIS_POR_DEFECTO = "CL";

export const CODIGOS_PAIS = PAISES.map((p) => p.codigo) as [string, ...string[]];

export function buscarPais(codigo: string): Pais | undefined {
  return PAISES.find((p) => p.codigo === codigo);
}

/** Número en formato internacional listo para guardar o enviar: +56912345678 */
export function componerTelefono(codigo: string, digitos: string): string {
  const pais = buscarPais(codigo);
  return pais ? `${pais.dial}${digitos}` : digitos;
}
