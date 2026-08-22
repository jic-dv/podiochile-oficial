import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal from "@/features/legal/components/PaginaLegal";
import EstadoConsentimiento from "@/features/consent/components/EstadoConsentimiento";
import { CORREO } from "@/features/quotes/lib/quotes";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Qué guarda podiochile.com en tu navegador. Hoy el sitio no usa cookies de seguimiento, publicidad ni analítica.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

const SECCIONES = [
  { id: "resumen", titulo: "1. Resumen" },
  { id: "tu-decision", titulo: "2. Tu decisión" },
  { id: "que-guardamos", titulo: "3. Qué guardamos" },
  { id: "no-usamos", titulo: "4. Lo que no usamos" },
  { id: "borrar", titulo: "5. Cómo borrarlo" },
  { id: "futuro", titulo: "6. Si esto cambia" },
  { id: "contacto", titulo: "7. Contacto" },
];

export default function CookiesPage() {
  return (
    <PaginaLegal
      titulo="Política de Cookies"
      descripcion="Qué guarda este sitio en tu navegador y para qué."
      secciones={SECCIONES}
    >
      <h2 id="resumen">1. Resumen</h2>
      <p>
        <strong>
          Este sitio no usa cookies de seguimiento, publicidad ni analítica.
        </strong>{" "}
        No hay píxeles de redes sociales, mapas de calor ni herramientas de medición de
        terceros.
      </p>
      <p>
        Lo único que el sitio puede guardar son dos preferencias tuyas —el tema y el
        idioma— y lo hace en el almacenamiento local del navegador, no en cookies. Aun
        así te lo preguntamos antes:{" "}
        <strong>
          mientras no aceptes, no se escribe nada en tu navegador
        </strong>
        . El consentimiento se presta, no se presume por seguir navegando.
      </p>

      <h2 id="tu-decision">2. Tu decisión</h2>
      <p>
        Aquí puedes ver qué decidiste y cambiarlo cuando quieras. La Ley N° 21.719 reconoce
        el derecho a <strong>retirar el consentimiento en cualquier momento</strong>, y con
        la misma facilidad con que se otorgó. Al retirarlo borramos de inmediato las
        preferencias guardadas.
      </p>

      <EstadoConsentimiento />

      <h2 id="que-guardamos">3. Qué guardamos</h2>
      <div className="overflow-x-auto">
        <table>
          <caption className="sr-only">
            Datos guardados en el navegador por podiochile.com
          </caption>
          <thead>
            <tr>
              <th scope="col">Clave</th>
              <th scope="col">Para qué sirve</th>
              <th scope="col">Categoría</th>
              <th scope="col">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>podio-theme</code>
              </td>
              <td>Recuerda si prefieres el tema claro u oscuro</td>
              <td>Requiere tu consentimiento</td>
              <td>Hasta que la borres</td>
            </tr>
            <tr>
              <td>
                <code>podio-locale</code>
              </td>
              <td>Recuerda el idioma en que quieres ver el sitio</td>
              <td>Requiere tu consentimiento</td>
              <td>Hasta que la borres</td>
            </tr>
            <tr>
              <td>
                <code>podio-consentimiento</code>
              </td>
              <td>
                Guarda tu propia decisión sobre este aviso y la fecha, para no volver a
                preguntarte y para poder acreditar qué elegiste
              </td>
              <td>Necesaria</td>
              <td>Hasta que la borres</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Ambas se guardan solo en tu dispositivo.{" "}
        <strong>No se envían a nuestros servidores ni a terceros</strong>, no permiten
        identificarte y no se usan para seguir tu navegación.
      </p>

      <h2 id="no-usamos">4. Lo que no usamos</h2>
      <ul>
        <li>Cookies de analítica.</li>
        <li>Cookies o píxeles de publicidad y redes sociales.</li>
        <li>Herramientas de grabación de sesión o mapas de calor.</li>
        <li>Gestores de etiquetas de terceros.</li>
        <li>Perfilamiento o decisiones automatizadas sobre visitantes.</li>
      </ul>
      <p>
        El sitio tampoco carga fuentes ni imágenes desde servidores de terceros: todos los
        recursos se sirven desde nuestro propio dominio, de modo que tu visita no genera
        peticiones a otras empresas.
      </p>

      <h2 id="borrar">5. Cómo borrarlo</h2>
      <p>
        La forma más directa es el botón de arriba, en <em>Tu decisión</em>. También puedes
        eliminarlas desde las opciones de tu
        navegador, en la sección de datos de sitios o almacenamiento local. Al borrarlas, el
        sitio volverá a usar el tema que tenga configurado tu sistema y el idioma español.
      </p>
      <p>
        Borrarlas no afecta tu capacidad de usar el sitio: son preferencias de comodidad, no
        requisitos de funcionamiento.
      </p>

      <h2 id="futuro">6. Si esto cambia</h2>
      <p>
        Si en el futuro incorporamos analítica u otra herramienta que use cookies no
        esenciales, lo haremos con un gestor de consentimiento previo, informado y granular:
        nada se cargará antes de que lo aceptes, rechazar será tan simple como aceptar, y
        podrás cambiar de opinión en cualquier momento. Actualizaremos esta política y su
        número de versión antes de que eso ocurra.
      </p>

      <h2 id="contacto">7. Contacto</h2>
      <p>
        Dudas sobre esta política: <a href={`mailto:${CORREO}`}>{CORREO}</a>. El tratamiento
        de datos personales se explica en la{" "}
        <Link href="/privacidad">Política de Privacidad</Link>.
      </p>
    </PaginaLegal>
  );
}
