import PaginaLegal from "@/features/legal/components/PaginaLegal";
import { CORREO, WHATSAPP_DISPLAY } from "@/features/quotes/lib/quotes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de contratación de los servicios de diseño y desarrollo web de Podio Chile: alcance, precios, plazos, propiedad intelectual y responsabilidades.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

const SECCIONES = [
  { id: "prestador", titulo: "1. Quiénes somos" },
  { id: "objeto", titulo: "2. Objeto y aceptación" },
  { id: "servicios", titulo: "3. Servicios y planes" },
  { id: "precios", titulo: "4. Precios y moneda" },
  { id: "contratacion", titulo: "5. Cotización y contratación" },
  { id: "pagos", titulo: "6. Pagos y facturación" },
  { id: "plazos", titulo: "7. Plazos, revisiones y entrega" },
  { id: "cliente", titulo: "8. Obligaciones del cliente" },
  { id: "propiedad", titulo: "9. Propiedad intelectual" },
  { id: "mantencion", titulo: "10. Mantención mensual" },
  { id: "garantia", titulo: "11. Garantía" },
  { id: "responsabilidad", titulo: "12. Límite de responsabilidad" },
  { id: "cancelacion", titulo: "13. Cancelación y reembolsos" },
  { id: "datos", titulo: "14. Protección de datos" },
  { id: "modificaciones", titulo: "15. Modificaciones" },
  { id: "ley", titulo: "16. Ley aplicable y jurisdicción" },
];

export default function TerminosPage() {
  return (
    <PaginaLegal
      titulo="Términos y Condiciones"
      descripcion="Condiciones bajo las cuales Podio Chile presta sus servicios de diseño y desarrollo web."
      secciones={SECCIONES}
    >
      <p>
        Estos términos regulan la contratación de los servicios ofrecidos en
        este sitio. Léelos antes de contratar: al aceptar una cotización aceptas
        también estas condiciones.
      </p>

      <h2 id="prestador">1. Quiénes somos</h2>
      <p>
        Los servicios son prestados por{" "}
        <strong>José Ignacio Contreras Castro</strong>, persona natural que opera
        bajo el nombre de fantasía <strong>Podio Chile</strong>, con domicilio en
        Santiago de Chile.
      </p>
      <ul>
        <li>
          Correo: <a href={`mailto:${CORREO}`}>{CORREO}</a>
        </li>
        <li>Teléfono y WhatsApp: {WHATSAPP_DISPLAY}</li>
      </ul>

      <h2 id="objeto">2. Objeto y aceptación</h2>
      <p>
        Este documento regula el uso del sitio <strong>podiochile.com</strong> y
        la contratación de los servicios de diseño y desarrollo web que en él se
        ofrecen.
      </p>
      <p>
        Navegar por el sitio implica aceptar estos términos. La contratación de
        un servicio implica además aceptar la cotización específica que se te
        haya entregado, la cual prevalece sobre este documento en lo que se
        refiera al alcance, precio y plazo de ese proyecto en particular.
      </p>

      <h2 id="servicios">3. Servicios y planes</h2>
      <p>Ofrecemos tres servicios, cada uno en tres planes:</p>
      <ul>
        <li>
          <strong>Landing Page:</strong> una página única orientada a la
          conversión.
        </li>
        <li>
          <strong>Página Web Multipágina:</strong> sitio corporativo con panel
          de administración de contenidos.
        </li>
        <li>
          <strong>CRM Personalizado:</strong> sistema a medida para la gestión
          de clientes, ventas y soporte.
        </li>
      </ul>
      <p>
        El detalle de lo que incluye cada plan está publicado en la ficha de
        cada servicio. Lo que no aparece descrito en el plan contratado no está
        incluido y se cotiza por separado.
      </p>

      <h2 id="precios">4. Precios y moneda</h2>
      <p>
        Los precios publicados están expresados en{" "}
        <strong>pesos chilenos (CLP)</strong> y son referenciales: corresponden
        al alcance estándar de cada plan.
      </p>
      <p>
        El precio definitivo se fija en la cotización, que considera el alcance
        real del proyecto. Salvo que la cotización indique lo contrario, los
        valores publicados no incluyen impuestos, los que se agregan según la
        normativa vigente al momento de emitir el documento tributario.
      </p>
      <p>
        Podemos modificar los precios publicados en cualquier momento. El cambio
        no afecta cotizaciones ya aceptadas.
      </p>

      <h2 id="contratacion">5. Cotización y contratación</h2>
      <p>
        El proceso es: solicitas una cotización desde el sitio o por WhatsApp,
        te enviamos una propuesta con alcance, precio y plazo, y el contrato se
        entiende formado cuando la aceptas por escrito y se paga el anticipo
        acordado.
      </p>
      <p>
        Las cotizaciones tienen una vigencia de{" "}
        <strong>30 días corridos</strong> desde su emisión, salvo que indiquen
        otro plazo.
      </p>

      <h2 id="pagos">6. Pagos y facturación</h2>
      <ul>
        <li>
          <strong>Modalidad estándar:</strong> 50% para iniciar el proyecto y
          50% contra entrega, antes de la publicación.
        </li>
        <li>
          <strong>Proyectos mayores:</strong> puede acordarse un pago en tres
          cuotas, lo que quedará establecido en la cotización.
        </li>
        <li>
          <strong>Medios de pago:</strong> transferencia bancaria y tarjeta de
          crédito.
        </li>
        <li>
          Emitimos el documento tributario que corresponda conforme a la
          normativa chilena.
        </li>
      </ul>
      <p>
        El anticipo cubre el trabajo de análisis y diseño inicial. Los trabajos
        quedan suspendidos mientras exista un pago pendiente vencido.
      </p>

      <h2 id="plazos">7. Plazos, revisiones y entrega</h2>
      <p>
        Los plazos publicados se cuentan en <strong>días hábiles</strong> y
        comienzan a correr desde que se cumplen dos condiciones: se recibe el
        anticipo y el cliente entrega el contenido y los accesos necesarios.
      </p>
      <p>
        Cada plan incluye un número determinado de revisiones, indicado en su
        ficha. Se entiende por revisión un conjunto de ajustes sobre el trabajo
        ya presentado, dentro del alcance acordado. Las revisiones adicionales y
        los cambios que amplíen el alcance se cotizan aparte.
      </p>
      <p>
        Los plazos se suspenden mientras esperamos contenido, aprobaciones o
        accesos del cliente. Si contratas entrega express, el plazo reducido y
        su recargo se indican en la ficha del plan y quedan en la cotización.
      </p>
      <p>
        El proyecto se entiende entregado y aprobado si el cliente no formula
        observaciones dentro de los <strong>10 días hábiles</strong> siguientes
        a la entrega.
      </p>

      <h2 id="cliente">8. Obligaciones del cliente</h2>
      <ul>
        <li>
          Entregar textos, imágenes, logotipos y demás contenidos en los plazos
          acordados.
        </li>
        <li>
          Garantizar que cuenta con los derechos sobre el material que nos
          entrega. El cliente responde frente a reclamos de terceros por el
          contenido que aporta.
        </li>
        <li>
          Proporcionar los accesos técnicos necesarios (dominio, alojamiento,
          cuentas de terceros) cuando el proyecto lo requiera.
        </li>
        <li>Designar una contraparte con facultades para aprobar entregas.</li>
        <li>
          Entregar información veraz para la emisión de documentos tributarios.
        </li>
      </ul>

      <h2 id="propiedad">9. Propiedad intelectual</h2>
      <p>
        <strong>Del cliente:</strong> el contenido que nos entregas sigue siendo
        tuyo. Nos autorizas a usarlo solo para ejecutar el proyecto.
      </p>
      <p>
        <strong>Del trabajo entregado:</strong> una vez pagado el precio total,
        se te transfieren los derechos de uso y explotación sobre el diseño y el
        código desarrollado específicamente para tu proyecto. Antes del pago
        total, esos derechos permanecen con nosotros.
      </p>
      <p>
        <strong>De los componentes reutilizables:</strong> conservamos la
        propiedad sobre nuestras herramientas, librerías internas y componentes
        genéricos preexistentes, que se te licencian de forma no exclusiva,
        perpetua e irrevocable para el uso del proyecto entregado.
      </p>
      <p>
        <strong>De terceros:</strong> el software de terceros que se integre
        (bibliotecas de código abierto, tipografías, imágenes con licencia) se
        rige por sus propias licencias.
      </p>
      <p>
        <strong>Portafolio:</strong> salvo que nos pidas lo contrario por
        escrito, podemos mostrar el trabajo realizado en nuestro portafolio y
        mencionar tu marca como cliente.
      </p>

      <h2 id="mantencion">10. Mantención mensual</h2>
      <p>
        La mantención es un servicio opcional e independiente del desarrollo.
        Cubre actualizaciones de seguridad, copias de respaldo, monitoreo de
        disponibilidad y cambios menores de contenido, según el plan contratado.
      </p>
      <p>
        Se contrata por mes y se renueva automáticamente salvo aviso de
        cualquiera de las partes con al menos 15 días corridos de anticipación.
        No incluye el desarrollo de nuevas funcionalidades, que se cotiza por
        separado.
      </p>

      <h2 id="garantia">11. Garantía</h2>
      <p>
        Garantizamos que el trabajo entregado funciona conforme a lo acordado en
        la cotización. Durante el período de soporte incluido en el plan
        corregimos sin costo cualquier defecto atribuible a nuestro desarrollo.
      </p>
      <p>La garantía no cubre:</p>
      <ul>
        <li>Fallas por modificaciones hechas por el cliente o por terceros.</li>
        <li>
          Cambios en servicios de terceros ajenos a nosotros (proveedores de
          alojamiento, pasarelas de pago, APIs externas).
        </li>
        <li>Nuevas funcionalidades o cambios de alcance.</li>
        <li>
          Problemas derivados de no contratar mantención tras vencer el soporte.
        </li>
      </ul>
      <p>
        No garantizamos resultados comerciales concretos ni una posición
        determinada en buscadores. Entregamos la base técnica correcta; el
        posicionamiento depende de factores fuera de nuestro control.
      </p>

      <h2 id="responsabilidad">12. Límite de responsabilidad</h2>
      <p>
        Nuestra responsabilidad total frente al cliente por cualquier causa
        relacionada con un proyecto se limita al monto efectivamente pagado por
        ese proyecto.
      </p>
      <p>
        No respondemos por lucro cesante, pérdida de datos imputable a terceros,
        ni daños indirectos o consecuenciales. Tampoco por interrupciones
        causadas por proveedores de alojamiento, conectividad o servicios
        externos.
      </p>
      <p>
        Nada en esta cláusula limita los derechos que la legislación chilena de
        protección al consumidor reconoce de forma irrenunciable cuando resulte
        aplicable.
      </p>

      <h2 id="cancelacion">13. Cancelación y reembolsos</h2>
      <p>
        <strong>Si el cliente cancela:</strong> el anticipo no es reembolsable
        una vez iniciado el trabajo de análisis y diseño, ya que cubre horas
        efectivamente trabajadas. Si la cancelación ocurre antes de iniciar, se
        reembolsa íntegramente.
      </p>
      <p>
        <strong>Si cancelamos nosotros</strong> por una causa que no sea
        atribuible al cliente, reembolsamos la totalidad de lo pagado por la
        parte no ejecutada.
      </p>
      <p>
        Podemos suspender o terminar el servicio si existen pagos vencidos, si
        el cliente incumple estos términos o si se nos solicita un uso ilícito
        del trabajo.
      </p>

      <h2 id="datos">14. Protección de datos</h2>
      <p>
        El tratamiento de datos personales se rige por nuestra{" "}
        <Link href="/privacidad">Política de Privacidad</Link>, elaborada
        conforme a la Ley N° 21.719.
      </p>
      <p>
        Cuando el proyecto implique que tratemos datos personales de los
        clientes o usuarios del cliente (por ejemplo, al desarrollar un CRM),
        actuaremos como encargados de tratamiento por cuenta del cliente y
        suscribiremos el acuerdo correspondiente, en el que se definirán las
        instrucciones, las medidas de seguridad y el destino de los datos al
        terminar el servicio.
      </p>

      <h2 id="modificaciones">15. Modificaciones</h2>
      <p>
        Podemos actualizar estos términos. Cada versión lleva número y fecha
        visibles al inicio del documento. Los cambios no afectan proyectos ya
        contratados, que se rigen por la versión vigente al momento de aceptar
        la cotización.
      </p>

      <h2 id="ley">16. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por la <strong>ley chilena</strong>. Cualquier
        controversia se someterá a los tribunales ordinarios de justicia con
        asiento en la comuna de Santiago, sin perjuicio de las acciones que la
        legislación de protección al consumidor permita ejercer ante otra sede
        cuando corresponda.
      </p>
      <p>
        Si alguna cláusula fuera declarada nula o inaplicable, las demás
        mantienen plena vigencia.
      </p>
    </PaginaLegal>
  );
}
