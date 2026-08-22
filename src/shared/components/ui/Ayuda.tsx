"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { IconAyuda } from "@/shared/lib/icons";

interface Props {
  /** Nombre accesible del botón: "¿Qué cubre el soporte?" */
  etiqueta: string;
  children: ReactNode;
  /** Alinea el globo al borde derecho, para cuando queda pegado al margen */
  alineacion?: "izquierda" | "derecha";
  className?: string;
}

/**
 * Botón de ayuda con globo explicativo.
 *
 * Es un *disclosure*, no un tooltip puro: se abre con hover y con foco, pero
 * también con clic. Un tooltip que solo responde a hover no existe en un
 * teléfono, que es desde donde llega la mayoría del tráfico.
 *
 * `pointerType` distingue el mouse del dedo: sin ese filtro, en táctil el
 * `pointerenter` sintético abriría el globo y el `click` inmediato lo cerraría.
 */
export default function Ayuda({
  etiqueta,
  children,
  alineacion = "izquierda",
  className,
}: Props) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();

  return (
    <span className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        aria-label={etiqueta}
        onClick={() => setAbierto((v) => !v)}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setAbierto(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setAbierto(false);
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setAbierto(false)}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          "text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)]",
          "hover:text-[var(--color-brand)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-border)]",
          abierto && "text-[var(--color-brand)]",
        )}
      >
        <IconAyuda className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
      </button>

      {/* No se desmonta: así la animación también ocurre al cerrar, y estando
          inerte queda fuera del recorrido de teclado */}
      <span
        id={id}
        role="note"
        inert={!abierto || undefined}
        className={cn(
          "absolute top-full z-30 mt-2 w-[min(17rem,70vw)] rounded-[var(--radius-lg)] p-3.5",
          "border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-xl)]",
          "text-left text-xs leading-relaxed text-[var(--color-text-body)]",
          "transition-[opacity,translate,scale] duration-[var(--duration-base)] ease-[var(--ease-soft)]",
          alineacion === "derecha"
            ? "right-0 origin-top-right"
            : "left-0 origin-top-left",
          abierto
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0",
        )}
      >
        {children}
      </span>
    </span>
  );
}
