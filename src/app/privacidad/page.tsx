import PaginaLegal from "@/features/legal/components/PaginaLegal";
import { CORREO, WHATSAPP_DISPLAY } from "@/features/quotes/lib/quotes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Podio Chile trata los datos personales que recibe a través de su sitio web, conforme a la Ley N° 21.719 de protección de datos personales de Chile.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

const SECCIONES = [
  { id: "responsable", titulo: "1. Quién trata tus datos" },
  { id: "datos", titulo: "2. Qué datos tratamos" },
  { id: "finalidades", titulo: "3. Para qué y con qué base legal" },
  { id: "conservacion", titulo: "4. Cuánto tiempo los guardamos" },
  { id: "terceros", titulo: "5. Con quién los compartimos" },
  { id: "transferencias", titulo: "6. Transferencias fuera de Chile" },
  { id: "derechos", titulo: "7. Tus derechos" },
  { id: "seguridad", titulo: "8. Seguridad" },
  { id: "brechas", titulo: "9. Brechas de seguridad" },
  { id: "cookies", titulo: "10. Cookies y almacenamiento local" },
  { id: "menores", titulo: "11. Menores de edad" },
  { id: "cambios", titulo: "12. Cambios en esta política" },
  { id: "reclamos", titulo: "13. Contacto y reclamos" },
];

export default function PrivacidadPage() {
  return (
    <PaginaLegal
      titulo="Política de Privacidad"
      descripcion="Cómo tratamos los datos personales que nos entregas a través de este sitio, conforme a la Ley N° 21.719 sobre protección de datos personales."
      secciones={SECCIONES}
    >
      <p>
        En Podio Chile tratamos la menor cantidad de datos posible: solo lo que
        necesitamos para responderte y prepararte una propuesta. No vendemos
        datos, no los cedemos a terceros con fines publicitarios y no hacemos
        perfilamiento.
      </p>

      <h2 id="responsable">1. Quién trata tus datos</h2>
      <p>
        El responsable del tratamiento es{" "}
        <strong>José Ignacio Contreras Castro</strong>, persona natural que opera
        bajo el nombre de fantasía <strong>Podio Chile</strong>, con domicilio en
        Santiago de Chile.
      </p>
      <p>
        La Ley N° 21.719 exige identificar al responsable con nombre y un canal de
        contacto efectivo. Aquí no hay una razón social detrás de la cual escudarse:
        quien recibe tus datos, los trata y responde por ellos es una persona con
        nombre y apellido.
      </p>
      <ul>
        <li>
          Correo de contacto en materia de datos:{" "}
          <a href={`mailto:${CORREO}`}>{CORREO}</a>
        </li>
        <li>Teléfono y WhatsApp: {WHATSAPP_DISPLAY}</li>
      </ul>
      <p>
        Cualquier consulta sobre esta política o sobre el ejercicio de tus
        derechos se dirige a ese correo.
      </p>

      <h2 id="datos">2. Qué datos tratamos</h2>
      <p>
        Tratamos únicamente los datos que tú nos entregas de forma voluntaria:
      </p>

      <h3>2.1 Formulario de contacto y cotización</h3>
      <ul>
        <li>
          <strong>Nombre completo</strong>, para dirigirnos a ti correctamente.
        </li>
        <li>
          <strong>Correo electrónico</strong>, para enviarte la respuesta y la
          propuesta.
        </li>
        <li>
          <strong>Teléfono</strong>, opcional. Solo si prefieres que te
          contactemos por esa vía.
        </li>
        <li>
          <strong>Servicio de interés y mensaje</strong>, para entender qué
          necesitas y cotizar con precisión.
        </li>
      </ul>
      <p>
        Ningún campo del formulario pide datos sensibles. No solicitamos RUT,
        dirección, datos bancarios ni información de salud, situación
        socioeconómica, afiliación política, religión, origen étnico ni
        orientación sexual. Si nos envías ese tipo de información por tu cuenta
        dentro del mensaje libre, la eliminaremos salvo que sea indispensable
        para el servicio solicitado.
      </p>

      <h3>2.2 Contacto por WhatsApp</h3>
      <p>
        Si nos escribes por WhatsApp, tratamos tu número y el contenido de la
        conversación para responderte. Esa comunicación ocurre en la plataforma
        de WhatsApp, que se rige además por sus propias condiciones y políticas.
      </p>

      <h3>2.3 Registros técnicos del servidor</h3>
      <p>
        Nuestro proveedor de alojamiento genera registros técnicos automáticos
        que pueden incluir la dirección IP, la fecha y hora de la visita, el
        navegador y la página solicitada. Se usan para operar el sitio y
        detectar fallas o abusos, no para identificarte ni construir un perfil.
      </p>

      <h3>2.4 Preferencias guardadas en tu navegador</h3>
      <p>
        El sitio guarda tu preferencia de tema (claro u oscuro) y de idioma en
        el almacenamiento local de tu navegador. Esa información{" "}
        <strong>no se envía a nuestros servidores</strong> ni a terceros: se
        queda en tu dispositivo y puedes borrarla desde las opciones del
        navegador.
      </p>

      <h2 id="finalidades">3. Para qué y con qué base legal</h2>
      <p>
        La Ley N° 21.719 exige una base legal explícita por cada finalidad.
        Estas son las nuestras:
      </p>
      <div className="overflow-x-auto">
        <table>
          <caption className="sr-only">
            Finalidades del tratamiento y su base legal
          </caption>
          <thead>
            <tr>
              <th scope="col">Finalidad</th>
              <th scope="col">Datos usados</th>
              <th scope="col">Base legal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Responder tu consulta y enviarte una cotización</td>
              <td>Nombre, correo, teléfono, servicio, mensaje</td>
              <td>Consentimiento que otorgas al enviar el formulario</td>
            </tr>
            <tr>
              <td>Ejecutar el servicio contratado y facturarlo</td>
              <td>Datos de contacto y los de facturación que nos entregues</td>
              <td>Ejecución del contrato y obligaciones legales tributarias</td>
            </tr>
            <tr>
              <td>Operar el sitio, prevenir abusos y resolver fallas</td>
              <td>Registros técnicos del servidor</td>
              <td>
                Interés legítimo en mantener el servicio disponible y seguro
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>
          No te enviamos comunicaciones comerciales ni newsletter.
        </strong>{" "}
        Si en el futuro quisiéramos hacerlo, te pediremos un consentimiento
        separado y específico para esa finalidad, que podrás retirar en
        cualquier momento.
      </p>

      <h2 id="conservacion">4. Cuánto tiempo los guardamos</h2>
      <ul>
        <li>
          <strong>Consultas que no derivan en contrato:</strong> hasta 12 meses
          desde el último contacto. Después se eliminan.
        </li>
        <li>
          <strong>Clientes con proyecto contratado:</strong> durante la relación
          comercial y hasta 6 años después de terminada, plazo que responde a
          las obligaciones tributarias y de respaldo contable vigentes en Chile.
        </li>
        <li>
          <strong>Registros técnicos del servidor:</strong> según la política de
          nuestro proveedor de alojamiento, en general no más de 30 días.
        </li>
      </ul>
      <p>
        Vencido el plazo, los datos se eliminan o se anonimizan de forma
        irreversible. No guardamos datos indefinidamente por defecto.
      </p>

      <h2 id="terceros">5. Con quién los compartimos</h2>
      <p>
        No vendemos ni cedemos tus datos. Los compartimos únicamente con
        proveedores que los tratan por cuenta nuestra, bajo contrato y con
        instrucciones nuestras:
      </p>
      <ul>
        <li>
          <strong>Proveedor de alojamiento del sitio</strong>, que hospeda la
          aplicación y genera los registros técnicos.
        </li>
        <li>
          <strong>Proveedor de correo electrónico</strong>, a través del cual
          recibimos y respondemos tus mensajes.
        </li>
        <li>
          <strong>WhatsApp</strong>, si eliges ese canal para comunicarte.
        </li>
      </ul>
      <p>
        También podemos entregar datos cuando una autoridad competente lo
        requiera conforme a la ley.
      </p>

      <h2 id="transferencias">6. Transferencias fuera de Chile</h2>
      <p>
        Algunos de estos proveedores tienen servidores fuera de Chile. Cuando
        eso ocurre, exigimos que el tratamiento cuente con garantías adecuadas
        de protección conforme a lo previsto en la Ley N° 21.719, mediante
        cláusulas contractuales que obligan al proveedor a un nivel de
        protección equivalente al de la ley chilena.
      </p>

      <h2 id="derechos">7. Tus derechos</h2>
      <p>
        La Ley N° 21.719 te reconoce los siguientes derechos sobre tus datos
        personales:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> saber qué datos tuyos tenemos y cómo los
          tratamos.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o
          incompletos.
        </li>
        <li>
          <strong>Cancelación o supresión:</strong> pedir que eliminemos tus
          datos cuando ya no sean necesarios o retires tu consentimiento.
        </li>
        <li>
          <strong>Oposición:</strong> oponerte a un tratamiento determinado.
        </li>
        <li>
          <strong>Portabilidad:</strong> recibir tus datos en un formato
          estructurado y de uso común, o pedir que se los transmitamos a otro
          responsable.
        </li>
        <li>
          <strong>Bloqueo:</strong> suspender temporalmente el tratamiento
          mientras se resuelve una solicitud.
        </li>
      </ul>
      <h3>Cómo ejercerlos</h3>
      <p>
        Escríbenos a <a href={`mailto:${CORREO}`}>{CORREO}</a> indicando qué
        derecho quieres ejercer. Para proteger tu información podemos pedirte
        que acredites tu identidad antes de responder.
      </p>
      <p>
        <strong>Responderemos dentro de los plazos que establece la ley</strong>{" "}
        y en todo caso en un máximo de 30 días corridos desde que recibimos la
        solicitud completa. El ejercicio de estos derechos es gratuito.
      </p>
      <p>
        Retirar tu consentimiento no afecta la licitud del tratamiento hecho
        antes del retiro.
      </p>

      <h2 id="seguridad">8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas proporcionales al riesgo:
      </p>
      <ul>
        <li>Cifrado del tráfico mediante HTTPS en todo el sitio.</li>
        <li>Cifrado de los datos almacenados en reposo.</li>
        <li>
          Acceso restringido a quienes necesitan los datos para su trabajo.
        </li>
        <li>Copias de seguridad periódicas y cifradas.</li>
        <li>Registros de auditoría de los accesos a datos personales.</li>
        <li>Validación de toda la información recibida antes de procesarla.</li>
      </ul>
      <p>
        Ninguna medida elimina el riesgo por completo. Si detectas una
        vulnerabilidad, avísanos a <a href={`mailto:${CORREO}`}>{CORREO}</a>.
      </p>

      <h2 id="brechas">9. Brechas de seguridad</h2>
      <p>
        Si ocurre una vulneración que afecte tus datos personales,{" "}
        <strong>
          notificaremos a la Agencia de Protección de Datos Personales dentro de
          las 72 horas
        </strong>{" "}
        siguientes a que tomemos conocimiento del incidente, y te informaremos
        directamente cuando la brecha pueda afectar tus derechos, describiendo
        qué ocurrió, qué datos se vieron involucrados y qué medidas tomamos.
      </p>

      <h2 id="cookies">10. Cookies y almacenamiento local</h2>
      <p>
        Este sitio{" "}
        <strong>no usa cookies de seguimiento, publicidad ni analítica</strong>.
        Solo guarda tus preferencias de tema e idioma en el almacenamiento local
        del navegador, que no sale de tu dispositivo. El detalle está en la{" "}
        <Link href="/cookies">Política de Cookies</Link>.
      </p>

      <h2 id="menores">11. Menores de edad</h2>
      <p>
        Nuestros servicios están dirigidos a personas mayores de edad y a
        empresas. No recogemos datos de menores de forma consciente. Si
        detectamos que recibimos datos de un menor sin la autorización que
        corresponda, los eliminaremos.
      </p>

      <h2 id="cambios">12. Cambios en esta política</h2>
      <p>
        Podemos actualizar este documento. Cada versión lleva número y fecha
        visibles al inicio. Si el cambio es sustancial y afecta cómo tratamos
        datos que ya nos entregaste, te avisaremos por correo antes de que entre
        en vigor.
      </p>

      <h2 id="reclamos">13. Contacto y reclamos</h2>
      <p>
        Para cualquier consulta sobre esta política escribe a{" "}
        <a href={`mailto:${CORREO}`}>{CORREO}</a>.
      </p>
      <p>
        Si consideras que no atendimos correctamente tu solicitud, puedes
        reclamar ante la{" "}
        <strong>Agencia de Protección de Datos Personales</strong>, el organismo
        fiscalizador creado por la Ley N° 21.719.
      </p>
    </PaginaLegal>
  );
}
