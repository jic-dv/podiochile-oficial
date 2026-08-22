"use client";

import FormularioContacto from "@/features/contact/components/FormularioContacto";
import {
  CORREO,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMERO,
} from "@/features/quotes/lib/quotes";
import type { Servicio } from "@/features/services/schemas/service.schema";
import Reveal from "@/shared/components/core/Reveal";
import Section from "@/shared/components/core/Section";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconCorreo, IconHorario, IconWhatsapp } from "@/shared/lib/icons";
import { Suspense } from "react";

export default function ContactoSection({
  servicios,
}: {
  servicios: Servicio[];
}) {
  const { t } = useI18n();

  const canales = [
    {
      Icon: IconWhatsapp,
      titulo: t.contacto.whatsapp,
      valor: WHATSAPP_DISPLAY,
      href: `https://wa.me/${WHATSAPP_NUMERO}`,
      externo: true,
    },
    {
      Icon: IconCorreo,
      titulo: t.contacto.correo,
      valor: CORREO,
      href: `mailto:${CORREO}`,
      externo: false,
    },
    {
      Icon: IconHorario,
      titulo: t.contacto.horario,
      valor: t.contacto.horarioValor,
      href: null,
      externo: false,
    },
  ];

  return (
    <Section id="contacto" aria-labelledby="contacto-heading">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-(--color-brand)">
            {t.contacto.eyebrow}
          </p>
          <h2
            id="contacto-heading"
            className="mb-5 font-display text-3xl font-bold text-(--color-text-primary) sm:text-4xl"
          >
            {t.contacto.titulo}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-(--color-text-body)">
            {t.contacto.subtitulo}
          </p>

          <ul role="list" className="space-y-5">
            {canales.map(({ Icon, titulo, valor, href, externo }) => (
              <li key={titulo} className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-(--color-brand-soft) text-(--color-brand)"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-(--color-text-primary)">
                    {titulo}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      {...(externo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-(--color-text-body) transition-colors hover:text-(--color-brand)"
                    >
                      {valor}
                    </a>
                  ) : (
                    <p className="text-(--color-text-body)">{valor}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          {/* useSearchParams exige un límite de Suspense para no forzar
              renderizado dinámico en toda la ruta */}
          <Suspense
            fallback={
              <div className="h-144 rounded-(--radius-2xl) border border-(--color-border) bg-(--color-surface-raised)" />
            }
          >
            <FormularioContacto servicios={servicios} />
          </Suspense>
        </Reveal>
      </div>
    </Section>
  );
}
