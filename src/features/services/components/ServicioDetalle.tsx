"use client";

import { Accordion } from "@/features/landing/components/FaqSection";
import CotizarModal from "@/features/quotes/components/CotizarModal";
import { tramoIncluido, tramosAmpliables } from "@/features/quotes/lib/quotes";
import type {
  Plan,
  Servicio,
} from "@/features/services/schemas/service.schema";
import Reveal from "@/shared/components/core/Reveal";
import Precio from "@/shared/components/ui/Precio";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GaleriaServicio from "./GaleriaServicio";
import PanelPlanes from "./PanelPlanes";

import {
  IconChevronRight,
  IconCrm,
  IconFlechaDerecha,
  IconLanding,
  IconMultipagina,
  IconReloj,
  IconRevisiones,
} from "@/shared/lib/icons";
import AcercaDeTrabajo from "./AcercaDeTrabajo";
import ComparativaPaquetes from "./ComparativaPaquetes";

const ICONOS = {
  landing: IconLanding,
  multipagina: IconMultipagina,
  crm: IconCrm,
} as const;

interface Props {
  servicio: Servicio;
  otros: Servicio[];
}

const MARGEN_SUPERIOR = 96;
const MARGEN_INFERIOR = 24;

export default function ServicioDetalle({ servicio, otros }: Props) {
  const { locale, t } = useI18n();

  const [indice, setIndice] = useState(() =>
    Math.max(
      0,
      servicio.planes.findIndex((p) => p.nivel === "basico"),
    ),
  );

  const [planCotizado, setPlanCotizado] = useState<Plan | null>(null);
  const [agregarMantencion, setAgregarMantencion] = useState(false);
  const [mesesMantencion, setMesesMantencion] = useState(0);
  const [incluyeAbierto, setIncluyeAbierto] = useState(false);

  const Icono = ICONOS[servicio.icono];
  const planActivo = servicio.planes[indice];

  const ampliables = tramosAmpliables(servicio, planActivo);

  const tramoMantencion = agregarMantencion
    ? (ampliables.find((x) => x.meses === mesesMantencion) ??
      ampliables[0] ??
      tramoIncluido(planActivo))
    : servicio.mantencion
      ? tramoIncluido(planActivo)
      : null;

  const columnaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = columnaRef.current;

    if (!el) return;

    const ajustar = () => {
      const cabe =
        el.offsetHeight + MARGEN_SUPERIOR + MARGEN_INFERIOR <=
        window.innerHeight;

      el.dataset.anclaje = cabe ? "arriba" : "abajo";
    };

    ajustar();

    const observador = new ResizeObserver(ajustar);
    observador.observe(el);

    window.addEventListener("resize", ajustar);

    return () => {
      observador.disconnect();
      window.removeEventListener("resize", ajustar);
    };
  }, [incluyeAbierto, indice]);

  useEffect(() => {
    const raiz = document.documentElement;

    raiz.dataset.barraInferior = "";

    return () => {
      delete raiz.dataset.barraInferior;
    };
  }, []);

  return (
    <>
      <div className="w-full min-w-0 overflow-x-clip">
        <div className="mx-auto w-full max-w-7xl min-w-0 px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 min-w-0">
            <ol
              role="list"
              className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm"
            >
              <li className="shrink-0">
                <Link
                  href="/"
                  title={t.detalle.inicio}
                  className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand)]"
                >
                  {t.detalle.inicio}
                </Link>
              </li>

              <li aria-hidden="true" className="shrink-0">
                <IconChevronRight className="h-4 w-4 text-[var(--color-text-subtle)]" />
              </li>

              <li className="shrink-0">
                <Link
                  href="/#servicios"
                  title={t.detalle.servicios}
                  className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand)]"
                >
                  {t.detalle.servicios}
                </Link>
              </li>

              <li aria-hidden="true" className="shrink-0">
                <IconChevronRight className="h-4 w-4 text-[var(--color-text-subtle)]" />
              </li>

              <li className="min-w-0 max-w-full">
                <span
                  aria-current="page"
                  className="block max-w-full truncate font-medium text-[var(--color-text-primary)]"
                >
                  {servicio.titulo[locale]}
                </span>
              </li>
            </ol>
          </nav>

          {/* Layout principal */}
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
            {/* ============================================================
                COLUMNA IZQUIERDA
            ============================================================ */}
            <main className="min-w-0 max-w-full">
              <header className="mb-6 min-w-0">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                    aria-hidden="true"
                  >
                    <Icono className="h-[1.4rem] w-[1.4rem]" />
                  </span>

                  <h1 className="min-w-0 flex-1 break-words font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                    {servicio.titulo[locale]}
                  </h1>
                </div>

                <p className="mt-3 min-w-0 break-words text-lg leading-relaxed text-[var(--color-text-body)]">
                  {servicio.subtitulo[locale]}. {servicio.pitch[locale]}
                </p>
              </header>

              {/* Galería */}
              <div className="min-w-0 max-w-full">
                <GaleriaServicio imagenes={servicio.galeria} />
              </div>

              {/* ==========================================================
                  PANEL MÓVIL
              ========================================================== */}
              <div className="mt-8 min-w-0 lg:hidden">
                <PanelPlanes
                  idPrefix="movil"
                  servicio={servicio}
                  indice={indice}
                  onIndiceChange={setIndice}
                  onCotizar={setPlanCotizado}
                  agregarMantencion={agregarMantencion}
                  onAgregarMantencionChange={setAgregarMantencion}
                  mesesMantencion={mesesMantencion}
                  onMantencionChange={setMesesMantencion}
                  incluyeAbierto={incluyeAbierto}
                  onIncluyeAbiertoChange={setIncluyeAbierto}
                />
              </div>

              {/* Acerca */}
              <div className="mt-12 min-w-0">
                <AcercaDeTrabajo acercaDe={servicio.acercaDe} />
              </div>

              {/* Comparativa */}
              <div className="mt-12 min-w-0 max-w-full">
                <ComparativaPaquetes
                  servicio={servicio}
                  indiceActivo={indice}
                  onElegir={setIndice}
                  onCotizar={setPlanCotizado}
                />
              </div>

              {/* Ideal para */}
              <Reveal className="mt-12 min-w-0">
                <h2 className="mb-4 font-display text-xl font-bold text-[var(--color-text-primary)]">
                  {t.detalle.ideal}
                </h2>

                <ul role="list" className="flex min-w-0 flex-wrap gap-2">
                  {servicio.idealPara[locale].map((item) => (
                    <li
                      key={item}
                      className="max-w-full break-words rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3.5 py-1.5 text-sm text-[var(--color-text-body)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Proceso */}
              <Reveal className="mt-12 min-w-0">
                <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text-primary)]">
                  {t.detalle.proceso}
                </h2>

                <ol
                  role="list"
                  className="relative min-w-0 space-y-6 border-l border-[var(--color-border)] pl-8"
                >
                  {servicio.proceso.map((paso, i) => (
                    <li key={paso.titulo.es} className="relative min-w-0">
                      <span
                        className="absolute -left-[2.4rem] flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-xs font-bold text-[var(--color-brand)]"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>

                      <h3 className="break-words font-semibold text-[var(--color-text-primary)]">
                        {paso.titulo[locale]}
                      </h3>

                      <p className="mt-1 break-words text-sm leading-relaxed text-[var(--color-text-body)]">
                        {paso.descripcion[locale]}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* Tecnologías */}
              <Reveal className="mt-12 min-w-0">
                <h2 className="mb-4 font-display text-xl font-bold text-[var(--color-text-primary)]">
                  {t.detalle.tecnologias}
                </h2>

                <ul role="list" className="flex min-w-0 flex-wrap gap-2">
                  {servicio.tecnologias.map((tec) => (
                    <li
                      key={tec}
                      className="max-w-full break-all rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-body)]"
                    >
                      {tec}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* FAQ */}
              <Reveal className="mt-12 min-w-0">
                <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text-primary)]">
                  {t.detalle.faqTitulo}
                </h2>

                <div className="min-w-0 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 shadow-[var(--shadow-card)] sm:px-6">
                  <Accordion
                    items={servicio.faq.map((f) => ({
                      pregunta: f.pregunta[locale],
                      respuesta: f.respuesta[locale],
                    }))}
                  />
                </div>
              </Reveal>

              {/* Otros servicios */}
              <Reveal className="mt-12 min-w-0">
                <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text-primary)]">
                  {t.detalle.otrosQueEntrego}
                </h2>

                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  {otros.map((otro) => {
                    const OtroIcono = ICONOS[otro.icono];

                    return (
                      <Link
                        key={otro.id}
                        href={`/servicios/${otro.slug}`}
                        title={otro.titulo[locale]}
                        className="group flex min-w-0 h-full items-start gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-sm)] transition-[translate,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-[var(--color-brand-border)] hover:shadow-[var(--shadow-md)]"
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                          aria-hidden="true"
                        >
                          <OtroIcono className="h-[1.35rem] w-[1.35rem]" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words font-display font-semibold text-[var(--color-text-primary)]">
                            {otro.titulo[locale]}
                          </h3>

                          <p className="mt-1 break-words text-sm text-[var(--color-text-body)]">
                            {otro.pitch[locale]}
                          </p>
                        </div>

                        <IconFlechaDerecha
                          className="mt-1 h-4 w-4 shrink-0 text-[var(--color-brand)] transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            </main>

            {/* ============================================================
                COLUMNA DERECHA
            ============================================================ */}
            <aside
              className="hidden min-w-0 lg:block"
              aria-label={t.detalle.elegirPlan}
            >
              <div
                ref={columnaRef}
                className={cn(
                  "min-w-0 space-y-4 sticky",
                  "top-24",
                  "data-[anclaje=abajo]:bottom-6 data-[anclaje=abajo]:top-auto",
                  "data-[anclaje=arriba]:bottom-auto data-[anclaje=arriba]:top-24",
                )}
              >
                <PanelPlanes
                  idPrefix="escritorio"
                  servicio={servicio}
                  indice={indice}
                  onIndiceChange={setIndice}
                  onCotizar={setPlanCotizado}
                  agregarMantencion={agregarMantencion}
                  onAgregarMantencionChange={setAgregarMantencion}
                  mesesMantencion={mesesMantencion}
                  onMantencionChange={setMesesMantencion}
                  incluyeAbierto={incluyeAbierto}
                  onIncluyeAbiertoChange={setIncluyeAbierto}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ================================================================
          BARRA FIJA MÓVIL
      ================================================================ */}
      <div className="fixed inset-x-0 bottom-0 z-40 w-full max-w-full border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/95 px-4 py-3 shadow-[0_-4px_16px_rgb(26_23_18_/_0.1)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-[var(--color-text-muted)]">
              {planActivo.nombre[locale]}
            </p>

            <div className="flex min-w-0 items-center gap-2">
              <div className="min-w-0 max-w-full font-display text-lg font-bold tabular-nums text-[var(--color-text-primary)]">
                <Precio
                  monto={planActivo.precio}
                  hasta={planActivo.precioHasta}
                  estimado={planActivo.precioEstimado}
                  compacto
                  claseSecundaria="text-[10px]"
                />
              </div>

              <span className="hidden shrink-0 items-center gap-1 text-xs font-normal text-[var(--color-text-muted)] sm:flex">
                <IconReloj className="h-3 w-3" aria-hidden="true" />

                {planActivo.entrega[locale]}

                <IconRevisiones className="ml-1 h-3 w-3" aria-hidden="true" />

                {planActivo.revisiones}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPlanCotizado(planActivo)}
            className="shrink-0 whitespace-nowrap rounded-[var(--radius-md)] bg-[var(--color-brand-solid)] px-5 py-2.5 text-sm font-medium text-[var(--color-brand-on-solid)] shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--color-brand-solid-hover)]"
          >
            {t.detalle.cotizar}
          </button>
        </div>
      </div>

      {planCotizado && (
        <CotizarModal
          servicio={servicio}
          plan={planCotizado}
          tramo={tramoMantencion}
          onClose={() => setPlanCotizado(null)}
        />
      )}
    </>
  );
}
