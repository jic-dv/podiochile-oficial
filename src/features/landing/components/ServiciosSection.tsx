"use client";

import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import ServicioCard from "./ServicioCard";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import type { Servicio } from "@/features/services/schemas/service.schema";

export default function ServiciosSection({ servicios }: { servicios: Servicio[] }) {
  const { t } = useI18n();

  return (
    <Section id="servicios" aria-labelledby="servicios-heading">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">
          {t.servicios.eyebrow}
        </p>
        <h2
          id="servicios-heading"
          className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
        >
          {t.servicios.titulo1}{" "}
          <span className="text-[var(--color-brand)]">{t.servicios.tituloDestacado}</span>
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-body)]">{t.servicios.subtitulo}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio, i) => (
          <Reveal key={servicio.id} delay={i * 90} className="flex">
            <ServicioCard servicio={servicio} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-10 text-center text-sm text-[var(--color-text-muted)]">
          {t.servicios.nota}{" "}
          <strong className="font-semibold text-[var(--color-text-body)]">
            {t.servicios.notaFuerte}
          </strong>
          {t.servicios.notaFin}
        </p>
      </Reveal>
    </Section>
  );
}
