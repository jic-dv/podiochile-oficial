"use client";

import type { Servicio } from "@/features/services/schemas/service.schema";

import Reveal from "@/shared/components/core/Reveal";
import Section from "@/shared/components/core/Section";
import Precio from "@/shared/components/ui/Precio";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";

import {
  IconCrm,
  IconFlechaDerecha,
  IconLanding,
  IconMultipagina,
} from "@/shared/lib/icons";

import Link from "next/link";

const ICONOS = {
  landing: IconLanding,
  multipagina: IconMultipagina,
  crm: IconCrm,
} as const;

export default function PreciosSection({
  servicios,
}: {
  servicios: Servicio[];
}) {
  const { locale, t } = useI18n();

  const planes = servicios[0]?.planes ?? [];

  return (
    <Section
      id="precios"
      aria-labelledby="precios-heading"
      className="overflow-hidden bg-[var(--color-surface-muted)]"
    >
      {/* Header */}
      <Reveal className="mx-auto w-full max-w-xl px-4 text-center sm:px-0">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">
          {t.precios.eyebrow}
        </p>

        <h2
          id="precios-heading"
          className="break-words font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
        >
          {t.precios.titulo}
        </h2>

        <p className="mt-4 break-words text-base text-[var(--color-text-body)] sm:text-lg">
          {t.precios.subtitulo}
        </p>
      </Reveal>

      {/* =========================
          MOBILE
          ========================= */}
      <Reveal delay={100} className="mt-10 md:hidden">
        <div className="space-y-4">
          {servicios.map((servicio) => {
            const Icono = ICONOS[servicio.icono];

            return (
              <article
                key={servicio.id}
                className="min-w-0 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-card)]"
              >
                {/* Servicio */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                    aria-hidden="true"
                  >
                    <Icono className="h-[1.15rem] w-[1.15rem]" />
                  </span>

                  <h3 className="min-w-0 break-words font-display font-semibold text-[var(--color-text-primary)]">
                    {servicio.titulo[locale]}
                  </h3>
                </div>

                {/* Planes */}
                <div className="mt-5 divide-y divide-[var(--color-border-subtle)]">
                  {servicio.planes.map((plan) => (
                    <div
                      key={plan.nivel}
                      className="flex min-w-0 items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <span
                        className={`min-w-0 break-words text-sm ${
                          plan.destacado
                            ? "font-semibold text-[var(--color-brand)]"
                            : "text-[var(--color-text-body)]"
                        }`}
                      >
                        {plan.nombre[locale]}
                      </span>

                      <div
                        className={`shrink-0 tabular-nums ${
                          plan.destacado
                            ? "font-semibold text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-body)]"
                        }`}
                      >
                        <Precio
                          monto={plan.precio}
                          hasta={plan.precioHasta}
                          estimado={plan.precioEstimado}
                          compacto
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detalle */}
                <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-5">
                  <Link
                    href={`/servicios/${servicio.slug}`}
                    className="group inline-flex max-w-full items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)] hover:underline"
                  >
                    <span className="truncate">{t.servicios.verDetalle}</span>

                    <IconFlechaDerecha
                      className="h-4 w-4 shrink-0 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* =========================
          DESKTOP TABLE
          ========================= */}
      <Reveal delay={100} className="mt-12 hidden md:block">
        <div className="w-full min-w-0 overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">{t.precios.titulo}</caption>

            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-semibold text-[var(--color-text-primary)]"
                >
                  {t.nav.servicios}
                </th>

                {planes.map((plan) => (
                  <th
                    key={plan.nivel}
                    scope="col"
                    className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${
                      plan.destacado
                        ? "text-[var(--color-brand)]"
                        : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {plan.nombre[locale]}
                  </th>
                ))}

                <th scope="col" className="px-6 py-4">
                  <span className="sr-only">{t.servicios.verDetalle}</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {servicios.map((servicio) => {
                const Icono = ICONOS[servicio.icono];

                return (
                  <tr
                    key={servicio.id}
                    className="border-b border-[var(--color-border-subtle)] transition-colors duration-[var(--duration-fast)] last:border-0 hover:bg-[var(--color-surface-muted)]"
                  >
                    <th
                      scope="row"
                      className="max-w-[18rem] px-6 py-5 font-normal"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                          aria-hidden="true"
                        >
                          <Icono className="h-[1.15rem] w-[1.15rem]" />
                        </span>

                        <span className="min-w-0 break-words font-display font-semibold text-[var(--color-text-primary)]">
                          {servicio.titulo[locale]}
                        </span>
                      </span>
                    </th>

                    {servicio.planes.map((plan) => (
                      <td
                        key={plan.nivel}
                        className={`whitespace-nowrap px-6 py-5 tabular-nums ${
                          plan.destacado
                            ? "font-semibold text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-body)]"
                        }`}
                      >
                        <Precio
                          monto={plan.precio}
                          hasta={plan.precioHasta}
                          estimado={plan.precioEstimado}
                          compacto
                        />
                      </td>
                    ))}

                    <td className="px-6 py-5">
                      <Link
                        href={`/servicios/${servicio.slug}`}
                        className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[var(--color-brand)] hover:underline"
                      >
                        {t.servicios.verDetalle}

                        <IconFlechaDerecha
                          className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Nota */}
      <Reveal delay={160}>
        <p className="mx-auto mt-8 max-w-2xl break-words px-4 text-center text-sm text-[var(--color-text-muted)] sm:px-0">
          {t.precios.nota}{" "}
          <Link
            href="/#contacto"
            className="font-medium text-[var(--color-brand)] hover:underline"
          >
            {t.precios.notaLink}
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
