"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { WHATSAPP_NUMERO } from "@/features/quotes/lib/quotes";
import { cn } from "@/shared/lib/cn";
import { CREADOR } from "@/shared/lib/creador";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import {
  IconCerrar,
  IconFlechaArriba,
  IconFlechaDerecha,
  IconWhatsapp,
} from "@/shared/lib/icons";

/**
 * A partir de este scroll se considera que el visitante
 * ya ha avanzado lo suficiente como para mostrar "volver arriba".
 */
const UMBRAL = 480;

export default function BotonesFlotantes() {
  const { t } = useI18n();

  const [visible, setVisible] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const contenedorRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLButtonElement>(null);

  /**
   * Control del botón "volver arriba".
   */
  useEffect(() => {
    const alScroll = () => {
      setVisible(window.scrollY > UMBRAL);
    };

    alScroll();

    window.addEventListener("scroll", alScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", alScroll);
    };
  }, []);

  /**
   * Cerrar la tarjeta:
   * - Escape
   * - Click/touch fuera
   */
  useEffect(() => {
    if (!abierto) return;

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      setAbierto(false);

      requestAnimationFrame(() => {
        disparadorRef.current?.focus();
      });
    };

    const alPuntero = (e: PointerEvent) => {
      if (contenedorRef.current?.contains(e.target as Node)) {
        return;
      }

      setAbierto(false);
    };

    document.addEventListener("keydown", alTeclado);
    document.addEventListener("pointerdown", alPuntero);

    return () => {
      document.removeEventListener("keydown", alTeclado);
      document.removeEventListener("pointerdown", alPuntero);
    };
  }, [abierto]);

  /**
   * Volver al inicio.
   */
  function subir() {
    const reducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducido ? "auto" : "smooth",
    });
  }

  const enlace = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    t.flotantes.mensajeWhatsapp,
  )}`;

  return (
    <>
      {/* ============================================================
          WHATSAPP
          ============================================================ */}

      <div
        ref={contenedorRef}
        className="
          fixed
          bottom-[var(--fab-bottom,1.25rem)]
          left-4
          z-40
          flex
          flex-col
          items-start
          gap-3
          pointer-events-none
          sm:left-6
        "
      >
        {/* ==========================================================
            TARJETA WHATSAPP
            ========================================================== */}

        <div
          id="whatsapp-tarjeta"
          inert={!abierto || undefined}
          aria-hidden={!abierto}
          className={cn(
            `
              w-[min(17rem,calc(100vw-2rem))]
              origin-bottom-left
              rounded-[var(--radius-xl)]
              border
              border-[rgb(255_255_255_/_0.14)]
              bg-[rgb(18_17_14_/_0.94)]
              p-4
              shadow-[var(--shadow-xl)]
              backdrop-blur-xl
            `,
            `
              transition-[opacity,translate,scale]
              duration-[var(--duration-base)]
              ease-[var(--ease-soft)]
            `,
            abierto
              ? `
                pointer-events-auto
                translate-y-0
                scale-100
                opacity-100
              `
              : `
                pointer-events-none
                translate-y-2
                scale-95
                opacity-0
              `,
          )}
        >
          {/* CABECERA */}
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold text-[#eae6dc]">
                {t.flotantes.whatsappTitulo}
              </p>

              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#b3ac9c]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25d366]"
                />

                <span className="break-words">{t.flotantes.activo}</span>
              </p>
            </div>

            {/* CERRAR */}
            <button
              type="button"
              onClick={() => {
                setAbierto(false);

                requestAnimationFrame(() => {
                  disparadorRef.current?.focus();
                });
              }}
              aria-label={t.flotantes.whatsappCerrar}
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-[var(--radius-md)]
                text-[#b3ac9c]
                transition-colors
                hover:bg-[rgb(255_255_255_/_0.08)]
                hover:text-[#eae6dc]
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#25d366]
              "
            >
              <IconCerrar className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* DESCRIPCIÓN */}
          <p className="mt-2 break-words text-xs leading-relaxed text-[#b3ac9c]">
            {t.flotantes.whatsappInvitacion}
          </p>

          {/* ABRIR WHATSAPP */}
          <a
            href={enlace}
            title={t.flotantes.whatsappTitulo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className="
              group
              mt-3
              flex
              h-11
              w-full
              min-w-0
              items-center
              justify-center
              gap-2
              rounded-[var(--radius-md)]
              bg-[#0b7a45]
              px-3
              text-sm
              font-medium
              text-white
              transition-colors
              duration-[var(--duration-base)]
              ease-[var(--ease-soft)]
              hover:bg-[#096237]
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#25d366]
            "
          >
            <IconWhatsapp
              className="h-[1.15rem] w-[1.15rem] shrink-0"
              aria-hidden="true"
            />

            <span className="min-w-0 truncate">
              {t.flotantes.whatsappAbrirChat}
            </span>

            <IconFlechaDerecha
              className="
                h-4
                w-4
                shrink-0
                transition-transform
                duration-[var(--duration-fast)]
                group-hover:translate-x-1
              "
              aria-hidden="true"
            />
          </a>
        </div>

        {/* ==========================================================
            BOTÓN WHATSAPP
            ========================================================== */}

        <button
          ref={disparadorRef}
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="whatsapp-tarjeta"
          aria-label={t.flotantes.whatsappAria}
          className={cn(
            `
              pointer-events-auto
              group
              relative
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[rgb(18_17_14)]
              p-[3px]
              shadow-[var(--shadow-xl)]
              ring-2
              ring-[#25d366]
            `,
            `
              transition-[translate,box-shadow,scale]
              duration-[var(--duration-slow)]
              ease-[var(--ease-soft)]
            `,
            `
              hover:-translate-y-1
              hover:scale-105
            `,
            `
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#25d366]
            `,
          )}
        >
          <Image
            src={CREADOR.avatar}
            alt="Avatar José Contreras"
            width={112}
            height={112}
            sizes="56px"
            title="Avatar José Contreras"
            className="h-full w-full rounded-full object-cover"
          />

          {/* ESTADO DISPONIBLE */}
          <span
            aria-hidden="true"
            className="
              punto-disponible
              absolute
              right-0
              top-0
              h-3.5
              w-3.5
              rounded-full
              bg-[#25d366]
            "
          />
        </button>
      </div>

      {/* ============================================================
          VOLVER ARRIBA
          ============================================================ */}

      <button
        type="button"
        onClick={subir}
        aria-label={t.flotantes.subir}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={cn(
          `
            pointer-events-auto
            fixed
            right-4
            z-40
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-raised)]
            text-[var(--color-brand)]
            shadow-[var(--shadow-lg)]
            sm:right-6
          `,
          `
            bottom-[var(--fab-bottom,1.25rem)]
          `,
          `
            transition-[opacity,translate,box-shadow,border-color]
            duration-[var(--duration-slow)]
            ease-[var(--ease-soft)]
          `,
          `
            hover:-translate-y-1
            hover:border-[var(--color-brand-border)]
            hover:shadow-[var(--shadow-xl)]
          `,
          `
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[var(--color-brand)]
          `,
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <IconFlechaArriba className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
}
