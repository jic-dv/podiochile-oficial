"use client";

import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import {
  IconVelocidad, IconResponsive, IconSeo,
  IconSeguridad, IconResultados, IconSoporte,
} from "@/shared/lib/icons";

const ICONOS = [
  IconVelocidad, IconResponsive, IconSeo,
  IconSeguridad, IconResultados, IconSoporte,
];

export default function FeaturesSection() {
  const { t } = useI18n();

  return (
    <Section id="caracteristicas" aria-labelledby="features-heading">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">
          {t.features.eyebrow}
        </p>
        <h2
          id="features-heading"
          className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
        >
          {t.features.titulo}
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-body)]">{t.features.subtitulo}</p>
      </Reveal>

      <ul role="list" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((item, i) => {
          const Icono = ICONOS[i];
          return (
            /* El revelado y la tarjeta son elementos distintos a proposito:
               ambos animan `transform`, y sobre un mismo elemento la
               transicion del revelado gana y se lleva por delante la del
               hover. Separarlos deja a cada uno con su propia curva. */
            <Reveal key={item.titulo} delay={(i % 3) * 90} as="li" className="flex">
              <div className="flex gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-sm)] transition-[translate,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  aria-hidden="true"
                >
                  <Icono className="h-[1.35rem] w-[1.35rem]" />
                </span>
                <div>
                  <h3 className="mb-1 font-display font-semibold text-[var(--color-text-primary)]">
                    {item.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-body)]">
                    {item.descripcion}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
