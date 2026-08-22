import Image from "next/image";
import { cn } from "@/shared/lib/cn";

/**
 * El archivo de marca es dorado y blanco sobre transparente: medido contra la
 * superficie del tema claro, su tercio central da 1.04:1, es decir, no se ve.
 * Solo funciona sobre fondo oscuro.
 *
 * Por eso `placa` pinta un fondo oscuro detrás. Se puede apagar donde el
 * contenedor ya sea oscuro por su cuenta, como el navbar. El footer, en cambio,
 * usa una superficie clara y la necesita.
 *
 * Si algún día llega una variante de la marca para fondos claros, la placa
 * desaparece de aquí y este componente se queda solo con la imagen.
 */
const LOGO = {
  src: "/images/logo/logo-podio-chile.svg",
  ancho: 800,
  alto: 150,
};

interface Props {
  /** Alto en píxeles del logo renderizado */
  alto?: number;
  /** Fondo oscuro detrás de la marca. Apagar solo si el contenedor ya es oscuro. */
  placa?: boolean;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  alto = 34,
  placa = true,
  className,
  priority = false,
}: Props) {
  const ancho = Math.round(alto * (LOGO.ancho / LOGO.alto));

  return (
    <span
      className={cn(
        "inline-flex items-center",
        placa && "rounded-[var(--radius-md)] bg-[var(--logo-plate)] px-2.5 py-1.5",
        className,
      )}
    >
      <Image
        src={LOGO.src}
        alt="Podio Chile"
        width={ancho}
        height={alto}
        priority={priority}
        unoptimized
        style={{ height: alto, width: "auto" }}
        className="block"
      />
    </span>
  );
}
