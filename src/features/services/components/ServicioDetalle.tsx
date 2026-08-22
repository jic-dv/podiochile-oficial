"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import Reveal from "@/shared/components/core/Reveal";
import Precio from "@/shared/components/ui/Precio";
import { Accordion } from "@/features/landing/components/FaqSection";
import CotizarModal from "@/features/quotes/components/CotizarModal";
import { tramoIncluido, tramosAmpliables } from "@/features/quotes/lib/quotes";
import GaleriaServicio from "./GaleriaServicio";
import AcercaDeTrabajo from "./AcercaDeTrabajo";
import PanelPlanes from "./PanelPlanes";
import ComparativaPaquetes from "./ComparativaPaquetes";
import type { Servicio, Plan } from "@/features/services/schemas/service.schema";
import {
  IconLanding, IconMultipagina, IconCrm, IconChevronRight,
  IconFlechaDerecha, IconReloj, IconRevisiones,
} from "@/shared/lib/icons";

const ICONOS = {
  landing: IconLanding,
  multipagina: IconMultipagina,
  crm: IconCrm,
} as const;

interface Props {
  servicio: Servicio;
  otros: Servicio[];
}

/** Alto de la barra fija más su holgura, y el aire bajo la columna */
const MARGEN_SUPERIOR = 96;
const MARGEN_INFERIOR = 24;

export default function ServicioDetalle({ servicio, otros }: Props) {
  const { locale, t } = useI18n();
  // Abre siempre en Básico: es el punto de entrada y deja que el visitante
  // suba de plan por decisión propia. Se busca por nivel y no por posición
  // para no depender del orden de la tupla.
  const [indice, setIndice] = useState(() =>
    Math.max(0, servicio.planes.findIndex((p) => p.nivel === "basico")),
  );
  const [planCotizado, setPlanCotizado] = useState<Plan | null>(null);
  /** El soporte incluido lo trae el plan. El checkbox decide si además se
   *  extiende, y el select con cuál de los tramos que lo superan. */
  const [agregarMantencion, setAgregarMantencion] = useState(false);
  const [mesesMantencion, setMesesMantencion] = useState(0);
  /** Sube al padre porque decide el modo pegajoso de la columna, y porque el
   *  panel se monta dos veces y las dos instancias deben coincidir. */
  const [incluyeAbierto, setIncluyeAbierto] = useState(false);

  const Icono = ICONOS[servicio.icono];
  const planActivo = servicio.planes[indice];

  // Los tramos ampliables dependen del plan: si ya trae 6 meses, ofrecer "3
  // meses" sería venderle menos de lo que ya tiene
  const ampliables = tramosAmpliables(servicio, planActivo);
  const tramoMantencion = agregarMantencion
    ? (ampliables.find((x) => x.meses === mesesMantencion) ??
      ampliables[0] ??
      tramoIncluido(planActivo))
    : servicio.mantencion
      ? tramoIncluido(planActivo)
      : null;

  // Anclaje de la columna pegajosa. Si el panel cabe entero bajo la barra, se
  // ancla arriba, como siempre. Si no cabe (típicamente al desplegar "Ver
  // todo" en una pantalla baja), se ancla abajo: así sube con la página hasta
  // que su base toca el borde inferior y ahí se queda, dejando el botón de
  // cotizar siempre a la vista. Se mide en lugar de suponerlo porque la altura
  // depende del plan, del idioma y del alto de la ventana.
  const columnaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = columnaRef.current;
    if (!el) return;

    const ajustar = () => {
      const cabe = el.offsetHeight + MARGEN_SUPERIOR + MARGEN_INFERIOR <= window.innerHeight;
      el.dataset.anclaje = cabe ? "arriba" : "abajo";
    };

    ajustar();
    // El ResizeObserver cubre cualquier cambio de alto; las dependencias del
    // efecto cubren los dos que sabemos que ocurren (desplegar la lista y
    // cambiar de plan), para no depender de que el observador alcance a
    // entregar antes del siguiente pintado.
    const observador = new ResizeObserver(ajustar);
    observador.observe(el);
    window.addEventListener("resize", ajustar);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", ajustar);
    };
  }, [incluyeAbierto, indice]);

  // Esta página tiene barra fija inferior en móvil. Los botones flotantes viven
  // en el layout, así que se marca el documento y el CSS decide cuánto subirlos
  // según el ancho: en escritorio la barra no existe y no hay nada que esquivar.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.dataset.barraInferior = "";
    return () => {
      delete raiz.dataset.barraInferior;
    };
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        {/* Migas de pan */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol role="list" className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand)]">
                {t.detalle.inicio}
              </Link>
            </li>
            <li aria-hidden="true">
              <IconChevronRight className="h-4 w-4 text-[var(--color-text-subtle)]" />
            </li>
            <li>
              <Link href="/#servicios" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand)]">
                {t.detalle.servicios}
              </Link>
            </li>
            <li aria-hidden="true">
              <IconChevronRight className="h-4 w-4 text-[var(--color-text-subtle)]" />
            </li>
            <li>
              <span aria-current="page" className="font-medium text-[var(--color-text-primary)]">
                {servicio.titulo[locale]}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          {/* ─── Columna izquierda ───────────────────────────────────── */}
          <div className="min-w-0">
            <header className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  aria-hidden="true"
                >
                  <Icono className="h-[1.4rem] w-[1.4rem]" />
                </span>
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                  {servicio.titulo[locale]}
                </h1>
              </div>
              {/* Máximo dos líneas: el argumento largo va en "Acerca de este trabajo" */}
              <p className="text-lg leading-relaxed text-[var(--color-text-body)]">
                {servicio.subtitulo[locale]}. {servicio.pitch[locale]}
              </p>
            </header>

            <GaleriaServicio imagenes={servicio.galeria} />

            {/* En móvil el panel de planes va aquí, justo bajo la galería,
                porque es la decisión que el usuario viene a tomar */}
            <div className="mt-8 lg:hidden">
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

            <div className="mt-12">
              <AcercaDeTrabajo acercaDe={servicio.acercaDe} />
            </div>

            <div className="mt-12">
              <ComparativaPaquetes
                servicio={servicio}
                indiceActivo={indice}
                onElegir={setIndice}
                onCotizar={setPlanCotizado}
              />
            </div>

            {/* Ideal para */}
            <Reveal className="mt-12">
              <h2 className="mb-4 font-display text-xl font-bold text-[var(--color-text-primary)]">
                {t.detalle.ideal}
              </h2>
              <ul role="list" className="flex flex-wrap gap-2">
                {servicio.idealPara[locale].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3.5 py-1.5 text-sm text-[var(--color-text-body)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Proceso */}
            <Reveal className="mt-12">
              <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text-primary)]">
                {t.detalle.proceso}
              </h2>
              <ol role="list" className="relative space-y-6 border-l border-[var(--color-border)] pl-8">
                {servicio.proceso.map((paso, i) => (
                  <li key={paso.titulo.es} className="relative">
                    <span
                      className="absolute -left-[2.4rem] flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-xs font-bold text-[var(--color-brand)]"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      {paso.titulo[locale]}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-body)]">
                      {paso.descripcion[locale]}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Tecnologías */}
            <Reveal className="mt-12">
              <h2 className="mb-4 font-display text-xl font-bold text-[var(--color-text-primary)]">
                {t.detalle.tecnologias}
              </h2>
              <ul role="list" className="flex flex-wrap gap-2">
                {servicio.tecnologias.map((tec) => (
                  <li
                    key={tec}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-body)]"
                  >
                    {tec}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* FAQ del servicio */}
            <Reveal className="mt-12">
              <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text-primary)]">
                {t.detalle.faqTitulo}
              </h2>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-6 shadow-[var(--shadow-card)]">
                <Accordion
                  items={servicio.faq.map((f) => ({
                    pregunta: f.pregunta[locale],
                    respuesta: f.respuesta[locale],
                  }))}
                />
              </div>
            </Reveal>

            {/* Otros servicios */}
            <Reveal className="mt-12">
              <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text-primary)]">
                {t.detalle.otrosQueEntrego}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {otros.map((otro) => {
                  const OtroIcono = ICONOS[otro.icono];
                  return (
                    <Link
                      key={otro.id}
                      href={`/servicios/${otro.slug}`}
                      className="group flex h-full items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-sm)] transition-[translate,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-[var(--color-brand-border)] hover:shadow-[var(--shadow-md)]"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                        aria-hidden="true"
                      >
                        <OtroIcono className="h-[1.35rem] w-[1.35rem]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
                          {otro.titulo[locale]}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--color-text-body)]">
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
          </div>

          {/* ─── Columna derecha, pegajosa en escritorio ─────────────── */}
          <aside className="hidden lg:block" aria-label={t.detalle.elegirPlan}>
            {/* Desplegado, el panel mide más que la pantalla. Anclado arriba
                el botón de cotizar quedaría permanentemente fuera de alcance,
                así que al desplegarse el anclaje pasa al borde inferior: la
                columna sube con la página hasta que su base toca el fondo de
                la pantalla y ahí se queda, con el botón siempre visible.
                Sin `overflow` de por medio, que recortaba la sombra. */}
            <div
              ref={columnaRef}
              className={cn(
                "sticky space-y-4",
                // Sin JS o antes de medir, se comporta como siempre
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

      {/* Barra fija en móvil: el precio y la acción siempre a mano */}
      <div className="sticky bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]/95 px-4 py-3 backdrop-blur-md shadow-[0_-4px_16px_rgb(26_23_18_/_0.1)] lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs text-[var(--color-text-muted)]">
              {planActivo.nombre[locale]}
            </p>
            <p className="flex items-center gap-2 font-display text-lg font-bold tabular-nums text-[var(--color-text-primary)]">
              <Precio
                monto={planActivo.precio}
                hasta={planActivo.precioHasta}
                estimado={planActivo.precioEstimado}
                compacto
                claseSecundaria="text-[10px]"
              />
              <span className="flex items-center gap-1 text-xs font-normal text-[var(--color-text-muted)]">
                <IconReloj className="h-3 w-3" aria-hidden="true" />
                {planActivo.entrega[locale]}
                <IconRevisiones className="ml-1 h-3 w-3" aria-hidden="true" />
                {planActivo.revisiones}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPlanCotizado(planActivo)}
            className="shrink-0 rounded-[var(--radius-md)] bg-[var(--color-brand-solid)] px-5 py-2.5 text-sm font-medium text-[var(--color-brand-on-solid)] shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--color-brand-solid-hover)]"
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
