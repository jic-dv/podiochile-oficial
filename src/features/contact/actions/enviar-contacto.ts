"use server";

import { crearContactoSchema, type ResultadoEnvio, type CampoContacto } from "@/features/contact/schemas/contact.schema";
import { componerTelefono } from "@/features/contact/lib/countries";
import { getSlugs } from "@/features/services/api/services.service";

/**
 * Una Server Action es un endpoint público: cualquiera puede invocarla con el
 * payload que quiera, saltándose por completo el formulario. Por eso la
 * validación de aquí es la que cuenta; la del cliente es comodidad de uso.
 *
 * El catálogo real de servicios se lee aquí, no se confía en la lista que el
 * cliente dice haber pintado.
 */
export async function enviarContacto(datos: unknown): Promise<ResultadoEnvio> {
  const schema = crearContactoSchema({ serviciosValidos: getSlugs() });
  const resultado = schema.safeParse(datos);

  if (!resultado.success) {
    const errores: Partial<Record<CampoContacto, string>> = {};
    for (const issue of resultado.error.issues) {
      const campo = issue.path[0] as CampoContacto | "sitioWeb";
      // La trampa de robots no se le explica al robot: se responde como éxito
      if (campo === "sitioWeb") return { ok: true };
      if (!errores[campo]) errores[campo] = issue.message;
    }
    return { ok: false, errores };
  }

  const { pais, telefono, servicio, mensaje } = resultado.data;
  // Se compone aquí porque es lo que necesitará el envío real; no se registra
  void componerTelefono(pais, telefono);

  try {
    // TODO: aquí va el envío real (correo transaccional o alta en el CRM).
    // Los datos ya vienen validados y normalizados. Si se persisten en una
    // base, la consulta debe ir parametrizada: el filtrado de texto de arriba
    // no es lo que previene una inyección SQL.
    // Sin datos personales en el log. Los registros del servidor los guarda el
    // proveedor de alojamiento, se retienen fuera de nuestro control y la
    // política de privacidad promete lo contrario: solo se anota que hubo una
    // solicitud y por cuál servicio, que es lo único que sirve para operar.
    console.info("[contacto] solicitud validada", {
      servicio,
      pais,
      conMensaje: (mensaje?.length ?? 0) > 0,
    });

    return { ok: true };
  } catch {
    // Nunca se devuelve el detalle del fallo al cliente
    return { ok: false, errores: {}, general: "errorServidor" };
  }
}
