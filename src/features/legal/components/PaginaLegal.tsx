import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import { getServicios } from "@/features/services/api/services.service";

/** Fecha de última revisión de los documentos legales. Al cambiar el texto de
 *  cualquiera de ellos hay que actualizarla y subir la versión: la Ley 21.719
 *  exige poder demostrar qué versión aceptó cada persona y cuándo. */
export const VERSION_LEGAL = "1.0";
export const ACTUALIZADO = "21 de agosto de 2026";

interface Seccion {
  id: string;
  titulo: string;
}

interface Props {
  titulo: string;
  descripcion: string;
  secciones: Seccion[];
  children: ReactNode;
}

export default function PaginaLegal({ titulo, descripcion, secciones, children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol role="list" className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-brand)]"
              >
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-[var(--color-text-subtle)]">
              /
            </li>
            <li>
              <span aria-current="page" className="font-medium text-[var(--color-text-primary)]">
                {titulo}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
          <article className="min-w-0">
            <header className="mb-8 border-b border-[var(--color-border)] pb-8">
              <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                {titulo}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-[var(--color-text-body)]">
                {descripcion}
              </p>
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-[var(--color-text-muted)]">Última actualización:</dt>
                  <dd className="font-medium text-[var(--color-text-primary)]">{ACTUALIZADO}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[var(--color-text-muted)]">Versión:</dt>
                  <dd className="font-medium tabular-nums text-[var(--color-text-primary)]">
                    {VERSION_LEGAL}
                  </dd>
                </div>
              </dl>
            </header>

            <div className="contenido-legal">{children}</div>
          </article>

          {/* Índice lateral */}
          <aside className="hidden lg:block" aria-label="Contenido del documento">
            <nav className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                En esta página
              </p>
              <ol role="list" className="space-y-1 border-l border-[var(--color-border)]">
                {secciones.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-[var(--color-text-muted)] transition-[color,border-color] duration-[var(--duration-fast)] hover:border-[var(--color-brand-border)] hover:text-[var(--color-brand)]"
                    >
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </main>
      <Footer servicios={getServicios()} />
    </>
  );
}
