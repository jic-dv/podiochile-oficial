"use client";

import { CREADOR } from "@/shared/lib/creador";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconGithub, IconLinkedin } from "@/shared/lib/icons";
import Image from "next/image";

const REDES = [
  { nombre: "LinkedIn", href: CREADOR.linkedin, Icon: IconLinkedin },
  { nombre: "GitHub", href: CREADOR.github, Icon: IconGithub },
];

/**
 * Crédito del creador. Una línea al pie de la columna Legal, no una tarjeta:
 * es una firma, y una firma que ocupa lo mismo que una sección compite con el
 * contenido que sí tiene que leerse.
 */
export default function CreditoCreador() {
  const { t } = useI18n();

  return (
    <div className="mt-8 border-t border-[var(--footer-border)] pt-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--footer-muted)]">
        {t.footer.creadoPor}
      </p>

      <div className="mt-2.5 flex items-center gap-2.5">
        <Image
          src={CREADOR.avatar}
          alt="Avatar José Contreras"
          width={72}
          height={72}
          sizes="36px"
          title="Avatar José Contreras"
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[var(--footer-border)]"
        />
        <div className="flex-1">
          <p className="text-[13px] font-semibold leading-tight text-[var(--footer-title)]">
            {CREADOR.nombre}
          </p>
          <p className="text-[11px] leading-tight text-[var(--footer-muted)]">
            {t.footer.especialidad}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          {REDES.map(({ nombre, href, Icon }) => (
            <a
              key={nombre}
              href={href}
              target="_blank"
              rel="noopener noreferrer me"
              title={`${nombre}`}
              aria-label={`${t.footer.verPerfil} ${nombre}`}
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--footer-text)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--footer-card)] hover:text-[var(--footer-link-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--footer-link-hover)]"
            >
              <Icon className="h-[0.95rem] w-[0.95rem]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
