"use client";

import Reveal from "@/shared/components/core/Reveal";
import Section from "@/shared/components/core/Section";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconContacto, IconLanding, IconServicios } from "@/shared/lib/icons";

const ICONOS = [IconContacto, IconServicios, IconLanding];

export default function ComoFuncionaSection() {
  const { t } = useI18n();

  return (
    <Section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="bg-(--color-surface-muted)"
    >
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-(--color-brand)">
          {t.comoFunciona.eyebrow}
        </p>
        <h2
          id="como-funciona-heading"
          className="font-display text-3xl font-bold text-(--color-text-primary) sm:text-4xl"
        >
          {t.comoFunciona.titulo}
        </h2>
        <p className="mt-4 text-lg text-(--color-text-body)">
          {t.comoFunciona.subtitulo}
        </p>
      </Reveal>

      <ol role="list" className="relative mt-14 grid gap-10 md:grid-cols-3">
        <div
          aria-hidden="true"
          className="absolute left-[calc(16.666%+1.5rem)] right-[calc(16.666%+1.5rem)] top-10 hidden h-px bg-linear-to-r from-(--color-border) via-(--color-brand-border) to-(--color-border) md:block"
        />

        {t.comoFunciona.pasos.map((paso, i) => {
          const Icono = ICONOS[i];
          return (
            <Reveal
              key={paso.titulo}
              delay={i * 120}
              as="li"
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) shadow-(--shadow-md)">
                  <Icono
                    className="h-7 w-7 text-(--color-brand)"
                    aria-hidden="true"
                  />
                </div>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-(--color-brand-solid) text-xs font-bold text-(--color-brand-on-solid) ">
                  {i + 1}
                </span>
              </div>

              <h3 className="mb-3 font-display text-xl font-bold text-(--color-text-primary)">
                {paso.titulo}
              </h3>
              <p className="mb-4 leading-relaxed text-(--color-text-body)">
                {paso.descripcion}
              </p>
              <span className="inline-flex rounded-full border border-(--color-border) bg-(--color-accent-soft) px-3 py-1 text-xs font-medium text-(--color-accent)">
                {paso.detalle}
              </span>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
