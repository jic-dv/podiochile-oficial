"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { useDolar } from "@/shared/lib/currency/DolarProvider";
import { formatPrecioPlan } from "@/shared/lib/formatters";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";

import Button from "@/shared/components/ui/Button";

import type {
  Plan,
  Servicio,
  TramoMantencion,
} from "@/features/services/schemas/service.schema";

import {
  construirEnlaceFormulario,
  construirEnlaceWhatsapp,
  construirResumen,
  etiquetaPrecio,
  etiquetaTramo,
  precioTramo,
} from "@/features/quotes/lib/quotes";

import {
  IconCerrar,
  IconContacto,
  IconFlechaDerecha,
  IconReloj,
  IconWhatsapp,
} from "@/shared/lib/icons";

const FOCUSABLES =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface CotizarModalProps {
  servicio: Servicio;
  plan: Plan;
  tramo: TramoMantencion | null;
  onClose: () => void;
}

export default function CotizarModal({
  servicio,
  plan,
  tramo,
  onClose,
}: CotizarModalProps) {
  const { locale, t } = useI18n();
  const dolar = useDolar();

  const dialogRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLElement | null>(null);

  const resumen = construirResumen({
    servicio,
    plan,
    tramo,
    dolar,
    locale,
    t,
  });

  const enlaceWhatsapp = construirEnlaceWhatsapp(resumen);

  const enlaceFormulario = construirEnlaceFormulario(
    servicio.slug,
    plan.nivel,
    tramo?.meses,
  );

  useEffect(() => {
    disparadorRef.current = document.activeElement as HTMLElement;

    const scrollBloqueado = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>(FOCUSABLES)?.focus();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables =
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLES);

      if (!focusables?.length) return;

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = scrollBloqueado;

      requestAnimationFrame(() => {
        disparadorRef.current?.focus();
      });
    };
  }, [onClose]);

  const filas = [
    {
      dt: t.cotizar.servicio,
      dd: servicio.titulo[locale],
    },
    {
      dt: t.cotizar.plan,
      dd: plan.nombre[locale],
    },
    {
      dt: etiquetaPrecio(plan, t),
      dd: formatPrecioPlan(plan, t.servicios.desde),
    },
    {
      dt: t.cotizar.plazo,
      dd: plan.entrega[locale],
    },
    ...(tramo
      ? [
          {
            dt: t.cotizar.mantencion,
            dd: `${etiquetaTramo(tramo, t)} (${precioTramo(tramo, t)})`,
          },
        ]
      : []),
  ];

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        overflow-hidden
        bg-[rgb(10_10_10_/_0.62)]
        p-2
        backdrop-blur-sm
        sm:p-4
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cotizar-titulo"
        className="
          flex
          w-full
          min-w-0
          max-w-lg
          flex-col
          overflow-hidden
          rounded-[var(--radius-xl)]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface-raised)]
          shadow-[var(--shadow-xl)]

          max-h-[calc(100dvh-1rem)]

          sm:max-h-[calc(100dvh-2rem)]
          sm:rounded-[var(--radius-2xl)]
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            shrink-0
            min-w-0
            items-start
            justify-between
            gap-3
            border-b
            border-[var(--color-border-subtle)]
            p-4
            sm:gap-4
            sm:p-6
          "
        >
          <div className="min-w-0 flex-1">
            <p
              className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-[var(--color-brand)]
                sm:text-xs
              "
            >
              {t.cotizar.titulo}
            </p>

            <h2
              id="cotizar-titulo"
              className="
                break-words
                font-display
                text-lg
                font-bold
                leading-tight
                text-[var(--color-text-primary)]
                sm:text-xl
              "
            >
              {t.cotizar.resumen}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.cotizar.cerrar}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-[var(--radius-md)]
              text-[var(--color-text-muted)]
              transition-colors
              hover:bg-[var(--color-surface-muted)]
              hover:text-[var(--color-text-primary)]
            "
          >
            <IconCerrar className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* BODY SCROLLABLE */}
        <div
          className="
            min-h-0
            min-w-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            overscroll-contain
          "
        >
          {/* RESUMEN */}
          <dl
            className="
              grid
              grid-cols-1
              border-b
              border-[var(--color-border-subtle)]
              bg-[var(--color-border-subtle)]

              xs:grid-cols-2
              sm:grid-cols-2
            "
          >
            {filas.map((fila) => (
              <div
                key={fila.dt}
                className="
                  min-w-0
                  bg-[var(--color-surface-raised)]
                  px-4
                  py-3

                  sm:px-6
                  sm:py-4
                "
              >
                <dt
                  className="
                    text-[10px]
                    uppercase
                    tracking-wide
                    text-[var(--color-text-muted)]
                    sm:text-xs
                  "
                >
                  {fila.dt}
                </dt>

                <dd
                  className="
                    mt-0.5
                    min-w-0
                    break-words
                    text-sm
                    font-semibold
                    leading-snug
                    text-[var(--color-text-primary)]
                    sm:text-base
                  "
                >
                  {fila.dd}
                </dd>
              </div>
            ))}
          </dl>

          {/* OPCIONES */}
          <div
            className="
              min-w-0
              p-4
              sm:p-6
            "
          >
            <p
              className="
                mb-4
                text-sm
                font-semibold
                text-[var(--color-text-primary)]
              "
            >
              {t.cotizar.comoContinuar}
            </p>

            <div className="space-y-3">
              {/* WHATSAPP */}
              <div
                className="
                  min-w-0
                  rounded-[var(--radius-lg)]
                  border
                  border-[var(--color-border)]
                  p-3
                  sm:p-4
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-[var(--radius-md)]
                      bg-[oklch(62%_0.17_145_/_0.12)]
                      text-[oklch(52%_0.17_145)]
                      dark:text-[oklch(76%_0.15_145)]
                    "
                  >
                    <IconWhatsapp className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        break-words
                        font-semibold
                        text-[var(--color-text-primary)]
                      "
                    >
                      {t.cotizar.whatsappTitulo}
                    </p>

                    <p
                      className="
                        mt-0.5
                        break-words
                        text-sm
                        leading-relaxed
                        text-[var(--color-text-muted)]
                      "
                    >
                      {t.cotizar.whatsappTexto}
                    </p>
                  </div>
                </div>

                <a
                  href={enlaceWhatsapp}
                  title={t.cotizar.whatsappBoton}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block min-w-0"
                >
                  <Button
                    variant="whatsapp"
                    size="md"
                    className="w-full max-w-full"
                  >
                    <IconWhatsapp
                      className="h-[1.15rem] w-[1.15rem] shrink-0"
                      aria-hidden="true"
                    />

                    <span className="min-w-0 truncate">
                      {t.cotizar.whatsappBoton}
                    </span>
                  </Button>
                </a>
              </div>

              {/* FORMULARIO */}
              <div
                className="
                  min-w-0
                  rounded-[var(--radius-lg)]
                  border
                  border-[var(--color-border)]
                  p-3
                  sm:p-4
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-[var(--radius-md)]
                      bg-[var(--color-brand-soft)]
                      text-[var(--color-brand)]
                    "
                  >
                    <IconContacto className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        break-words
                        font-semibold
                        text-[var(--color-text-primary)]
                      "
                    >
                      {t.cotizar.formularioTitulo}
                    </p>

                    <p
                      className="
                        mt-0.5
                        break-words
                        text-sm
                        leading-relaxed
                        text-[var(--color-text-muted)]
                      "
                    >
                      {t.cotizar.formularioTexto}
                    </p>
                  </div>
                </div>

                <Link
                  href={enlaceFormulario}
                  onClick={onClose}
                  title={t.cotizar.formularioBoton}
                  className="block min-w-0"
                >
                  <Button
                    variant="outline"
                    size="md"
                    className="group w-full max-w-full"
                  >
                    <span className="min-w-0 truncate">
                      {t.cotizar.formularioBoton}
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
                  </Button>
                </Link>
              </div>
            </div>

            {/* HORARIO */}
            <p
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-1.5
                text-center
                text-xs
                leading-relaxed
                text-[var(--color-text-muted)]
              "
            >
              <IconReloj className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />

              <span className="break-words">{t.contacto.horarioValor}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
