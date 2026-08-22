"use client";

import type { Servicio } from "@/features/services/schemas/service.schema";
import CreditoCreador from "@/shared/components/core/CreditoCreador";
import Logo from "@/shared/components/core/Logo";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ servicios }: { servicios: Servicio[] }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const columnas = [
    {
      titulo: t.footer.servicios,
      links: [
        ...servicios.map((s) => ({
          label: s.titulo[locale],
          href: `/servicios/${s.slug}`,
        })),
        { label: t.footer.mantencion, href: "/#contacto" },
      ],
    },
    {
      titulo: t.footer.empresa,
      links: [
        { label: t.nav.comoFunciona, href: "/#como-funciona" },
        { label: t.nav.precios, href: "/#precios" },
        { label: t.nav.faq, href: "/#faq" },
        { label: t.nav.contacto, href: "/#contacto" },
      ],
    },
    {
      titulo: t.footer.legal,
      links: [
        { label: t.footer.privacidad, href: "/privacidad" },
        { label: t.footer.terminos, href: "/terminos" },
        { label: t.footer.cookies, href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-(--footer-border) bg-(--footer-bg)">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              aria-label={`Podio Chile - ${t.nav.inicio}`}
              className="mb-4 inline-flex rounded-sm"
            >
              <Logo alto={32} placa={false} />
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-(--footer-text)">
              {t.footer.descripcion}
            </p>
            <p className="text-xs text-(--footer-muted)">
              {t.footer.ubicacion}
            </p>
          </div>

          {columnas.map((col) => (
            <div key={col.titulo}>
              <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-(--footer-title)">
                {col.titulo}
              </h2>
              <ul role="list" className="space-y-2.5">
                {col.links.map((link) => {
                  // Los enlaces con ancla apuntan al home; el resaltado por
                  // ruta solo tiene sentido en los que son una página propia
                  const activo =
                    !link.href.includes("#") && pathname === link.href;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        aria-current={activo ? "page" : undefined}
                        className={cn(
                          "text-sm transition-colors duration-(--duration-fast) hover:text-(--footer-link-hover)",
                          activo
                            ? "font-semibold text-(--footer-link-hover)"
                            : "text-(--footer-text)",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* El crédito cierra la columna Legal: es una firma, y ahí no
                  compite con el contenido que sí hay que leer */}
              {col.titulo === t.footer.legal && <CreditoCreador />}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-(--footer-border) pt-6 text-xs text-(--footer-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Podio Chile. {t.footer.derechos}
          </p>
          <p>{t.footer.hecho}</p>
        </div>
      </div>
    </footer>
  );
}
