"use client";

import { cn } from "@/shared/lib/cn";
import { permitePreferencias } from "@/features/consent/lib/consent";
import { THEME_STORAGE_KEY } from "@/shared/lib/theme";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import { IconSol, IconLuna } from "@/shared/lib/icons";

/**
 * El tema no necesita estado de React: el atributo `data-theme` del documento
 * ya es la fuente de verdad y el CSS reacciona a él. Por eso el icono y la
 * etiqueta se resuelven con la variante `dark:` en lugar de re-renderizar, y
 * no hay desincronización posible entre servidor y cliente.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n();

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    // El tema se aplica siempre; recordarlo entre visitas requiere permiso.
    // Sin consentimiento el sitio funciona igual, solo no memoriza.
    if (permitePreferencias()) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Modo privado: el tema aplica igual durante esta sesión
      }
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-body)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand)]",
        className,
      )}
    >
      <IconLuna className="h-[1.15rem] w-[1.15rem] dark:hidden" aria-hidden="true" />
      <IconSol className="hidden h-[1.15rem] w-[1.15rem] dark:block" aria-hidden="true" />
      {/* Solo una de las dos etiquetas está en el árbol de accesibilidad,
          según el tema activo */}
      <span className="sr-only dark:hidden">{t.nav.temaOscuro}</span>
      <span className="sr-only hidden dark:inline">{t.nav.temaClaro}</span>
    </button>
  );
}
