"use client";

import Link from "next/link";
import Button from "@/shared/components/ui/Button";
import Reveal from "@/shared/components/core/Reveal";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconFlechaDerecha, IconCheckCircle, IconDestacado } from "@/shared/lib/icons";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-gradient relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[var(--hero-glow-a)] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-[var(--hero-glow-b)] blur-3xl" />
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: "var(--grid-opacity)" }}>
          <defs>
            <pattern id="hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="var(--color-brand)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-brand-soft)] px-4 py-1.5 text-sm font-medium text-[var(--color-brand)]">
              <IconDestacado className="h-4 w-4" aria-hidden="true" />
              {t.hero.badge}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-heading"
              className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t.hero.titulo1}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--color-brand)]">
                  {t.hero.tituloDestacado}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded bg-[var(--color-brand-soft)]"
                />
              </span>{" "}
              {t.hero.titulo2}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-body)] sm:text-xl">
              {t.hero.subtitulo}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <ul role="list" className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {t.hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                  <IconCheckCircle className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/#servicios">
                <Button size="lg" className="group w-full sm:w-auto">
                  {t.hero.ctaPrimario}
                  <IconFlechaDerecha
                    className="h-[1.15rem] w-[1.15rem] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
              <Link href="/#contacto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t.hero.ctaSecundario}
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              {t.hero.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                  {i > 0 && (
                    <span className="hidden h-10 w-px bg-[var(--color-border)] sm:block" aria-hidden="true" />
                  )}
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                      {stat.valor}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
