"use client";

import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import ServicioCard from "@/features/landing/components/ServicioCard";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import type { Servicio } from "@/features/services/schemas/service.schema";
import { IconInicio, IconServicios, IconContacto } from "@/shared/lib/icons";

export default function NoEncontrado({ servicios }: { servicios: Servicio[] }) {
  const { t } = useI18n();

  return (
    <>
      <Section className="pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            {/* Decorativo: el nombre accesible de la página lo da el h1 */}
            <p
              aria-hidden="true"
              className="bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-accent)] bg-clip-text font-display text-[5.5rem] font-extrabold leading-none tracking-tight text-transparent sm:text-[7rem]"
            >
              {t.noEncontrado.codigo}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {t.noEncontrado.etiqueta}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              {t.noEncontrado.titulo}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-text-body)]">
              {t.noEncontrado.descripcion}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/" title={t.noEncontrado.inicio} size="lg">
                <IconInicio className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                {t.noEncontrado.inicio}
              </ButtonLink>
              <ButtonLink href="/#servicios" title={t.noEncontrado.verServicios} variant="outline" size="lg">
                <IconServicios className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                {t.noEncontrado.verServicios}
              </ButtonLink>
              <ButtonLink href="/#contacto" title={t.noEncontrado.contacto} variant="ghost" size="lg">
                <IconContacto className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                {t.noEncontrado.contacto}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-6 text-sm text-[var(--color-text-muted)]">
              {t.noEncontrado.ayuda}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="sugerencias-404" className="pt-8 pb-20 md:pt-10 md:pb-24">
        <Reveal>
          <h2
            id="sugerencias-404"
            className="text-center font-display text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl"
          >
            {t.noEncontrado.sugerencias}
          </h2>
        </Reveal>

        <ul role="list" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio, i) => (
            /* Reveal envuelve y la tarjeta va dentro: revelado y hover animan
               la misma propiedad y sobre un mismo nodo se pisan */
            <Reveal as="li" key={servicio.slug} delay={i * 90} className="flex">
              <ServicioCard servicio={servicio} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
