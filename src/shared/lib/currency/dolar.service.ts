import { z } from "zod";

/**
 * Valor del dólar observado, desde findic.cl.
 *
 * La API devuelve los 19 indicadores de la economía chilena en un solo objeto;
 * aquí solo interesa `dolar`. El schema valida lo mínimo y descarta el resto:
 * si mañana agregan o quitan indicadores, esto no se rompe.
 */
const RespuestaSchema = z.object({
  dolar: z.object({
    valor: z.number().positive(),
    fecha: z.string().min(1),
  }),
});

export interface Dolar {
  /** Pesos chilenos por 1 USD */
  valor: number;
  /** Fecha del valor, en formato YYYY-MM-DD */
  fecha: string;
  /** true cuando se está usando el respaldo porque la API no respondió */
  respaldo: boolean;
}

/**
 * Respaldo. Un precio mal convertido es peor que un precio sin convertir, pero
 * una página caída porque un tercero no responde es peor todavía. Este valor
 * mantiene el sitio en pie y se marca como respaldo para que la UI lo diga.
 */
const RESPALDO: Dolar = { valor: 923, fecha: "2026-08-21", respaldo: true };

/** Seis horas: el dólar observado se publica una vez al día */
const REVALIDAR_SEGUNDOS = 60 * 60 * 6;

/**
 * Solo servidor. Se llama desde el layout raíz y el valor viaja al cliente como
 * prop, así ninguna visita golpea la API de terceros desde el navegador: se
 * consulta una vez cada seis horas para todo el tráfico.
 */
export async function getDolar(): Promise<Dolar> {
  try {
    const respuesta = await fetch("https://findic.cl/api/", {
      next: { revalidate: REVALIDAR_SEGUNDOS },
      headers: { accept: "application/json" },
    });

    if (!respuesta.ok) return RESPALDO;

    const datos = RespuestaSchema.safeParse(await respuesta.json());
    if (!datos.success) return RESPALDO;

    return {
      valor: datos.data.dolar.valor,
      fecha: datos.data.dolar.fecha,
      respaldo: false,
    };
  } catch {
    // Sin red, tiempo agotado o JSON inválido: el sitio sigue funcionando
    return RESPALDO;
  }
}

/** Pesos a dólares, redondeado al entero: los centavos aquí no informan nada */
export function clpAUsd(montoClp: number, valorDolar: number): number {
  return Math.round(montoClp / valorDolar);
}

/** Dólares a pesos, redondeado al mil más cercano */
export function usdAClp(montoUsd: number, valorDolar: number): number {
  return Math.round((montoUsd * valorDolar) / 1000) * 1000;
}
