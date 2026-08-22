"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dolar } from "@/shared/lib/currency/dolar.service";

/**
 * El valor del dólar se consulta una sola vez en el servidor y baja por
 * contexto. Se usa contexto y no props porque el precio se pinta en siete
 * lugares distintos del árbol, y hacerlo bajar a mano por cada uno ensuciaría
 * las firmas de componentes que no tienen nada que ver con la moneda.
 */
const DolarContext = createContext<Dolar | null>(null);

export function DolarProvider({
  valor,
  children,
}: {
  valor: Dolar;
  children: ReactNode;
}) {
  return <DolarContext.Provider value={valor}>{children}</DolarContext.Provider>;
}

/** null si el proveedor no está montado: la UI cae al precio en una sola moneda */
export function useDolar(): Dolar | null {
  return useContext(DolarContext);
}
