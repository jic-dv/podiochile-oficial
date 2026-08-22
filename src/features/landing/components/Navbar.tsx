"use client";

import Logo from "@/shared/components/core/Logo";
import Button from "@/shared/components/ui/Button";
import ThemeToggle from "@/shared/components/ui/ThemeToggle";
import { useSeccionActiva } from "@/shared/hooks/useSeccionActiva";
import { cn } from "@/shared/lib/cn";
import type { Locale } from "@/shared/lib/i18n/dictionaries";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import {
  IconCerrar,
  IconCheck,
  IconComoFunciona,
  IconFaq,
  IconIdioma,
  IconMenu,
  IconPrecios,
  IconServicios,
} from "@/shared/lib/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Constante de módulo: si el array se recreara en cada render, el observer
 *  del hook se volvería a suscribir sin parar. */
const SECCIONES = ["servicios", "precios", "como-funciona", "faq"] as const;

const IDIOMAS: { code: Locale; label: string; short: string }[] = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
];

const FOCUSABLES =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Control de la barra: mismo tratamiento para idioma, tema y menú */
const controlNav =
  "flex h-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--navbar-text)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--navbar-hover-bg)] hover:text-[var(--navbar-active-text)]";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [idiomaAbierto, setIdiomaAbierto] = useState(false);
  const idiomaRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLButtonElement>(null);

  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname();
  const seccionActiva = useSeccionActiva(SECCIONES);

  // Contacto no va aquí: el CTA de la derecha ya lleva a esa sección
  const links = [
    { id: "servicios", label: t.nav.servicios, Icon: IconServicios },
    { id: "precios", label: t.nav.precios, Icon: IconPrecios },
    { id: "como-funciona", label: t.nav.comoFunciona, Icon: IconComoFunciona },
    { id: "faq", label: t.nav.faq, Icon: IconFaq },
  ].map((l) => ({
    ...l,
    href: `/#${l.id}`,
    // Las secciones solo existen en el home; fuera de él nada se resalta
    activo: pathname === "/" && seccionActiva === l.id,
  }));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Cerrar el desplegable de idioma al hacer clic fuera o presionar Escape
  useEffect(() => {
    if (!idiomaAbierto) return;
    const onClick = (e: MouseEvent) => {
      if (!idiomaRef.current?.contains(e.target as Node))
        setIdiomaAbierto(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdiomaAbierto(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [idiomaAbierto]);

  // Drawer abierto: se bloquea el scroll de fondo, el tabulador circula dentro
  // y Escape cierra. Al cerrar, el foco vuelve al botón que lo abrió.
  useEffect(() => {
    if (!menuAbierto) return;

    // Se captura ahora: en la limpieza la ref ya podría apuntar a otro nodo
    const disparador = disparadorRef.current;
    const scrollPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>(FOCUSABLES)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuAbierto(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables =
        drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLES);
      if (!focusables?.length) return;

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = scrollPrevio;
      disparador?.focus();
    };
  }, [menuAbierto]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl",
          "transition-[background-color,box-shadow,border-color] duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
          scrolled
            ? "border-[var(--navbar-border)] bg-[var(--navbar-bg-scrolled)] shadow-[var(--shadow-lg)]"
            : "border-transparent bg-[var(--navbar-bg)]",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* La barra ya es oscura: el logo no necesita placa */}
          <Link
            href="/"
            aria-label={`Podio Chile - ${t.nav.inicio}`}
            title={`Podio Chile - ${t.nav.inicio}`}
            className="flex shrink-0 items-center rounded-[var(--radius-sm)]"
          >
            <Logo alto={30} placa={false} priority />
          </Link>

          <nav
            aria-label={t.nav.menuPrincipal}
            className="hidden items-center gap-0.5 lg:flex"
          >
            {links.map(({ href, label, Icon, activo }) => (
              <Link
                key={href}
                href={href}
                aria-current={activo ? "location" : undefined}
                title={`${label}`}
                className={cn(
                  "group flex items-center gap-1.5 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                  activo
                    ? "bg-[var(--navbar-active-bg)] text-[var(--navbar-active-text)]"
                    : "text-[var(--navbar-text)] hover:bg-[var(--navbar-hover-bg)] hover:text-[var(--navbar-active-text)]",
                )}
              >
                <Icon
                  className={cn(
                    "h-[1.05rem] w-[1.05rem] transition-colors duration-[var(--duration-fast)]",
                    activo
                      ? "text-[var(--navbar-active-text)]"
                      : "text-[var(--navbar-muted)] group-hover:text-[var(--navbar-active-text)]",
                  )}
                  aria-hidden="true"
                />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Idioma */}
            <div ref={idiomaRef} className="relative">
              <button
                type="button"
                onClick={() => setIdiomaAbierto((v) => !v)}
                aria-label={t.nav.idioma}
                aria-expanded={idiomaAbierto}
                aria-haspopup="listbox"
                className={cn(controlNav, "gap-1 px-2 text-sm font-medium")}
              >
                <IconIdioma
                  className="h-[1.15rem] w-[1.15rem]"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold tabular-nums">
                  {IDIOMAS.find((i) => i.code === locale)?.short}
                </span>
              </button>

              {idiomaAbierto && (
                <ul
                  role="listbox"
                  aria-label={t.nav.idioma}
                  className="absolute right-0 top-full mt-1.5 min-w-[9rem] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--navbar-border)] bg-[var(--navbar-bg-scrolled)] py-1 shadow-[var(--shadow-lg)] backdrop-blur-xl"
                >
                  {IDIOMAS.map((idioma) => (
                    <li key={idioma.code} role="none">
                      <button
                        type="button"
                        role="option"
                        aria-selected={locale === idioma.code}
                        onClick={() => {
                          setLocale(idioma.code);
                          setIdiomaAbierto(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors duration-[var(--duration-fast)] hover:bg-[var(--navbar-hover-bg)]",
                          locale === idioma.code
                            ? "font-semibold text-[var(--navbar-active-text)]"
                            : "text-[var(--navbar-text)]",
                        )}
                      >
                        {idioma.label}
                        {locale === idioma.code && (
                          <IconCheck
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ThemeToggle className={controlNav} />

            <span
              className="mx-1 hidden h-5 w-px bg-[var(--navbar-border)] lg:block"
              aria-hidden="true"
            />

            <Link href="/#contacto" title={t.nav.ctaExperto} className="hidden lg:block">
              <Button size="sm">{t.nav.ctaExperto}</Button>
            </Link>

            <button
              ref={disparadorRef}
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-label={t.nav.abrirMenu}
              aria-expanded={menuAbierto}
              aria-controls="menu-movil"
              className={cn(controlNav, "w-9 lg:hidden")}
            >
              <IconMenu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Drawer móvil ────────────────────────────────────────────────
          Se mantiene montado y se apaga con `inert` en vez de desmontarse:
          así la animación también ocurre al cerrar, y estando inerte queda
          fuera del recorrido de teclado y del árbol de accesibilidad. */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuAbierto ? "pointer-events-auto" : "pointer-events-none",
        )}
        inert={!menuAbierto}
      >
        {/* Velo translúcido y desenfocado. Es un elemento decorativo y no un
            botón: cerrar tocando fuera es una comodidad de puntero, y quien
            usa teclado tiene Escape y el botón de cerrar. Como botón habría
            dos controles con la misma etiqueta dentro del diálogo. */}
        <div
          aria-hidden="true"
          onClick={() => setMenuAbierto(false)}
          className={cn(
            "absolute inset-0 bg-[var(--navbar-overlay)] backdrop-blur-md",
            "transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
            menuAbierto ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          ref={drawerRef}
          id="menu-movil"
          role="dialog"
          aria-modal={menuAbierto || undefined}
          aria-label={t.nav.menuPrincipal}
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col border-l border-[var(--navbar-border)]",
            "bg-[var(--navbar-bg-scrolled)] shadow-[var(--shadow-xl)] backdrop-blur-2xl",
            "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)]",
            menuAbierto ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--navbar-border)] px-4">
            <Logo alto={26} placa={false} />
            <button
              type="button"
              onClick={() => setMenuAbierto(false)}
              aria-label={t.nav.cerrarMenu}
              className={cn(controlNav, "w-9")}
            >
              <IconCerrar className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={t.nav.menuPrincipal}
            className="flex-1 overflow-y-auto p-4"
          >
            <ul className="flex flex-col gap-1">
              {links.map(({ href, label, Icon, activo }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuAbierto(false)}
                    aria-current={activo ? "location" : undefined}
                    title={label}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 py-3 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                      activo
                        ? "bg-[var(--navbar-active-bg)] text-[var(--navbar-active-text)]"
                        : "text-[var(--navbar-text)] hover:bg-[var(--navbar-hover-bg)] hover:text-[var(--navbar-active-text)]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        activo
                          ? "text-[var(--navbar-active-text)]"
                          : "text-[var(--navbar-muted)]",
                      )}
                      aria-hidden="true"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-[var(--navbar-border)] p-4">
            <Link
              href="/#contacto"
              onClick={() => setMenuAbierto(false)}
              title={t.nav.ctaExperto}
              className="block"
            >
              <Button size="lg" className="w-full">
                {t.nav.ctaExperto}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
