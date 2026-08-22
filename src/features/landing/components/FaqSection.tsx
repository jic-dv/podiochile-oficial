"use client";

import { useState, useId } from "react";
import Section from "@/shared/components/core/Section";
import Reveal from "@/shared/components/core/Reveal";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconChevronDown } from "@/shared/lib/icons";

interface AccordionItem {
  pregunta: string;
  respuesta: string;
}

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [abierto, setAbierto] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-[var(--color-border-subtle)]">
      {items.map((item, i) => {
        const estaAbierto = abierto === i;
        const panelId = `${baseId}-panel-${i}`;
        const botonId = `${baseId}-boton-${i}`;

        return (
          <div key={item.pregunta}>
            <h3>
              <button
                type="button"
                id={botonId}
                aria-expanded={estaAbierto}
                aria-controls={panelId}
                onClick={() => setAbierto(estaAbierto ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-[var(--color-text-primary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-brand)]"
              >
                <span>{item.pregunta}</span>
                <IconChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
                    estaAbierto && "rotate-180 text-[var(--color-brand)]",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {/* grid-template-rows anima la altura sin conocerla de antemano y sin
                un max-height inventado que recorte respuestas largas */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={botonId}
              hidden={!estaAbierto}
              className="pb-5"
            >
              <p className="leading-relaxed text-[var(--color-text-body)]">{item.respuesta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqSection() {
  const { t } = useI18n();

  return (
    <Section id="faq" aria-labelledby="faq-heading" className="bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            {t.faq.eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
          >
            {t.faq.titulo}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-6 shadow-[var(--shadow-card)] md:px-8">
            <Accordion items={t.faq.items} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
