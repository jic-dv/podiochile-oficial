"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/lib/i18n/I18nProvider";
import Button from "@/shared/components/ui/Button";
import { IconCorreo } from "@/shared/lib/icons";
import { CORREO, etiquetaTramo, precioTramo } from "@/features/quotes/lib/quotes";
import { PAISES, PAIS_POR_DEFECTO, buscarPais } from "@/features/contact/lib/countries";
import {
  crearContactoSchema, LIMITES, SERVICIOS_EXTRA,
  type CampoContacto, type DatosContacto,
} from "@/features/contact/schemas/contact.schema";
import { enviarContacto } from "@/features/contact/actions/enviar-contacto";
import { construirMailto } from "@/features/contact/lib/mailto";
import type { Servicio } from "@/features/services/schemas/service.schema";

const campoBase =
  "w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-subtle)] transition-colors duration-[var(--duration-fast)] focus:outline-none focus:ring-2";
const campoOk =
  "border-[var(--color-border)] focus:border-[var(--color-brand-border)] focus:ring-[var(--color-brand-ring)]";
const campoMal =
  "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/25";

export default function FormularioContacto({ servicios }: { servicios: Servicio[] }) {
  const { locale, t } = useI18n();
  const searchParams = useSearchParams();
  const idBase = useId();
  /** El mailto solo abre el cliente de correo. El envío lo confirma la
   *  persona en su aplicación, así que el estado es "pendiente", no "enviado". */
  const [pendienteEnvio, setPendienteEnvio] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  // El mismo schema que valida en el servidor. Se memoriza porque crearlo en
  // cada render obligaría al resolver a reconstruirse sin motivo.
  const schema = useMemo(
    () => crearContactoSchema({ serviciosValidos: servicios.map((s) => s.slug) }),
    [servicios],
  );

  // Preselección desde /?servicio=slug&plan=nivel&mantencion=meses#contacto,
  // que es como llega quien cotiza desde la ficha de un servicio
  const valoresIniciales = useMemo(() => {
    const servicio = servicios.find((s) => s.slug === searchParams.get("servicio"));
    const plan = servicio?.planes.find((p) => p.nivel === searchParams.get("plan"));
    // El tramo llega como número en la URL. Se busca en el catálogo real en
    // vez de confiar en el valor, igual que con el servicio y el plan.
    const meses = Number(searchParams.get("mantencion"));
    const tramo =
      Number.isInteger(meses) && meses > 0
        ? (servicio?.mantencion?.tramos.find((x) => x.meses === meses) ?? null)
        : null;
    const lineaMantencion = tramo
      ? `${t.cotizar.mantencion}: ${etiquetaTramo(tramo, t)} (${precioTramo(tramo, t)})\n`
      : "";
    return {
      nombre: "",
      email: "",
      pais: PAIS_POR_DEFECTO,
      telefono: "",
      servicio: servicio?.slug ?? "",
      mensaje:
        servicio && plan
          ? `${t.cotizar.servicio}: ${servicio.titulo[locale]}\n${t.cotizar.plan}: ${plan.nombre[locale]}\n${lineaMantencion}\n`
          : "",
      sitioWeb: "",
    };
  }, [searchParams, servicios, locale, t]);

  const {
    register, handleSubmit, control, setError, setFocus,
    formState: { errors, isSubmitting },
  } = useForm<DatosContacto>({
    resolver: zodResolver(schema),
    defaultValues: valoresIniciales,
    // Valida al salir del campo y, una vez marcado el error, en cada tecla.
    // Así el mensaje desaparece apenas el valor pasa a ser válido, sin
    // esperar a que el campo pierda el foco ni al siguiente envío.
    mode: "onTouched",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: false,
  });

  // useWatch en vez de watch(): se suscribe solo a estos campos y el
  // compilador de React puede memorizar el resto del componente
  const pais = useWatch({ control, name: "pais" });
  const mensaje = useWatch({ control, name: "mensaje" }) ?? "";
  const paisActual = buscarPais(pais) ?? PAISES[0];
  const restantes = LIMITES.mensajeMax - mensaje.length;

  /** Los schemas devuelven claves; el diccionario las convierte en texto */
  const msg = (clave?: string) =>
    clave ? (t.contacto.errores as Record<string, string>)[clave] ?? clave : undefined;

  async function onSubmit(datos: DatosContacto) {
    setErrorGeneral(null);
    // Se valida igual en el servidor aunque el envío final lo haga el cliente
    // de correo: la Server Action sigue siendo la frontera que no se puede
    // saltar, y deja registrada la solicitud.
    const respuesta = await enviarContacto(datos);

    if (respuesta.ok) {
      // Abre la aplicación de correo del dispositivo con todo redactado.
      // location.assign y no window.open: los bloqueadores de ventanas
      // emergentes no lo interceptan y funciona igual en móvil.
      window.location.assign(construirMailto({ datos, servicios, locale, t }));
      setPendienteEnvio(true);
      return;
    }
    // El servidor es la autoridad: sus errores se pintan en los campos
    for (const [campo, clave] of Object.entries(respuesta.errores)) {
      setError(campo as CampoContacto, { type: "server", message: clave });
    }
    setErrorGeneral(respuesta.general ?? "revisaCampos");
  }

  function onInvalid() {
    setErrorGeneral("revisaCampos");
    const orden: CampoContacto[] = ["nombre", "email", "telefono", "servicio", "mensaje"];
    const primero = orden.find((c) => errors[c]);
    if (primero) setFocus(primero);
  }

  if (pendienteEnvio) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-8 text-center shadow-[var(--shadow-lg)]"
      >
        <IconCorreo className="mx-auto mb-5 h-14 w-14 text-[var(--color-brand)]" aria-hidden="true" />
        <h3 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-primary)]">
          {t.contacto.exitoTitulo}
        </h3>
        <p className="mb-2 text-[var(--color-text-body)]">{t.contacto.correoAbriendo}</p>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">{t.contacto.exitoTexto}</p>
        <p className="mb-6 text-sm text-[var(--color-text-muted)]">
          {t.contacto.exitoAlternativa}{" "}
          <a
            href={`mailto:${CORREO}`}
            title="Enviar correo a Podio Chile"
            className="font-medium text-[var(--color-brand)] underline underline-offset-2"
          >
            {CORREO}
          </a>
        </p>
        <Button variant="outline" onClick={() => setPendienteEnvio(false)}>
          {t.contacto.exitoBoton}
        </Button>
      </div>
    );
  }

  const opcionesServicio = [
    ...servicios.map((s) => ({ valor: s.slug, etiqueta: s.titulo[locale] })),
    { valor: SERVICIOS_EXTRA[0], etiqueta: t.contacto.mantencion },
    { valor: SERVICIOS_EXTRA[1], etiqueta: t.contacto.servicioOtro },
  ];

  const unidadDigitos = locale === "en" ? "digits" : "dígitos";

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      // method="post" es una red de seguridad, no funcionalidad: el envío lo
      // maneja React. Si alguien alcanzara a pulsar antes de que hidrate, el
      // navegador haría el envío nativo por su cuenta, y con el GET por
      // defecto el nombre, el correo y el teléfono terminarían en la barra de
      // direcciones, el historial y la cabecera Referer. La política de
      // privacidad promete justo lo contrario.
      method="post"
      className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-lg)] md:p-8"
    >
      <h3 className="mb-6 font-display text-xl font-bold text-[var(--color-text-primary)]">
        {t.contacto.formTitulo}
      </h3>

      <div className="space-y-5">
        {/* Nombre */}
        <div>
          <label htmlFor={`${idBase}-nombre`} className="mb-1.5 block text-sm font-medium text-[var(--color-text-body)]">
            {t.contacto.nombre} <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            {...register("nombre")}
            id={`${idBase}-nombre`}
            type="text"
            autoComplete="name"
            maxLength={LIMITES.nombreMax}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? `${idBase}-nombre-error` : undefined}
            placeholder={t.contacto.nombrePlaceholder}
            className={cn(campoBase, errors.nombre ? campoMal : campoOk)}
          />
          {errors.nombre && (
            <p id={`${idBase}-nombre-error`} className="mt-1.5 text-sm text-[var(--color-error)]">
              {msg(errors.nombre.message)}
            </p>
          )}
        </div>

        {/* Correo */}
        <div>
          <label htmlFor={`${idBase}-email`} className="mb-1.5 block text-sm font-medium text-[var(--color-text-body)]">
            {t.contacto.email} <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            {...register("email")}
            id={`${idBase}-email`}
            type="email"
            autoComplete="email"
            maxLength={LIMITES.emailMax}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${idBase}-email-error` : undefined}
            placeholder={t.contacto.emailPlaceholder}
            className={cn(campoBase, errors.email ? campoMal : campoOk)}
          />
          {errors.email && (
            <p id={`${idBase}-email-error`} className="mt-1.5 text-sm text-[var(--color-error)]">
              {msg(errors.email.message)}
            </p>
          )}
        </div>

        {/* País + teléfono */}
        <div>
          <label htmlFor={`${idBase}-telefono`} className="mb-1.5 block text-sm font-medium text-[var(--color-text-body)]">
            {t.contacto.telefono} <span className="text-[var(--color-error)]">*</span>
          </label>
          <div className="flex gap-2">
            <select
              {...register("pais")}
              id={`${idBase}-pais`}
              aria-label={t.contacto.pais}
              className={cn(campoBase, campoOk, "w-[8.5rem] shrink-0 px-2.5")}
            >
              {PAISES.map((p) => (
                <option key={p.codigo} value={p.codigo}>
                  {p.bandera} {p.dial}
                </option>
              ))}
            </select>
            <input
              {...register("telefono", {
                // Se descartan los no dígitos al escribir: el campo nunca llega
                // a contener un carácter que después habría que rechazar
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },
              })}
              id={`${idBase}-telefono`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={paisActual.max}
              aria-invalid={!!errors.telefono}
              aria-describedby={`${idBase}-telefono-ayuda${errors.telefono ? ` ${idBase}-telefono-error` : ""}`}
              placeholder={paisActual.ejemplo}
              className={cn(campoBase, errors.telefono ? campoMal : campoOk, "min-w-0 flex-1")}
            />
          </div>
          <p id={`${idBase}-telefono-ayuda`} className="mt-1.5 text-xs text-[var(--color-text-muted)]">
            {t.contacto.telefonoAyuda} {paisActual.nombre}:{" "}
            {paisActual.min === paisActual.max
              ? paisActual.min
              : `${paisActual.min}-${paisActual.max}`}{" "}
            {unidadDigitos}.
          </p>
          {errors.telefono && (
            <p id={`${idBase}-telefono-error`} className="mt-1 text-sm text-[var(--color-error)]">
              {msg(errors.telefono.message)}
            </p>
          )}
        </div>

        {/* Servicio */}
        <div>
          <label htmlFor={`${idBase}-servicio`} className="mb-1.5 block text-sm font-medium text-[var(--color-text-body)]">
            {t.contacto.servicio} <span className="text-[var(--color-error)]">*</span>
          </label>
          <select
            {...register("servicio")}
            id={`${idBase}-servicio`}
            aria-invalid={!!errors.servicio}
            aria-describedby={errors.servicio ? `${idBase}-servicio-error` : undefined}
            className={cn(campoBase, errors.servicio ? campoMal : campoOk)}
          >
            <option value="" disabled>
              {t.contacto.servicioPlaceholder}
            </option>
            {opcionesServicio.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.etiqueta}
              </option>
            ))}
          </select>
          {errors.servicio && (
            <p id={`${idBase}-servicio-error`} className="mt-1.5 text-sm text-[var(--color-error)]">
              {msg(errors.servicio.message)}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <label htmlFor={`${idBase}-mensaje`} className="text-sm font-medium text-[var(--color-text-body)]">
              {t.contacto.mensaje}{" "}
              <span className="font-normal text-[var(--color-text-muted)]">
                ({t.contacto.mensajeOpcional})
              </span>
            </label>
            <span
              aria-live="polite"
              className={cn(
                "text-xs tabular-nums",
                restantes < 50 ? "text-[var(--color-warning)]" : "text-[var(--color-text-muted)]",
              )}
            >
              {restantes}
            </span>
          </div>
          <textarea
            {...register("mensaje")}
            id={`${idBase}-mensaje`}
            rows={5}
            maxLength={LIMITES.mensajeMax}
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? `${idBase}-mensaje-error` : undefined}
            placeholder={t.contacto.mensajePlaceholder}
            className={cn(campoBase, errors.mensaje ? campoMal : campoOk, "resize-y")}
          />
          {errors.mensaje && (
            <p id={`${idBase}-mensaje-error`} className="mt-1.5 text-sm text-[var(--color-error)]">
              {msg(errors.mensaje.message)}
            </p>
          )}
        </div>

        {/* Trampa para robots: fuera de la vista y del recorrido de teclado */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: "-9999px" }}>
          <label htmlFor={`${idBase}-sitioWeb`}>No completar</label>
          <input
            {...register("sitioWeb")}
            id={`${idBase}-sitioWeb`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {errorGeneral && (
          <p
            role="alert"
            className="rounded-[var(--radius-md)] border border-[var(--color-error)]/40 bg-[var(--color-error)]/8 px-4 py-3 text-sm text-[var(--color-error)]"
          >
            {msg(errorGeneral)}
          </p>
        )}

        <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
          {t.contacto.enviar}
        </Button>

        <p className="text-center text-xs text-[var(--color-text-muted)]">
          {t.contacto.legal1}{" "}
          <Link href="/privacidad" title={t.contacto.legalLink} className="underline hover:text-[var(--color-brand)]">
            {t.contacto.legalLink}
          </Link>
          {t.contacto.legal2}
        </p>
      </div>
    </form>
  );
}
