"use client";

import { cn } from "@/shared/lib/cn";
import { formatPrecioPlan } from "@/shared/lib/formatters";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";

import Reveal from "@/shared/components/core/Reveal";
import Button from "@/shared/components/ui/Button";
import Precio from "@/shared/components/ui/Precio";

import type {
  CeldaComparativa,
  Plan,
  Servicio,
} from "@/features/services/schemas/service.schema";

import { IconCheck, IconComparar, IconMenos } from "@/shared/lib/icons";

const NIVELES = ["basico", "estandar", "premium"] as const;

function Celda({ valor }: { valor: CeldaComparativa }) {
  const { locale, t } = useI18n();

  if (typeof valor === "boolean") {
    return valor ? (
      <>
        <IconCheck
          className="mx-auto h-[1.15rem] w-[1.15rem] text-(--color-accent)"
          aria-hidden="true"
        />

        <span className="sr-only">{t.detalle.incluido}</span>
      </>
    ) : (
      <>
        <IconMenos
          className="mx-auto h-[1.15rem] w-[1.15rem] text-(--color-text-subtle)"
          aria-hidden="true"
        />

        <span className="sr-only">{t.detalle.noIncluido}</span>
      </>
    );
  }

  if (typeof valor === "number") {
    return (
      <span className="font-medium tabular-nums text-(--color-text-primary)">
        {valor}
      </span>
    );
  }

  return (
    <span className="break-words text-(--color-text-body)">
      {valor[locale]}
    </span>
  );
}

interface Props {
  servicio: Servicio;
  indiceActivo: number;
  onElegir: (i: number) => void;
  onCotizar: (plan: Plan) => void;
}

export default function ComparativaPaquetes({
  servicio,
  indiceActivo,
  onElegir,
  onCotizar,
}: Props) {
  const { locale, t } = useI18n();

  return (
    <section
      aria-labelledby="comparar-heading"
      className="w-full min-w-0 max-w-full overflow-x-hidden"
    >
      <Reveal>
        {/* TÍTULO */}
        <h2
          id="comparar-heading"
          className="
            mb-6
            flex
            w-full
            min-w-0
            max-w-full
            items-start
            gap-2.5
            font-display
            text-2xl
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          <IconComparar
            className="
              mt-0.5
              h-6
              w-6
              shrink-0
              text-[var(--color-brand)]
            "
            aria-hidden="true"
          />

          <span className="min-w-0 break-words">
            {t.detalle.compararPaquetes}
          </span>
        </h2>

        {/* CONTENEDOR DE LA TABLA */}
        <div
          className="
            relative
            w-full
            min-w-0
            max-w-full
            overflow-hidden
            rounded-[var(--radius-xl)]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-raised)]
            shadow-[var(--shadow-card)]
          "
        >
          {/* SCROLL HORIZONTAL */}
          <div
            className="
              w-full
              min-w-0
              max-w-full
              overflow-x-auto
              overflow-y-hidden
              overscroll-x-contain
              [-webkit-overflow-scrolling:touch]
            "
          >
            <table
              className="
                w-max
                min-w-[44rem]
                border-collapse
                text-left
                text-sm
              "
            >
              <caption className="sr-only">
                {t.detalle.compararPaquetes} - {servicio.titulo[locale]}
              </caption>

              {/* =========================
                  THEAD
              ========================== */}
              <thead>
                <tr className="border-b-2 border-[var(--color-border)]">
                  <th
                    scope="col"
                    className="
                      w-[30%]
                      min-w-[12rem]
                      px-5
                      py-4
                      align-bottom
                      font-semibold
                      text-[var(--color-text-primary)]
                    "
                  >
                    {t.detalle.paquete}
                  </th>

                  {servicio.planes.map((p, i) => (
                    <th
                      key={p.nivel}
                      scope="col"
                      className={cn(
                        `
                          px-5
                          py-4
                          align-bottom
                          transition-colors
                          duration-[var(--duration-base)]
                        `,
                        i === indiceActivo && "bg-[var(--color-brand-soft)]",
                      )}
                    >
                      <span
                        className="
                          block
                          whitespace-nowrap
                          font-display
                          text-xl
                          font-bold
                          tabular-nums
                          text-[var(--color-text-primary)]
                        "
                      >
                        <Precio
                          monto={p.precio}
                          hasta={p.precioHasta}
                          estimado={p.precioEstimado}
                          compacto
                        />
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          whitespace-nowrap
                          font-semibold
                          text-[var(--color-text-primary)]
                        "
                      >
                        {p.nombre[locale]}
                      </span>

                      {p.badge && (
                        <span
                          className={cn(
                            `
                              mt-1.5
                              inline-block
                              max-w-full
                              rounded-full
                              px-2
                              py-0.5
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wider
                            `,
                            p.destacado
                              ? `
                                bg-[var(--color-brand-solid)]
                                text-[var(--color-brand-on-solid)]
                              `
                              : `
                                border
                                border-[var(--color-accent)]
                                text-[var(--color-accent)]
                              `,
                          )}
                        >
                          {p.badge[locale]}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>

                {/* INCLUYE */}
                <tr className="border-b border-[var(--color-border)]">
                  <td className="px-5 py-3 text-[var(--color-text-muted)]">
                    {t.detalle.incluye}
                  </td>

                  {servicio.planes.map((p, i) => (
                    <td
                      key={p.nivel}
                      className={cn(
                        "px-5 py-3 align-top",
                        i === indiceActivo && "bg-[var(--color-brand-soft)]",
                      )}
                    >
                      <ul role="list" className="space-y-1">
                        {p.bullets[locale].map((b) => (
                          <li
                            key={b}
                            className="
                              flex
                              items-start
                              gap-1.5
                              text-xs
                              text-[var(--color-text-body)]
                            "
                          >
                            <IconCheck
                              className="
                                mt-0.5
                                h-3
                                w-3
                                shrink-0
                                text-[var(--color-accent)]
                              "
                              aria-hidden="true"
                            />

                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </thead>

              {/* =========================
                  TBODY
              ========================== */}
              <tbody>
                {servicio.comparativa.map((fila) => (
                  <tr
                    key={fila.label.es}
                    className="
                      border-b
                      border-[var(--color-border-subtle)]
                    "
                  >
                    <th
                      scope="row"
                      className="
                        px-5
                        py-3
                        font-normal
                        text-[var(--color-text-body)]
                      "
                    >
                      {fila.label[locale]}
                    </th>

                    {NIVELES.map((nivel, i) => (
                      <td
                        key={nivel}
                        className={cn(
                          "px-5 py-3 text-center",
                          i === indiceActivo && "bg-[var(--color-brand-soft)]",
                        )}
                      >
                        <Celda valor={fila[nivel]} />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* REVISIONES */}
                <tr
                  className="
                    border-b
                    border-[var(--color-border-subtle)]
                  "
                >
                  <th
                    scope="row"
                    className="
                      px-5
                      py-3
                      font-normal
                      text-[var(--color-text-body)]
                    "
                  >
                    {t.detalle.revisiones}
                  </th>

                  {servicio.planes.map((p, i) => (
                    <td
                      key={p.nivel}
                      className={cn(
                        `
                          px-5
                          py-3
                          text-center
                          font-medium
                          tabular-nums
                          text-[var(--color-text-primary)]
                        `,
                        i === indiceActivo && "bg-[var(--color-brand-soft)]",
                      )}
                    >
                      {p.revisiones}
                    </td>
                  ))}
                </tr>

                {/* TIEMPO DE ENTREGA */}
                <tr
                  className="
                    border-b-2
                    border-[var(--color-border)]
                  "
                >
                  <th
                    scope="row"
                    className="
                      px-5
                      py-3
                      font-normal
                      text-[var(--color-text-body)]
                    "
                  >
                    {t.detalle.tiempoEntrega}
                  </th>

                  {servicio.planes.map((p, i) => (
                    <td
                      key={p.nivel}
                      className={cn(
                        "px-5 py-3 text-center",
                        i === indiceActivo && "bg-[var(--color-brand-soft)]",
                      )}
                    >
                      <span
                        className="
                          block
                          whitespace-nowrap
                          font-medium
                          text-[var(--color-text-primary)]
                        "
                      >
                        {p.entrega[locale]}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>

              {/* =========================
                  TFOOT
              ========================== */}
              <tfoot>
                <tr>
                  <td className="px-5 py-4" />

                  {servicio.planes.map((p, i) => (
                    <td
                      key={p.nivel}
                      className={cn(
                        "px-5 py-4",
                        i === indiceActivo && "bg-[var(--color-brand-soft)]",
                      )}
                    >
                      <span
                        className="
                          mb-2
                          block
                          whitespace-nowrap
                          font-display
                          text-lg
                          font-bold
                          tabular-nums
                          text-[var(--color-text-primary)]
                        "
                      >
                        {formatPrecioPlan(p, t.servicios.desde, true)}
                      </span>

                      <Button
                        size="sm"
                        variant={i === indiceActivo ? "primary" : "outline"}
                        className="w-full"
                        onClick={() => {
                          onElegir(i);
                          onCotizar(p);
                        }}
                      >
                        {t.detalle.seleccionar}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
