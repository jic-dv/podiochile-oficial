"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Al cambiar de ruta, la página nueva empieza arriba.
 *
 * `globals.css` pone `scroll-behavior: smooth` en `<html>` para que las anclas
 * del menú (`/#servicios`, `/#faq`) se deslicen. El efecto secundario es que el
 * scroll al tope que hace Next en cada navegación deja de ser instantáneo y se
 * convierte en una animación desde donde estabas: si venías del pie del home,
 * la ruta nueva abría por el final. Se notaba sobre todo en los tres enlaces
 * legales, que solo existen en el footer.
 *
 * Si la URL trae ancla no se toca nada: `/#contacto` tiene que llevar a la
 * sección, no al tope.
 */
export default function ScrollAlTope() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    const irAlTope = () => {
      const raiz = document.documentElement;
      const anterior = raiz.style.scrollBehavior;
      // Se apaga la animación para que el salto sea instantáneo y no una
      // subida larga desde el pie
      raiz.style.scrollBehavior = "auto";

      // Asignación directa en vez de window.scrollTo: no depende de que el
      // agente respete la animación ni de qué elemento sea el que scrollea
      const scrolleable = document.scrollingElement ?? document.documentElement;
      scrolleable.scrollTop = 0;
      scrolleable.scrollLeft = 0;

      raiz.style.scrollBehavior = anterior;
    };

    irAlTope();

    // El router puede reacomodar el scroll después de este efecto. Se repite
    // una vez en la siguiente vuelta del bucle de eventos, que es barato y
    // cubre ese caso sin depender de requestAnimationFrame.
    const reintento = window.setTimeout(irAlTope, 0);
    return () => window.clearTimeout(reintento);
  }, [pathname]);

  return null;
}
