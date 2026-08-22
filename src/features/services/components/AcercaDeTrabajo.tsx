"use client";

import Reveal from "@/shared/components/core/Reveal";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import type { AcercaDe } from "@/features/services/schemas/service.schema";
import { IconCheckCircle } from "@/shared/lib/icons";

export default function AcercaDeTrabajo({ acercaDe }: { acercaDe: AcercaDe }) {
  const { locale, t } = useI18n();

  return (
    <section aria-labelledby="acerca-heading">
      <Reveal>
        <h2
          id="acerca-heading"
          className="mb-6 font-display text-2xl font-bold text-[var(--color-text-primary)]"
        >
          {t.detalle.acercaTitulo}
        </h2>

        <p className="mb-5 font-display text-xl font-semibold leading-snug text-[var(--color-text-primary)]">
          {acercaDe.titular[locale]}
        </p>

        <div className="space-y-4">
          {acercaDe.parrafos[locale].map((p) => (
            <p key={p} className="leading-relaxed text-[var(--color-text-body)]">
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-8">
        <h3 className="mb-4 font-display text-lg font-bold text-[var(--color-text-primary)]">
          {acercaDe.listaTitulo[locale]}
        </h3>
        <ul role="list" className="grid gap-2.5 sm:grid-cols-2">
          {acercaDe.lista[locale].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <IconCheckCircle
                className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-[var(--color-accent)]"
                aria-hidden="true"
              />
              <span className="text-[var(--color-text-body)]">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
