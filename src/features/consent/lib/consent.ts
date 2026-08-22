import { LOCALE_STORAGE_KEY, THEME_STORAGE_KEY } from "@/shared/lib/theme";

export const CONSENT_KEY = "podio-consentimiento";

/** Versión del texto de consentimiento. Si cambia lo que se guarda o para qué,
 *  esto sube y se vuelve a preguntar: un consentimiento dado sobre otro texto
 *  no vale para el nuevo (Ley 21.719, art. 12: informado y específico). */
export const VERSION_CONSENTIMIENTO = 1;

export type Decision = "aceptado" | "rechazado";

export interface Consentimiento {
  decision: Decision;
  version: number;
  /** ISO 8601. La ley exige poder acreditar cuándo se prestó */
  fecha: string;
}

/**
 * Claves que solo se pueden escribir con consentimiento. Son preferencias de
 * uso, no datos necesarios para que el sitio funcione: sin ellas el sitio
 * sigue andando, solo deja de recordar cómo lo dejaste.
 */
const CLAVES_PREFERENCIAS = [THEME_STORAGE_KEY, LOCALE_STORAGE_KEY];

const suscriptores = new Set<() => void>();
let cache: Consentimiento | null | undefined;

function leerDelAlmacen(): Consentimiento | null {
  try {
    const crudo = localStorage.getItem(CONSENT_KEY);
    if (!crudo) return null;
    const dato = JSON.parse(crudo) as Partial<Consentimiento>;
    if (dato.decision !== "aceptado" && dato.decision !== "rechazado") return null;
    // Un consentimiento de una versión anterior no sirve: se vuelve a preguntar
    if (dato.version !== VERSION_CONSENTIMIENTO) return null;
    return {
      decision: dato.decision,
      version: dato.version,
      fecha: typeof dato.fecha === "string" ? dato.fecha : "",
    };
  } catch {
    return null;
  }
}

/** null = todavía no decide, y mientras tanto no se guarda nada */
export function getConsentimiento(): Consentimiento | null {
  if (typeof window === "undefined") return null;
  if (cache === undefined) cache = leerDelAlmacen();
  return cache;
}

/** Fuera del servidor no hay decisión: el banner aparece tras hidratar */
export function getConsentimientoServidor(): Consentimiento | null {
  return null;
}

export function subscribe(cb: () => void): () => void {
  suscriptores.add(cb);
  return () => {
    suscriptores.delete(cb);
  };
}

function avisar() {
  for (const cb of suscriptores) cb();
}

/**
 * Guarda la decisión. Al rechazar **borra lo ya guardado**: de nada sirve dejar
 * de escribir si lo escrito antes sigue ahí.
 */
export function decidir(decision: Decision): void {
  const registro: Consentimiento = {
    decision,
    version: VERSION_CONSENTIMIENTO,
    fecha: new Date().toISOString(),
  };

  if (decision === "rechazado") olvidarPreferencias();

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(registro));
  } catch {
    // Modo privado o almacenamiento lleno: la decisión rige esta sesión
  }
  cache = registro;
  avisar();
}

/** Borra las preferencias guardadas. No toca el registro de consentimiento:
 *  ese es la prueba de que la persona dijo que no. */
export function olvidarPreferencias(): void {
  try {
    for (const clave of CLAVES_PREFERENCIAS) localStorage.removeItem(clave);
  } catch {
    // Sin almacenamiento no hay nada que borrar
  }
}

/** Permite volver atrás desde /cookies, como exige el derecho a retirar */
export function revocar(): void {
  olvidarPreferencias();
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // idem
  }
  cache = null;
  avisar();
}

/**
 * La puerta. Todo `localStorage.setItem` de preferencias pasa por aquí: si no
 * hay un "aceptado" explícito, no se escribe. Sin decisión tampoco se escribe,
 * porque el consentimiento se presta, no se presume.
 */
export function permitePreferencias(): boolean {
  return getConsentimiento()?.decision === "aceptado";
}
