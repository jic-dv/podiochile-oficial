"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import type { Imagen } from "@/features/services/schemas/service.schema";
import { IconFlechaIzquierda, IconFlechaDerecha, IconAmpliar } from "@/shared/lib/icons";

/** Un vector no gana nada en el optimizador de Next, y pasarlo por ahi obliga
 *  a habilitar dangerouslyAllowSVG. Se sirve directo desde /public. */
const esVector = (src: string) => src.toLowerCase().endsWith(".svg");

export default function GaleriaServicio({ imagenes }: { imagenes: Imagen[] }) {
  const { locale, t } = useI18n();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [actual, setActual] = useState(0);
  const [abierta, setAbierta] = useState(-1);

  const onSelect = useCallback(() => {
    if (emblaApi) setActual(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sin llamada ansiosa: Embla arranca en el indice 0, igual que el estado
    // inicial. "reInit" cubre el caso de que un resize cambie el snap activo.
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const anterior = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const siguiente = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section aria-label={t.detalle.galeria}>
      <div className="relative">
        {/* Marco con proporción fija: la altura queda reservada antes de que
            carguen las imágenes, así el carrusel no desplaza el layout */}
        <div
          className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y">
            {imagenes.map((img, i) => (
              <div key={img.src} className="relative min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  onClick={() => setAbierta(i)}
                  aria-label={`${t.detalle.ampliar}: ${img.alt[locale]}`}
                  className="group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-[var(--color-brand-border)] focus-visible:-outline-offset-2"
                >
                  <Image
                    src={img.src}
                    alt={img.alt[locale]}
                    width={img.ancho}
                    height={img.alto}
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    unoptimized={esVector(img.src)}
                    priority={i === 0}
                    className="h-auto w-full"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[rgb(10_10_10_/_0.62)] text-white opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-base)] group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <IconAmpliar className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {imagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label={t.detalle.imagenAnterior}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/90 text-[var(--color-text-primary)] shadow-[var(--shadow-md)] backdrop-blur transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-brand)]"
            >
              <IconFlechaIzquierda className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label={t.detalle.imagenSiguiente}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/90 text-[var(--color-text-primary)] shadow-[var(--shadow-md)] backdrop-blur transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-brand)]"
            >
              <IconFlechaDerecha className="h-5 w-5" aria-hidden="true" />
            </button>

            <p
              aria-live="polite"
              className="absolute bottom-3 left-3 rounded-full bg-[rgb(10_10_10_/_0.66)] px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm"
            >
              {actual + 1} {t.detalle.imagenDe} {imagenes.length}
            </p>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {imagenes.length > 1 && (
        <ul role="list" className="mt-3 grid grid-cols-5 gap-2">
          {imagenes.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`${t.detalle.irImagen} ${i + 1}`}
                aria-current={actual === i}
                className={cn(
                  "block w-full overflow-hidden rounded-[var(--radius-md)] border-2 transition-[border-color,opacity] duration-[var(--duration-fast)]",
                  actual === i
                    ? "border-[var(--color-brand-border)] opacity-100"
                    : "border-[var(--color-border)] opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={img.ancho}
                  height={img.alto}
                  sizes="120px"
                  unoptimized={esVector(img.src)}
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        open={abierta >= 0}
        index={Math.max(abierta, 0)}
        close={() => setAbierta(-1)}
        plugins={[Zoom, Thumbnails, Counter]}
        slides={imagenes.map((img) => ({
          src: img.src,
          alt: img.alt[locale],
          width: img.ancho,
          height: img.alto,
        }))}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        // La libreria rotula sus controles en ingles por defecto
        labels={{
          Previous: t.detalle.imagenAnterior,
          Next: t.detalle.imagenSiguiente,
          Close: t.detalle.cerrarGaleria,
          "Zoom in": t.detalle.acercar,
          "Zoom out": t.detalle.alejar,
        }}
        carousel={{ finite: true }}
        styles={{ container: { backgroundColor: "rgb(8 8 8 / 0.95)" } }}
      />
    </section>
  );
}
