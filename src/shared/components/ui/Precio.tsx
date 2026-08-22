"use client";

import { cn } from "@/shared/lib/cn";
import { clpAUsd, type Dolar } from "@/shared/lib/currency/dolar.service";
import { useDolar } from "@/shared/lib/currency/DolarProvider";
import { formatCLP, formatUSD } from "@/shared/lib/formatters";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";

interface Props {
  /** Precio cerrado, o piso del rango */
  monto: number;
  /** Techo del rango, o null */
  hasta?: number | null;
  /** true cuando el valor es referencia y no compromiso */
  estimado?: boolean;
  /** Colapsa los rangos a "Desde X": para barras y cabeceras estrechas */
  compacto?: boolean;
  className?: string;
  /** Clase de la línea convertida */
  claseSecundaria?: string;
}

/** Arma "$220.000", "$1,2M - $1,8M" o "Desde $3.400.000" en la moneda pedida */
function componer(
  monto: number,
  hasta: number | null,
  estimado: boolean,
  compacto: boolean,
  etiquetaDesde: string,
  fmt: (n: number) => string,
): string {
  const piso = fmt(monto);
  if (!estimado) return piso;
  if (hasta === null || compacto) return `${etiquetaDesde} ${piso}`;
  return `${piso} - ${fmt(hasta)}`;
}

/** Convierte a la otra moneda respetando el rango */
function convertir(
  monto: number,
  hasta: number | null,
  estimado: boolean,
  compacto: boolean,
  etiquetaDesde: string,
  dolar: Dolar,
  aUsd: boolean,
): string {
  const fmt = aUsd
    ? (n: number) => formatUSD(clpAUsd(n, dolar.valor))
    : (n: number) => formatCLP(n);
  return componer(monto, hasta, estimado, compacto, etiquetaDesde, fmt);
}

/**
 * Precio en las dos monedas: primero la del idioma que se está leyendo, y al
 * lado la conversión. En español manda el peso, en inglés el dólar.
 *
 * La conversión se rotula con "≈" y con la fecha del valor, porque el dólar
 * observado cambia todos los días: dar un número exacto sin decir de cuándo es
 * sería prometer un precio que mañana no se sostiene.
 */
export default function Precio({
  monto,
  hasta = null,
  estimado = false,
  compacto = false,
  className,
  claseSecundaria,
}: Props) {
  const { locale, t } = useI18n();
  const dolar = useDolar();
  const desde = t.servicios.desde;

  const enIngles = locale === "en";
  const principal = dolar
    ? convertir(monto, hasta, estimado, compacto, desde, dolar, enIngles)
    : componer(monto, hasta, estimado, compacto, desde, formatCLP);

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="tabular-nums">{principal}</span>
      {dolar && (
        <span
          className={cn(
            "text-xs font-normal tabular-nums text-[var(--color-text-muted)]",
            claseSecundaria,
          )}
          title={`${t.moneda.segun} ${dolar.fecha}`}
        >
          ≈ {convertir(monto, hasta, estimado, true, desde, dolar, !enIngles)}
          {enIngles ? " CLP" : ""}
        </span>
      )}
    </span>
  );
}
