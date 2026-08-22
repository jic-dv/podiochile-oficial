/** Formatea precios en CLP sin decimales */
export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Dólares sin decimales: en un precio de proyecto los centavos no informan */
export function formatUSD(amount: number): string {
  // `currencyDisplay: "code"` imprime "USD 238" y no "$238": el símbolo de
  // dólar es el mismo que usa el peso chileno y al ponerlos uno al lado del
  // otro no habría forma de saber cuál es cuál.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(amount).replace(/ /g, " ");
}

/** Lo mínimo que necesita el formateador de precio de un plan */
interface PrecioPlan {
  precio: number;
  precioHasta: number | null;
  precioEstimado: boolean;
}

/**
 * Texto de precio de un plan. Hay tres formas y la diferencia importa
 * comercialmente: un precio cerrado es un compromiso, un rango y un "desde"
 * son referencias. Mostrar un rango como si fuera cerrado es lo que después
 * obliga a explicar por qué la cotización no coincide con la web.
 *
 * `compacto` colapsa el rango a "desde X" para las cajas donde no cabe
 * entero: la barra fija de móvil y las cabeceras de la comparativa.
 */
export function formatPrecioPlan(
  plan: PrecioPlan,
  etiquetaDesde: string,
  compacto = false,
): string {
  const piso = formatCLP(plan.precio);
  if (!plan.precioEstimado) return piso;
  if (plan.precioHasta === null || compacto) return `${etiquetaDesde} ${piso}`;
  // Guion largo con espacios finos: separa el rango sin leerse como resta
  return `${piso} - ${formatCLP(plan.precioHasta)}`;
}
