import { cn } from "@/shared/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
export type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand-solid)] text-[var(--color-brand-on-solid)] hover:bg-[var(--color-brand-solid-hover)] shadow-[var(--shadow-brand)] hover:-translate-y-px active:translate-y-0 ",
  secondary:
    "bg-[var(--color-brand-soft)] text-[var(--color-brand)] hover:bg-[var(--color-surface-inset)]",
  outline:
    "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-body)] hover:border-[var(--color-brand-border)] hover:text-[var(--color-brand)]",
  ghost:
    "bg-transparent text-[var(--color-text-body)] hover:bg-[var(--color-surface-muted)]",
  whatsapp:
    "bg-[#0b7a45] text-white hover:bg-[#096237] shadow-[0_6px_20px_rgb(11_122_69_/_0.28)] hover:-translate-y-px active:translate-y-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-[var(--radius-md)]",
  md: "h-11 px-5 text-sm rounded-[var(--radius-md)]",
  lg: "h-12 px-7 text-base rounded-[var(--radius-lg)]",
};

/**
 * Clases de un control con aspecto de botón. Vive aparte del componente para
 * que un enlace pueda verse igual sin envolver un <button> dentro de un <a>,
 * anidamiento que el HTML no permite.
 */
export function clasesBoton({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 font-medium leading-none select-none cursor-pointer",
    "transition-[background-color,border-color,color,translate,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-soft)]",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-border)] focus-visible:outline-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        clasesBoton({ variant, size }),
        (disabled || loading) && "opacity-55 cursor-not-allowed pointer-events-none",
        className,
      )}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
}
