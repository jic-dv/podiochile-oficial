"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import Precio from "@/shared/components/ui/Precio";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { getPrecioDesde } from "@/features/services/api/services.service";
import type { Servicio } from "@/features/services/schemas/service.schema";
import {
  IconLanding, IconMultipagina, IconCrm,
  IconFlechaDerecha, IconReloj, IconDestacado,
} from "@/shared/lib/icons";

const ICONOS = {
  landing: IconLanding,
  multipagina: IconMultipagina,
  crm: IconCrm,
} as const;

export default function ServicioCard({ servicio }: { servicio: Servicio }) {
  const { locale, t } = useI18n();
  const Icono = ICONOS[servicio.icono];
  const desde = getPrecioDesde(servicio);
  // El plazo del plan más rápido, con su propio texto: el CRM se cuenta en
  // semanas y componer "N días" aquí lo contradiría
  const planMasRapido = servicio.planes.reduce((a, b) =>
    b.entregaDias < a.entregaDias ? b : a,
  );

  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      title={`${servicio.titulo[locale]} - ${t.servicios.verDetalle}`}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-surface-raised)] p-6",
        "shadow-[var(--shadow-card)] transition-[translate,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-soft)]",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] hover:border-[var(--color-brand-border)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-border)] focus-visible:outline-offset-2",
        servicio.destacado
          ? "card-accent border-[var(--color-brand-border)]/40"
          : "border-[var(--color-border)]",
      )}
    >
      {servicio.destacado && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-solid)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-on-solid)]">
          <IconDestacado className="h-3 w-3" aria-hidden="true" />
          {t.servicios.popular}
        </span>
      )}

      <span
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand-soft)] text-[var(--color-brand)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-110"
        aria-hidden="true"
      >
        <Icono className="h-6 w-6" />
      </span>

      <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
        {servicio.titulo[locale]}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {servicio.subtitulo[locale]}
      </p>

      <p className="mt-4 text-[var(--color-text-body)] leading-relaxed">
        {servicio.pitch[locale]}
      </p>

      <div className="mt-auto pt-6">
        <div className="flex items-end justify-between gap-3 border-t border-[var(--color-border-subtle)] pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              {t.servicios.desde}
            </p>
            <p className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
              <Precio monto={desde} />
            </p>
          </div>
          <p className="flex items-center gap-1.5 pb-1 text-xs text-[var(--color-text-muted)]">
            <IconReloj className="h-3.5 w-3.5" aria-hidden="true" />
            {planMasRapido.entrega[locale]}
          </p>
        </div>

        <p className="mt-4 flex items-center justify-between gap-2 text-sm font-semibold text-[var(--color-brand)]">
          {t.servicios.verDetalle}
          <IconFlechaDerecha
            className="h-4 w-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-subtle)]">
          {t.servicios.planesDisponibles}
        </p>
      </div>
    </Link>
  );
}
