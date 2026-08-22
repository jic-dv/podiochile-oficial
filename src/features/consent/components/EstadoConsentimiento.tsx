"use client";

import { useState, useSyncExternalStore } from "react";
import {
  getConsentimiento,
  getConsentimientoServidor,
  revocar,
  subscribe,
} from "@/features/consent/lib/consent";
import Button from "@/shared/components/ui/Button";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";

/**
 * Panel dentro de /cookies con la decisión vigente y el botón para retirarla.
 *
 * La Ley 21.719 reconoce el derecho a **revocar el consentimiento en cualquier
 * momento y con la misma facilidad con que se otorgó**. Un aviso que solo se
 * puede aceptar una vez y nunca deshacer no cumple: por eso este panel existe y
 * está enlazado desde el propio aviso.
 */
export default function EstadoConsentimiento() {
  const { locale, t } = useI18n();
  const consentimiento = useSyncExternalStore(
    subscribe,
    getConsentimiento,
    getConsentimientoServidor,
  );
  const [revocado, setRevocado] = useState(false);

  const texto =
    consentimiento === null
      ? t.cookies.estadoPendiente
      : consentimiento.decision === "aceptado"
        ? t.cookies.estadoAceptado
        : t.cookies.estadoRechazado;

  const fecha = consentimiento?.fecha
    ? new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-CL", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(consentimiento.fecha))
    : null;

  return (
    <div className="not-prose my-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        {t.cookies.estadoTitulo}
      </p>
      <p className="mt-2 font-semibold text-[var(--color-text-primary)]">{texto}</p>
      {fecha && (
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {t.cookies.estadoFecha} {fecha}
        </p>
      )}

      {revocado && (
        <p role="status" className="mt-3 text-sm font-medium text-[var(--color-accent)]">
          {t.cookies.revocado}
        </p>
      )}

      <Button
        variant="outline"
        size="md"
        className="mt-4"
        onClick={() => {
          revocar();
          setRevocado(true);
        }}
      >
        {t.cookies.cambiar}
      </Button>
    </div>
  );
}
