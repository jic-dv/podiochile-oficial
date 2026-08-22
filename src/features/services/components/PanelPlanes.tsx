"use client";

import {
  construirEnlaceWhatsapp,
  construirResumen,
  etiquetaTramo,
  precioTramo,
  tramoIncluido,
  tramosAmpliables,
} from "@/features/quotes/lib/quotes";
import type {
  Plan,
  Servicio,
} from "@/features/services/schemas/service.schema";
import Ayuda from "@/shared/components/ui/Ayuda";
import Button from "@/shared/components/ui/Button";
import Precio from "@/shared/components/ui/Precio";
import { cn } from "@/shared/lib/cn";
import { useDolar } from "@/shared/lib/currency/DolarProvider";
import { formatCLP } from "@/shared/lib/formatters";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import {
  IconCheck,
  IconChevronDown,
  IconReloj,
  IconRevisiones,
  IconWhatsapp,
} from "@/shared/lib/icons";

interface Props {
  servicio: Servicio;
  indice: number;
  onIndiceChange: (i: number) => void;
  onCotizar: (plan: Plan) => void;
  /** El panel se monta dos veces (movil y escritorio). Sin prefijo, ambas
   *  instancias emitirian los mismos id y romperian aria-controls. */
  idPrefix: string;
  /** Elección de mantención. Vive arriba porque el panel se monta dos veces
   *  y las dos instancias tienen que mostrar lo mismo. */
  agregarMantencion: boolean;
  onAgregarMantencionChange: (agregar: boolean) => void;
  mesesMantencion: number;
  onMantencionChange: (meses: number) => void;
  /** También vive arriba: la columna cambia su modo pegajoso según esto, y
   *  las dos instancias del panel deben mostrar lo mismo. */
  incluyeAbierto: boolean;
  onIncluyeAbiertoChange: (abierto: boolean) => void;
}

export default function PanelPlanes({
  servicio,
  indice,
  onIndiceChange,
  onCotizar,
  idPrefix,
  agregarMantencion,
  onAgregarMantencionChange,
  mesesMantencion,
  onMantencionChange,
  incluyeAbierto,
  onIncluyeAbiertoChange,
}: Props) {
  const { locale, t } = useI18n();
  const dolar = useDolar();
  const plan = servicio.planes[indice];
  // Lo incluido lo fija el plan, no el servicio: el Estándar trae 3 meses y el
  // Premium 6, así que solo se pueden sumar los tramos que superan eso.
  const incluido = tramoIncluido(plan);
  const tramosPagados = tramosAmpliables(servicio, plan);
  const tramo = agregarMantencion
    ? (tramosPagados.find((x) => x.meses === mesesMantencion) ??
      tramosPagados[0] ??
      incluido)
    : servicio.mantencion
      ? incluido
      : null;

  const enlaceWhatsapp = construirEnlaceWhatsapp(
    construirResumen({ servicio, plan, tramo, dolar, locale, t }),
  );

  // La tarjeta ya no lleva `overflow-hidden`: recortaba el globo de ayuda del
  // soporte contra su propio borde. El redondeo superior lo asume la barra de
  // pestañas, que era lo único que necesitaba ese recorte.
  return (
    <div className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) shadow-(--shadow-lg)">
      {/* Pestañas de plan */}
      <div
        role="tablist"
        aria-label={t.detalle.elegirPlan}
        className="grid grid-cols-3 overflow-hidden rounded-t-(--radius-xl) border-b border-(--color-border)"
      >
        {servicio.planes.map((p, i) => (
          <button
            key={p.nivel}
            role="tab"
            id={`${idPrefix}-tab-${p.nivel}`}
            aria-selected={indice === i}
            aria-controls={`${idPrefix}-panel-${p.nivel}`}
            tabIndex={indice === i ? 0 : -1}
            onClick={() => onIndiceChange(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const paso = e.key === "ArrowRight" ? 1 : -1;
              const sig =
                (i + paso + servicio.planes.length) % servicio.planes.length;
              onIndiceChange(sig);
              document
                .getElementById(`${idPrefix}-tab-${servicio.planes[sig].nivel}`)
                ?.focus();
            }}
            className={cn(
              "relative px-2 py-3.5 text-sm font-semibold transition-colors duration-(--duration-base)",
              indice === i
                ? "text-(--color-brand)"
                : "text-(--color-text-muted) hover:bg-(--color-surface-muted) hover:text-(--color-text-body)",
            )}
          >
            {p.nombre[locale]}
            {/* Subrayado del plan activo, no un fondo: deja respirar la cabecera */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-(--duration-base)",
                indice === i ? "bg-(--color-brand-solid)" : "bg-transparent",
              )}
            />
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${idPrefix}-panel-${plan.nivel}`}
        aria-labelledby={`${idPrefix}-tab-${plan.nivel}`}
      >
        <div className="p-5">
          {/* Precio y rótulo comercial */}
          <div className="mb-1 flex items-start justify-between gap-3">
            <p className="font-display text-3xl font-bold tabular-nums text-(--color-text-primary)">
              <Precio
                monto={plan.precio}
                hasta={plan.precioHasta}
                estimado={plan.precioEstimado}
                claseSecundaria="text-sm"
              />
            </p>
            {plan.badge && (
              <span
                className={cn(
                  "mt-1 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                  plan.destacado
                    ? "bg-(--color-brand-solid) text-(--color-brand-on-solid)"
                    : "border border-(--color-accent) text-(--color-accent)",
                )}
              >
                {plan.badge[locale]}
              </span>
            )}
          </div>

          {plan.precioEstimado && (
            <p className="mb-3 text-xs text-(--color-text-muted)">
              {t.detalle.precioReferencial}
            </p>
          )}

          {servicio.mantencionObligatoria && (
            <p className="mb-4 text-xs text-(--color-text-muted)">
              {t.detalle.mantencionObligatoria}
            </p>
          )}

          {/* El levantamiento no es letra chica: es lo que convierte un rango
              en un número, y el cliente tiene que verlo antes de cotizar */}
          {servicio.discovery && (
            <div className="mb-4 rounded-lg border border-(--color-brand-border) bg-(--color-brand-soft) p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-(--color-brand)">
                {t.detalle.discoveryTitulo}
              </p>
              <p className="mt-1 flex items-end gap-2 text-sm font-semibold tabular-nums text-(--color-text-primary)">
                <Precio
                  monto={servicio.discovery.precio}
                  claseSecundaria="text-[11px]"
                />
                <span className="font-normal text-(--color-text-muted)">
                  {servicio.discovery.duracion[locale]}
                </span>
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-(--color-text-body)">
                {servicio.discovery.nota[locale]}
              </p>
            </div>
          )}

          {/* Qué incluye: los 6 principales a la vista y el resto plegado.
              `bullets` e `incluye` no se solapan, así que al desplegar aparece
              lo que falta y no la misma lista otra vez. El aire de arriba
              separa el precio de la lista: pegados se leían como un bloque. */}
          <div className="mt-7">
            <h3 className="mb-3 text-sm font-bold text-(--color-text-primary)">
              {t.detalle.queIncluye}
            </h3>

            <ul role="list" className="space-y-2">
              {plan.bullets[locale].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-(--color-text-body)"
                >
                  <IconCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)"
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* El resto continúa la misma lista, por eso comparte marca y
                sangría en vez de abrirse como una sección aparte */}
            <ul
              role="list"
              id={`${idPrefix}-incluye-${plan.nivel}`}
              hidden={!incluyeAbierto}
              className="mt-2 space-y-2"
            >
              {plan.incluye[locale].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-(--color-text-body)"
                >
                  <IconCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-expanded={incluyeAbierto}
              aria-controls={`${idPrefix}-incluye-${plan.nivel}`}
              onClick={() => onIncluyeAbiertoChange(!incluyeAbierto)}
              className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-(--color-brand) transition-colors hover:text-(--color-brand-hover)"
            >
              {incluyeAbierto ? t.detalle.verMenos : t.detalle.verTodo}
              <IconChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-(--duration-base)",
                  incluyeAbierto && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Entrega y revisiones */}
          <div className="mb-4 mt-4 flex items-center gap-5 border-y border-(--color-border-subtle) py-3 text-sm">
            <span className="flex items-center gap-1.5 font-medium text-(--color-text-primary)">
              <IconReloj
                className="h-4 w-4 text-(--color-text-muted)"
                aria-hidden="true"
              />
              {plan.entrega[locale]}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-(--color-text-primary)">
              <IconRevisiones
                className="h-4 w-4 text-(--color-text-muted)"
                aria-hidden="true"
              />
              {plan.revisiones}{" "}
              {plan.revisiones === 1
                ? t.detalle.revision
                : t.detalle.revisiones}
            </span>
          </div>

          {/* Mantención: viaja en la solicitud, así que es parte de la
              cotización y no una nota al pie. El primer mes va siempre; el
              checkbox decide solo si además se extiende. */}
          {servicio.mantencion && tramosPagados.length > 0 && (
            <div className="mb-4 mt-1 rounded-lg border border-(--color-border) p-3">
              {/* El checkbox nativo no se puede redondear ni animar de forma
                  pareja entre navegadores. Se deja en el DOM (sigue siendo el
                  control real, enfocable y anunciado) y la caja visible es un
                  hermano que reacciona con `peer-checked`. */}
              <div className="flex items-center gap-1.5">
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={agregarMantencion}
                    onChange={(e) =>
                      onAgregarMantencionChange(e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border",
                      "border-(--color-border-strong) bg-(--color-surface)",
                      "transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-soft",
                      "group-hover:border-(--color-brand-border)",
                      // El borde marcado va en brand-border, no en el relleno: en tema
                      // claro brand-solid contra el panel da 1.85 y la caja perdería el contorno
                      "peer-checked:border-(--color-brand-border) peer-checked:bg-(--color-brand-solid)",
                      "peer-checked:shadow-[0_2px_8px_var(--color-brand-ring)]",
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-brand-border)",
                      // El check entra con escala en vez de aparecer de golpe
                      "[&_svg]:scale-0 [&_svg]:transition-transform [&_svg]:duration-(--duration-fast) [&_svg]:ease-soft",
                      "peer-checked:[&_svg]:scale-100",
                    )}
                  >
                    <IconCheck className="h-3.5 w-3.5 stroke-3 text-(--color-brand-on-solid)" />
                  </span>
                  <span className="text-sm font-semibold text-(--color-text-primary)">
                    {t.detalle.mantencionAgregar}
                  </span>
                </label>

                {/* Fuera del label a propósito: dentro, pulsar el signo de
                  interrogación marcaría el checkbox */}
                <Ayuda etiqueta={t.detalle.soporteAyudaEtiqueta}>
                  <span className="mb-2 block text-xs font-bold text-(--color-text-primary)">
                    {t.detalle.soporteAyudaTitulo}
                  </span>
                  <span className="block space-y-1.5">
                    {t.detalle.soporteAyudaItems.map((item) => (
                      <span key={item} className="flex items-start gap-1.5">
                        <IconCheck
                          className="mt-0.5 h-3 w-3 shrink-0 text-(--color-accent)"
                          aria-hidden="true"
                        />
                        {item}
                      </span>
                    ))}
                  </span>
                  <span className="mt-2.5 block border-t border-(--color-border-subtle) pt-2 text-(--color-text-muted)">
                    {t.detalle.soporteAyudaNota}
                  </span>
                </Ayuda>
              </div>

              <p className="mt-1 pl-8 text-xs leading-relaxed text-(--color-text-muted)">
                {plan.soporteMeses === 1
                  ? t.detalle.mantencionIncluidoUno
                  : `${plan.soporteMeses} ${t.detalle.mantencionIncluidoVarios}`}
              </p>

              {agregarMantencion && (
                <div className="mt-3">
                  <label
                    htmlFor={`${idPrefix}-mantencion-${plan.nivel}`}
                    className="mb-1.5 block text-xs font-medium text-(--color-text-body)"
                  >
                    {t.detalle.mantencionPeriodo}
                  </label>
                  <select
                    id={`${idPrefix}-mantencion-${plan.nivel}`}
                    value={mesesMantencion}
                    onChange={(e) => onMantencionChange(Number(e.target.value))}
                    className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-text-primary) transition-colors duration-(--duration-fast) focus:border-(--color-brand-border) focus:outline-none focus:ring-2 focus:ring-(--color-brand-ring)"
                  >
                    {tramosPagados.map((x) => (
                      <option key={x.meses} value={x.meses}>
                        {etiquetaTramo(x, t)} - {precioTramo(x, t)}
                      </option>
                    ))}
                  </select>
                  {!servicio.discovery && (
                    <p className="mt-1.5 text-xs text-(--color-text-muted)">
                      {t.detalle.mantencionMensual}:{" "}
                      {formatCLP(servicio.mantencion.mensualDesde)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <Button size="lg" className="w-full" onClick={() => onCotizar(plan)}>
            {servicio.discovery && plan.precioEstimado
              ? t.detalle.agendarDiscovery
              : `${t.detalle.cotizar} ${plan.nombre[locale]}`}
          </Button>

          <a
            href={enlaceWhatsapp}
            title={t.cotizar.whatsappBoton}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block"
          >
            <Button variant="outline" size="md" className="w-full">
              <IconWhatsapp
                className="h-[1.1rem] w-[1.1rem]"
                aria-hidden="true"
              />
              {t.cotizar.whatsappBoton}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
