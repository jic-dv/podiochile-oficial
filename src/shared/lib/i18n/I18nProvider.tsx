"use client";

import { useSyncExternalStore, useCallback, type ReactNode } from "react";
import { dictionaries, type Locale, type Dictionary } from "./dictionaries";
import { permitePreferencias } from "@/features/consent/lib/consent";
import { LOCALE_STORAGE_KEY as STORAGE_KEY } from "@/shared/lib/theme";

function leerGuardado(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "es" ? v : "es";
  } catch {
    return "es";
  }
}

/**
 * El idioma vive fuera de React (localStorage + atributo lang del documento).
 * useSyncExternalStore es el puente correcto para eso: React usa el snapshot
 * de servidor durante la hidratación y cambia al del cliente después, sin
 * setState en un efecto ni desajuste de hidratación.
 */
let localeActual: Locale = typeof window === "undefined" ? "es" : leerGuardado();

const suscriptores = new Set<() => void>();

function subscribe(cb: () => void) {
  suscriptores.add(cb);
  return () => {
    suscriptores.delete(cb);
  };
}

const getSnapshot = (): Locale => localeActual;
const getServerSnapshot = (): Locale => "es";

export function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useI18n() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((next: Locale) => {
    if (next === localeActual) return;
    localeActual = next;
    document.documentElement.lang = next === "en" ? "en" : "es-CL";
    // Igual que el tema: el idioma cambia siempre, recordarlo necesita permiso
    if (permitePreferencias()) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Se aplica solo durante esta sesión
      }
    }
    for (const cb of suscriptores) cb();
  }, []);

  return { locale, t: dictionaries[locale] as Dictionary, setLocale };
}
