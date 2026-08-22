"use client";

import { useEffect, useState } from "react";

/** Línea de lectura: la sección activa es la última cuyo borde superior ya la
 *  cruzó. Se mantiene por debajo del navbar fijo para que al llegar por un
 *  ancla la sección de destino quede marcada. */
const linea = () => Math.max(112, window.innerHeight * 0.3);

/**
 * Devuelve el id de la sección que el visitante está mirando, o null si aún no
 * ha llegado a ninguna (el hero) o la ruta no tiene esas secciones.
 *
 * No se resuelve leyendo `location.hash`: el hash solo cambia al pulsar un
 * enlace, así que al desplazarse el resaltado se quedaría congelado.
 *
 * Tampoco basta con preguntarle al observer qué hay dentro de una banda
 * estrecha: entre dos secciones no habría ninguna y el resaltado parpadearía.
 * El observer se usa solo para saber *cuándo* recalcular; la sección activa es
 * la última que cruzó la línea de lectura, criterio que nunca deja huecos.
 */
export function useSeccionActiva(ids: readonly string[]): string | null {
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      // Orden de documento, que no tiene por qué ser el del menú
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    if (secciones.length === 0) return;

    const recalcular = () => {
      const y = linea();
      let actual: string | null = null;
      for (const seccion of secciones) {
        if (seccion.getBoundingClientRect().top <= y) actual = seccion.id;
        else break;
      }
      setActiva(actual);
    };

    // Márgenes amplios: interesa recibir aviso al entrar y al salir de la
    // pantalla, no acotar una banda
    const observer = new IntersectionObserver(recalcular, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    for (const seccion of secciones) observer.observe(seccion);

    window.addEventListener("scroll", recalcular, { passive: true });
    window.addEventListener("resize", recalcular, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", recalcular);
      window.removeEventListener("resize", recalcular);
    };
  }, [ids]);

  return activa;
}
