"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Un único IntersectionObserver para toda la página en lugar de uno por
 * elemento: el navegador agrupa las intersecciones en un solo callback y el
 * costo deja de crecer con la cantidad de elementos animados.
 */
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.setAttribute("data-reveal", "visible");
        // Una vez revelado no vuelve a animarse: se deja de observar
        observer?.unobserve(el);
        // Liberar la capa de composición al terminar la transición
        el.addEventListener(
          "transitionend",
          () => el.setAttribute("data-reveal-done", ""),
          { once: true },
        );
      }
    },
    // Se dispara un poco antes de entrar para que el elemento ya esté
    // en movimiento cuando el usuario lo alcanza con la vista
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  return observer;
}

interface RevealProps {
  children: ReactNode;
  /** Retardo en ms, para escalonar grupos. Máximo recomendado: 6 elementos */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  role?: string;
}

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Con movimiento reducido el contenido se muestra de inmediato
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.setAttribute("data-reveal", "visible");
      return;
    }

    const obs = getObserver();
    obs?.observe(el);
    return () => obs?.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
