"use client";

import Link from "next/link";
import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import Precio from "@/shared/components/ui/Precio";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import type { Servicio } from "@/features/services/schemas/service.schema";
import { IconFlechaDerecha, IconLanding, IconMultipagina, IconCrm } from "@/shared/lib/icons";

const ICONOS = {
  landing: IconLanding,
  multipagina: IconMultipagina,
  crm: IconCrm,
} as const;

export default function PreciosSection({ servicios }: { servicios: Servicio[] }) {
  const { locale, t } = useI18n();

  return (
    <Section id="precios" aria-labelledby="precios-heading" className="bg-[var(--color-surface-muted)]">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">
          {t.precios.eyebrow}
        </p>
        <h2
          id="precios-heading"
          className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
        >
          {t.precios.titulo}
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-body)]">{t.precios.subtitulo}</p>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">{t.precios.titulo}</caption>
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th scope="col" className="px-6 py-4 text-sm font-semibold text-[var(--color-text-primary)]">
                  {t.nav.servicios}
                </th>
                {servicios[0].planes.map((plan) => (
                  <th
                    key={plan.nivel}
                    scope="col"
                    className={`px-6 py-4 text-sm font-semibold ${
                      plan.destacado ? "text-[var(--color-brand)]" : "text-[var(--color-text-primary)]"
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
                    className="border-b border-[var(--color-border-subtle)] last:border-0 transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface-muted)]"
                  >
                    <th scope="row" className="px-6 py-5 font-normal">
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                          aria-hidden="true"
                        >
                          <Icono className="h-[1.15rem] w-[1.15rem]" />
                        </span>
                        <span className="font-display font-semibold text-[var(--color-text-primary)]">
                          {servicio.titulo[locale]}
                        </span>
                      </span>
                    </th>
                    {servicio.planes.map((plan) => (
                      <td
                        key={plan.nivel}
                        className={`px-6 py-5 tabular-nums ${
                          plan.destacado
                            ? "font-semibold text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-body)]"
                        }`}
                      >
                        <Precio monto={plan.precio} hasta={plan.precioHasta} estimado={plan.precioEstimado} compacto />
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

      <Reveal delay={160}>
        <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
          {t.precios.nota}{" "}
          <Link href="/#contacto" className="font-medium text-[var(--color-brand)] hover:underline">
            {t.precios.notaLink}
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
