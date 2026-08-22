"use client";

import {
  decidir,
  getConsentimiento,
  getConsentimientoServidor,
  subscribe,
} from "@/features/consent/lib/consent";
import Button from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconChevronDown } from "@/shared/lib/icons";
import { LOCALE_STORAGE_KEY, THEME_STORAGE_KEY } from "@/shared/lib/theme";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Aviso de consentimiento previo.
 *
 * La Ley 21.719 pide que el consentimiento sea **libre, informado, específico e
 * inequívoco**, y que sea igual de fácil rechazar que aceptar. De ahí tres
 * decisiones que no son de estilo:
 *
 * 1. Los dos botones pesan lo mismo. Un "Rechazar" en letra chica al margen no
 *    es una alternativa real.
 * 2. No hay botón de cerrar con una X. Cerrar sin decidir dejaría un estado
 *    ambiguo que el sitio interpretaría como permiso.
 * 3. El detalle de qué se guarda está en el propio aviso, no solo enlazado:
 *    "informado" significa antes de decidir, no después de buscarlo.
 *
 * Mientras no haya decisión, nada se escribe: el consentimiento se presta, no
 * se presume por seguir navegando.
 */
export default function BannerCookies() {
  const { t } = useI18n();
  const consentimiento = useSyncExternalStore(
    subscribe,
    getConsentimiento,
    getConsentimientoServidor,
  );
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  // Al aparecer, se mueve el foco al aviso: quien navega con teclado o lector
  // de pantalla tiene que enterarse de que hay algo que decidir
  useEffect(() => {
    if (consentimiento === null) contenedorRef.current?.focus();
  }, [consentimiento]);

  if (consentimiento !== null) return null;

  const filas = [
    {
      clave: THEME_STORAGE_KEY,
      que: t.cookies.filaTema,
      para: t.cookies.filaTemaPara,
      dura: t.cookies.duracionPermanente,
    },
    {
      clave: LOCALE_STORAGE_KEY,
      que: t.cookies.filaIdioma,
      para: t.cookies.filaIdiomaPara,
      dura: t.cookies.duracionPermanente,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      aria-describedby="cookies-texto"
      ref={contenedorRef}
      tabIndex={-1}
      className={cn(
        "fixed inset-x-0 bottom-0 z-90 p-3 sm:p-4",
        "focus-visible:outline-none",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-3xl rounded-(--radius-xl) p-5",
          "border border-(--color-border) bg-(--color-surface-raised)",
          "shadow-(--shadow-xl)",
        )}
      >
        <h2
          id="cookies-titulo"
          className="font-display text-base font-bold text-(--color-text-primary)"
        >
          {t.cookies.bannerTitulo}
        </h2>
        <p
          id="cookies-texto"
          className="mt-1.5 text-sm leading-relaxed text-(--color-text-body)"
        >
          {t.cookies.bannerTexto}
        </p>

        <button
          type="button"
          aria-expanded={detalleAbierto}
          aria-controls="cookies-detalle"
          onClick={() => setDetalleAbierto((v) => !v)}
          className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-(--color-brand) transition-colors hover:text-(--color-brand-hover)"
        >
          {detalleAbierto
            ? t.cookies.bannerVerMenos
            : t.cookies.bannerVerDetalle}
          <IconChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-(--duration-base)",
              detalleAbierto && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        <div
          id="cookies-detalle"
          hidden={!detalleAbierto}
          className="mt-3 overflow-x-auto rounded-lg border border-(--color-border)"
        >
          <table className="w-full min-w-120 border-collapse text-left text-xs">
            <caption className="sr-only">{t.cookies.tablaTitulo}</caption>
            <thead>
              <tr className="border-b border-(--color-border) bg-(--color-surface-muted)">
                <th
                  scope="col"
                  className="px-3 py-2 font-semibold text-(--color-text-primary)"
                >
                  {t.cookies.colClave}
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-semibold text-(--color-text-primary)"
                >
                  {t.cookies.colQue}
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-semibold text-(--color-text-primary)"
                >
                  {t.cookies.colPara}
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 font-semibold text-(--color-text-primary)"
                >
                  {t.cookies.colDura}
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr
                  key={f.clave}
                  className="border-b border-(--color-border-subtle) last:border-0"
                >
                  <td className="px-3 py-2 font-mono text-[11px] text-(--color-text-primary)">
                    {f.clave}
                  </td>
                  <td className="px-3 py-2 text-(--color-text-body)">
                    {f.que}
                  </td>
                  <td className="px-3 py-2 text-(--color-text-body)">
                    {f.para}
                  </td>
                  <td className="px-3 py-2 text-(--color-text-muted)">
                    {f.dura}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-(--color-border) bg-(--color-surface-muted) px-3 py-2.5 text-xs leading-relaxed text-(--color-text-muted)">
            {t.cookies.bannerNadaMas}
          </p>
        </div>

        {/* Mismo tamaño y mismo peso visual: rechazar tiene que costar lo
            mismo que aceptar */}
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <Button
            size="md"
            className="flex-1"
            onClick={() => decidir("aceptado")}
          >
            {t.cookies.aceptar}
          </Button>
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={() => decidir("rechazado")}
          >
            {t.cookies.rechazar}
          </Button>
        </div>

        <p className="mt-3 text-xs text-(--color-text-muted)">
          {t.cookies.bannerPie}{" "}
          <Link
            href="/cookies"
            className="font-medium text-(--color-brand) underline underline-offset-2"
          >
            {t.footer.cookies}
          </Link>
          {" · "}
          <Link
            href="/privacidad"
            className="font-medium text-(--color-brand) underline underline-offset-2"
          >
            {t.footer.privacidad}
          </Link>
        </p>
      </div>
    </div>
  );
}
