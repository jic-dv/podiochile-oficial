import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { clasesBoton, type Variant, type Size } from "@/shared/components/ui/Button";

interface Props extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/**
 * Enlace con aspecto de botón. Existe porque `<Link><Button/></Link>` produce
 * un <button> dentro de un <a>, que el HTML prohíbe: el navegador rompe el
 * anidamiento y quedan dos controles enfocables para una sola acción.
 */
export default function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <Link className={clasesBoton({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
