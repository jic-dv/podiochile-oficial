import { cn } from "@/shared/lib/cn";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  innerClassName?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
}

export default function Section({
  id,
  className,
  innerClassName,
  "aria-labelledby": labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
