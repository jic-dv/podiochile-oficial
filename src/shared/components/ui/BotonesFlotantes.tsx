"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMERO } from "@/features/quotes/lib/quotes";
import { cn } from "@/shared/lib/cn";
import { CREADOR } from "@/shared/lib/creador";
import {
  IconCerrar,
  IconFlechaArriba,
  IconFlechaDerecha,
  IconWhatsapp,
} from "@/shared/lib/icons";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";

/** A partir de aquí se considera que el visitante bajó lo suficiente */
const UMBRAL = 480;

/**
 * Par de accesos fijos al pie de la ventana: WhatsApp a la izquierda y volver
 * arriba a la derecha.
 *
 * La posición vertical sale de `--fab-bottom`, que `globals.css` sube solo en
 * móvil cuando el documento lleva `data-barra-inferior` (la ficha de servicio
 * tiene barra fija abajo). En escritorio esa barra no existe y no hay nada que
 * esquivar.
 */
export default function BotonesFlotantes() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > UMBRAL);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // Cerrar la tarjeta con Escape o tocando fuera, como cualquier menú flotante
  useEffect(() => {
    if (!abierto) return;

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAbierto(false);
      disparadorRef.current?.focus();
    };
    const alPuntero = (e: PointerEvent) => {
      if (contenedorRef.current?.contains(e.target as Node)) return;
      setAbierto(false);
    };

    document.addEventListener("keydown", alTeclado);
    document.addEventListener("pointerdown", alPuntero);
    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.removeEventListener("pointerdown", alPuntero);
    };
  }, [abierto]);

  function subir() {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" });
  }

  const enlace = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    t.flotantes.mensajeWhatsapp,
  )}`;

  return (
    <>
      {/* WhatsApp: en reposo es solo el círculo con la cara. El texto aparece
          al pulsarlo, para no ocupar media pantalla en móvil sin que nadie lo
          haya pedido. */}
      <div
        ref={contenedorRef}
        className="fixed bottom-[var(--fab-bottom,1.25rem)] left-4 z-40 flex flex-col items-start gap-3 sm:left-6"
      >
        {/* La tarjeta no se desmonta: así la animación también ocurre al
            cerrar. Inerte queda fuera del recorrido de teclado. */}
        <div
          id="whatsapp-tarjeta"
          inert={!abierto || undefined}
          className={cn(
            "w-[min(17rem,calc(100vw-2rem))] origin-bottom-left rounded-[var(--radius-xl)] p-4",
            "border border-[rgb(255_255_255_/_0.14)] bg-[rgb(18_17_14_/_0.94)] shadow-[var(--shadow-xl)] backdrop-blur-xl",
            "transition-[opacity,translate,scale] duration-[var(--duration-base)] ease-[var(--ease-soft)]",
            abierto
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#eae6dc]">
                {t.flotantes.whatsappTitulo}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#b3ac9c]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#25d366]" />
                {t.flotantes.activo}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAbierto(false);
                disparadorRef.current?.focus();
              }}
              aria-label={t.flotantes.whatsappCerrar}
              className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[#b3ac9c] transition-colors hover:bg-[rgb(255_255_255_/_0.08)] hover:text-[#eae6dc]"
            >
              <IconCerrar className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-[#b3ac9c]">
            {t.flotantes.whatsappInvitacion}
          </p>

          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className={cn(
              "group mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-md)]",
              "bg-[#0b7a45] text-sm font-medium text-white",
              "transition-colors duration-[var(--duration-base)] ease-[var(--ease-soft)] hover:bg-[#096237]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]",
            )}
          >
            <IconWhatsapp className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
            {t.flotantes.whatsappAbrirChat}
            <IconFlechaDerecha
              className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        <button
          ref={disparadorRef}
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="whatsapp-tarjeta"
          aria-label={t.flotantes.whatsappAria}
          className={cn(
            "group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
            // Aro verde en vez de una insignia pegada: el canal se nombra en la
            // tarjeta, y aquí basta con que se lea "disponible"
            "bg-[rgb(18_17_14)] p-[3px] shadow-[var(--shadow-xl)] ring-2 ring-[#25d366]",
            "transition-[translate,box-shadow,scale] duration-[var(--duration-slow)] ease-[var(--ease-soft)]",
            "hover:-translate-y-1 hover:scale-105",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]",
          )}
        >
          <Image
            src={CREADOR.avatar}
            alt=""
            width={112}
            height={112}
            sizes="56px"
            className="h-full w-full rounded-full object-cover"
          />

          {/* Punto de disponibilidad, sin borde y con latido. Decorativo: el
              estado se lee con todas sus letras al abrir la tarjeta. */}
          <span
            aria-hidden="true"
            className="punto-disponible absolute right-0 top-0 h-3.5 w-3.5 rounded-full bg-[#25d366]"
          />
        </button>
      </div>

      {/* Volver arriba: solo cuando hay algo que desandar */}
      <button
        type="button"
        onClick={subir}
        aria-label={t.flotantes.subir}
        // Fuera del recorrido de teclado mientras está oculto
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={cn(
          "fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full sm:right-6",
          "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-brand)] shadow-[var(--shadow-lg)]",
          "transition-[opacity,translate,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-soft)]",
          "hover:-translate-y-1 hover:border-[var(--color-brand-border)] hover:shadow-[var(--shadow-xl)]",
          "bottom-[var(--fab-bottom,1.25rem)]",
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <IconFlechaArriba className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
}
