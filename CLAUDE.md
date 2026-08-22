# podiochile - CLAUDE.md

## Bloque 0

```
PROYECTO:              podiochile
DOMINIO:               podiochile.com
TIPO:                  landing + catálogo de servicios con detalle por servicio
PROBLEMA DE NEGOCIO:   Profesionales y empresas necesitan presencia web profesional y asequible
AUDIENCIA:             Emprendedores profesionales, pymes, startups
ESTADO:                greenfield

RESTRICCIONES
SEO crítico:           sí
Interactividad alta:   no (marketing site con Client Components puntuales)
Volumen de datos:      bajo
Tiempo real:           no
Autenticación:         no
Multi-idioma:          sí, es-CL + en (conmutación en cliente, ver nota abajo)

MERCADO
Locale principal:      es-CL
Moneda y formato:      CLP sin decimales (Intl.NumberFormat es-CL / CLP)
Marco legal de datos:  Ley 21.719 (Chile) vigente 01-12-2026

IDENTIDAD
Atributos de marca:    profesional, cercano, confiable, moderno, accesible
Paleta base:           dorado ámbar (marca) + esmeralda (acento semántico)
Tema oscuro:           negro neutro, sin tinte de color
Elemento firma:        barra de gradiente dorado en tarjetas destacadas

PRESUPUESTOS
JS cliente por ruta:   < 120 KB (landing), < 150 KB (detalle)
LCP / INP / CLS:       2.5s / 200ms / 0.1
```

## Comandos

```bash
npm run dev       # http://localhost:3000
npm run build     # build de producción (Turbopack)
npm run start     # servidor de producción
npm run lint      # eslint
npm run check:contacto  # 34 casos del schema de contacto (tsx, sin framework)
npm run check:mailto    # 15 comprobaciones del correo que se abre al enviar
npm run check:cotizacion # 69 comprobaciones del resumen, la moneda y el catálogo
```

## Stack

| Capa        | Elección                   | Versión |
| ----------- | -------------------------- | ------- |
| Framework   | Next.js App Router         | 16.3.1  |
| Runtime UI  | React                      | 19.2.8  |
| Lenguaje    | TypeScript `strict: true`  | 5.x     |
| Estilos     | Tailwind CSS v4 + `@theme` | 4.x     |
| Iconos      | react-icons (Heroicons v2) | 5.7.x   |
| Carrusel    | embla-carousel-react       | 8.6.0   |
| Lightbox    | yet-another-react-lightbox | 3.32.2  |
| Utilidades  | tailwind-merge + clsx      | latest  |
| Formularios | React Hook Form + resolver | 7.85.x  |
| Validación  | Zod                        | 4.x     |

Sin librería de animación: el revelado por scroll es CSS + un `IntersectionObserver`
compartido. Ver "Animación" abajo.

## Estructura

```
src/
  app/
    layout.tsx              metadata raíz, fuente Inter, script de arranque
    page.tsx                home (Server Component) + JSON-LD Organization/WebSite/ItemList
    servicios/[slug]/       detalle por servicio, SSG con generateStaticParams
    privacidad/ terminos/ cookies/   documentos legales (Ley 21.719)
    theme.css               paleta: escala de marca + tokens semánticos por tema
    globals.css             tokens no cromáticos, base, revelado por scroll
    not-found.tsx           404 global (rutas inexistentes y notFound())
    sitemap.ts / robots.ts
  features/                 carpetas en inglés; los componentes siguen en español
    consent/
      lib/consent.ts        registro de la decisión y la puerta permitePreferencias()
      components/           BannerCookies, EstadoConsentimiento
    landing/components/     Navbar, Hero, ServiciosSection, ServicioCard,
                            ComoFuncionaSection, FeaturesSection, PreciosSection,
                            FaqSection (exporta Accordion), ContactoSection, Footer
    services/
      components/           ServicioDetalle (layout de 2 columnas),
                            GaleriaServicio, AcercaDeTrabajo,
                            PanelPlanes, ComparativaPaquetes
      schemas/              service.schema.ts (Zod, fuente de verdad)
      api/                  services.service.ts (acceso a datos)
    quotes/
      components/           CotizarModal
      lib/                  quotes.ts (contacto comercial, resumen y enlaces)
    contact/
      actions/              enviar-contacto.ts (Server Action, frontera real)
      components/           FormularioContacto (React Hook Form + zodResolver)
      lib/                  countries.ts (prefijos, banderas y largo por país)
      schemas/              contact.schema.ts + contact.schema.check.ts
    legal/
      components/           PaginaLegal (armazón, índice lateral, versión y fecha)
  shared/
    components/
      ui/                   Button (+ clasesBoton), ButtonLink, ThemeToggle,
                            BotonesFlotantes, Precio, Ayuda
      core/                 Section, Reveal, JsonLd, Logo, CreditoCreador,
                            ScrollAlTope
    lib/
      cn.ts, formatters.ts, icons.ts, theme.ts
      currency/            dolar.service.ts (findic.cl), DolarProvider.tsx
      i18n/                 dictionaries.ts, I18nProvider.tsx, localize.ts
  mocks/
    services.ts             3 servicios x 3 planes, validados contra el schema
public/
  favicon.ico / favicon-{16x16,32x32}.png / apple-touch-icon.png
  android-chrome-{192,512}.png / site.webmanifest
  images/logo/              logo-podio-chile.svg (wordmark), -sm.png
  images/creador/           avatar.webp
  images/services/{slug}/   5 maquetas SVG por servicio, con marcadores numerados
```

> Las rutas de la app (`/servicios`, `/privacidad`, `/terminos`, `/cookies`) se
> quedan en español a propósito: son URLs indexables de un sitio es-CL y ya
> están en el sitemap. Solo las carpetas internas de `src` van en inglés.

## SEO y recursos de marca

- `app/opengraph-image.tsx` genera la imagen social del home, y
  `app/servicios/[slug]/opengraph-image.tsx` una **por servicio**, con su título,
  subtítulo, planes y precio desde. Las cuatro se prerenderizan a 1200x630.
- Iconos y `site.webmanifest` se declaran en `metadata.icons` y
  `metadata.manifest` del layout raíz.
- `themeColor` sale de `--color-surface` medido en cada tema (`#f9fcff` /
  `#0a1019`), no elegido a ojo.
- El JSON-LD `Organization` referencia el logo real, el correo y el teléfono.
- **No dejar un `favicon.ico` en `src/app/`**: esa convención de Next tiene
  precedencia sobre `public/favicon.ico` y tapa el icono real.

## Página de detalle del servicio

Estructura calcada del formato de ficha de Fiverr, en dos columnas:

**Izquierda:** migas de pan, título, descripción de 2 líneas, galería con zoom,
"Acerca de este trabajo", comparativa de paquetes, ideal para, proceso,
tecnologías, FAQ del servicio, otros servicios.

**Derecha (pegajosa):** `PanelPlanes` con pestañas Básico / Estándar / Premium,
precio, rótulo comercial, 3 bullets al grano, entrega, revisiones, "Qué incluye"
plegable, entrega express con recargo, y las dos salidas de cotización.

En móvil la columna derecha no desaparece: el panel se monta bajo la galería y
aparece además una barra fija inferior con precio y acción. `PanelPlanes` recibe
`idPrefix` justamente porque se monta dos veces y los `id` no pueden chocar.

El índice de plan vive en `ServicioDetalle` y lo comparten el panel y la tabla
comparativa: elegir un plan en cualquiera de los dos resalta la columna del otro.

## Servicios

Tres servicios, cada uno con 3 planes. La tarjeta del home es corta y enlaza al
detalle; la comparación completa vive en `/servicios/[slug]`.

Precios netos en CLP, sin IVA, **por proyecto con fecha de entrega**, no por
hora. Las horas de la pauta de referencia sirven para dimensionar, no para
facturar. Al cambiarlos, se cambian **solo** en `mocks/services.ts`.

| Servicio               | Básico       | Estándar     | Premium      |
| ---------------------- | ------------ | ------------ | ------------ |
| Landing Page           | $220.000     | $340.000     | $490.000     |
| Página Web Multipágina | $420.000     | $590.000     | $790.000     |
| CRM Personalizado      | $1,2M - $1,8M | $1,9M - $2,6M | desde $3,4M |

Salen de la pauta profesional por tipo de sitio y nivel de entrega: el Básico
de landing corresponde a "Completo" ($216.000), el Premium a "Completo +
integraciones", y el CRM a la fila de plataforma web. El **piso de $220.000** no
baja: bajo $150.000 está el territorio de la plantilla revendida, donde no hay
margen que defender.

El plan **Estándar** es el recomendado en los tres servicios (`destacado: true`),
y **Página Web Multipágina** es el servicio destacado del home.

**Landing y Multipágina comparten estructura**, contada en secciones o en
páginas según corresponda. Lo único propio del multipágina es el blog.

**El diseño se nombra en los nueve planes** ("Diseño y programación, ambos los
hago yo") y las **conexiones externas** (pagos, reservas, correos automáticos)
solo en los tres Premium: es lo que separa un sitio que se ve bien de uno que
además opera.

### Plazos de entrega

| Servicio | Básico | Estándar | Premium |
| -------- | ------ | -------- | ------- |
| Landing Page | 5 días | 7 días | 10 días |
| Multipágina | 10 días | 12 días | 14 días |
| CRM | 2 semanas | 4 a 5 semanas | 6 a 8 semanas |

Se dice **"Entrega en N días"**, nunca "N días hábiles": el cliente cuenta en
días de calendario y "hábiles" solo sirve para discutir después. El CRM se
cuenta en semanas porque en meses de trabajo el día suelto no informa.

`entregaDias` guarda el número para ordenar y comparar; el texto visible sale
siempre de `entrega`, que ya viene redactado. Por eso la tarjeta del home
muestra "Entrega en 2 semanas" en el CRM y no un "14 días" compuesto a mano.
`check:cotizacion` vigila las tres reglas: que el plazo suba de plan en plan,
que empiece por "Entrega en", y que no reaparezca la palabra "hábiles".

### Mantención

El primer mes va **incluido** y es el valor por defecto del selector. Los tramos
siguientes son prepago:

| Tramo          | Landing  | Multipágina | CRM            |
| -------------- | -------- | ----------- | -------------- |
| 1 mes          | incluido | incluido    | incluido       |
| 3 meses        | $54.900  | $109.900    | a cotizar      |
| 6 meses        | $99.900  | $199.900    | a cotizar      |
| 1 año          | $189.000 | $379.000    | a cotizar      |
| mensual suelto | $19.900  | $39.900     | desde $190.000 |

El CRM además **exige** mantención (`mantencionObligatoria: true`) y lleva
levantamiento pagado previo (`discovery`, $250.000, descontable del proyecto).

### Flujo de cotización

`/servicios/[slug]` -> tabs de plan -> "Cotizar plan X" -> modal con dos salidas:

1. **WhatsApp**: `wa.me` con el resumen ya redactado (servicio, plan, precio, plazo, incluye).
2. **Formulario**: `/?servicio={slug}&plan={nivel}#contacto`, que preselecciona el
   servicio y prellena el mensaje.

El número y el correo comerciales están en `features/cotizacion/lib/cotizacion.ts`.

## Decisiones que conviene no re-litigar

**Tema claro/oscuro sin estado de React.** `data-theme` en `<html>` es la fuente de
verdad y el CSS reacciona con la variante `dark:`. `ThemeToggle` solo escribe el
atributo y `localStorage`. El icono y la etiqueta accesible se resuelven por CSS, así
que no hay desajuste de hidratación ni parpadeo. No reintroducir un `ThemeProvider`.

**Idioma con `useSyncExternalStore`.** El locale vive fuera de React (localStorage +
`document.lang`). No usar `useState` + `useEffect`: la regla `react-hooks/set-state-in-effect`
lo bloquea y produce renders en cascada.

> Nota honesta: la conmutación de idioma es en cliente. El HTML servido siempre está
> en es-CL, que es lo indexable. El inglés no tiene URL propia y por tanto no es
> indexable por separado. Si el inglés debe posicionar, hay que migrar a rutas
> `/en/...` con `next-intl`; es un cambio de arquitectura de rutas, no un ajuste.

**El desplazamiento suave es solo para las anclas.** `scroll-behavior: smooth`
puesto en `html` sin condición hacía que el salto al tope del router, en cada
cambio de ruta, se volviera una animación larga desde donde estabas: viniendo
del pie del home, `/privacidad`, `/terminos` y `/cookies` abrían por el final.
Se notaba solo en esos tres porque son los únicos enlaces que viven en el
footer. La regla ahora es `auto` por defecto y `html:has(:target)` la sube a
`smooth`: `:target` existe exactamente cuando la URL trae ancla. Verificado:
`/privacidad` -> `auto`, `/privacidad#derechos` -> `smooth`, `/#faq` ->
`smooth`. Donde `:has()` no exista la regla se descarta entera y queda el
`auto`: se pierde el deslizamiento, no el comportamiento correcto.
`ScrollAlTope` acompaña como red de seguridad para el caso en que el navegador
restaure la posición anterior en una navegación blanda.

**La curva por defecto vive en `@layer base`.** `globals.css` fija
`transition-timing-function: var(--ease-standard)` sobre `*` para que las
transiciones que no declaran easing no caigan en el `ease` del navegador. Esa
regla **tiene que estar dentro de `@layer base`**: el CSS sin capa vence a
cualquier capa sin importar la especificidad, así que fuera de ahí anularía las
utilidades `ease-*` de todo el proyecto. Mismo cuidado con cualquier regla
global nueva que pise una propiedad que también se use como utilidad.

**El servicio no es solo para Chile.** El copy decía "para ... en Chile" en el
badge del hero, la descripción, el OG, Twitter, el manifiesto y el JSON-LD; y el
FAQ del propio home ya admitía lo contrario ("Trabajamos con clientes de todo
Chile y también del extranjero"). Se quitó la coletilla "en Chile" de esos
textos y se retiró `areaServed: { "@type": "Country", name: "Chile" }` del
`Organization` y del `Service` en JSON-LD, porque ese campo sí le dice a Google
que el área de cobertura es exclusivamente Chile. Las palabras clave (`"diseño
web Chile"`, etc.) **se dejaron**: apuntan al mercado principal sin excluir al
resto, que es distinto de declarar una cobertura geográfica cerrada. Tampoco se
tocó "Diseñado y desarrollado en Chile" del pie ni "Santiago de Chile": esas
describen dónde está el estudio, no a quién atiende.

**El "logo" de las imágenes Open Graph no era el logo.** `opengraph-image.tsx`
(home y servicio) dibujaba una letra "P" suelta sobre un cuadrado dorado con
`next/og`, en vez del rombo apilado real de la marca. Por eso el enlace
compartido en WhatsApp mostraba un ícono distinto al del resto del sitio: nunca
fue un problema de caché, era un placeholder que nadie reemplazó por el logo de
verdad. `next/og` (Satori) no puede leer un archivo del disco al generar la
imagen — corre sin `fs` — así que la solución no es apuntar a
`/apple-touch-icon.png`: es incrustar el PNG en base64 dentro del módulo,
[ogLogo.ts](src/shared/lib/ogLogo.ts), y usarlo como `<img src={data:...}>` en
las dos rutas.

> Aun con el logo correcto, quien ya compartió el enlace antes de este cambio
> puede seguir viendo la vista previa vieja: WhatsApp usa el rastreador de Meta,
> que cachea la miniatura por URL y no la vuelve a pedir en cada envío. Se
> refresca sola con el tiempo, o al instante pasando la URL por
> developers.facebook.com/tools/debug y pidiendo "Scrape Again".

**No se venden solo páginas, también aplicaciones web.** El CRM es una
aplicación, no un sitio, y la metadata decía únicamente "Páginas Web": título,
descripción, palabras clave, imagen social, manifiesto, JSON-LD y el subtítulo
del hero hablan ahora de "páginas y aplicaciones web a medida como CRM". Al
tocar cualquiera de esos textos hay que tocarlos todos: viven en cinco archivos
distintos (`layout.tsx`, `opengraph-image.tsx`, `page.tsx`, `site.webmanifest` y
el diccionario) y se desincronizan solos.

> El título por defecto mide 84 caracteres y Google corta cerca de los 60, así
> que en el resultado de búsqueda se ve truncado. Es una decisión tomada a
> sabiendas: el título completo se usa igual en la pestaña y en el compartido
> social. El `twitter.title` sí va corto.

**Las preguntas frecuentes son catálogo, no relleno.** Se escriben a mano y
viven lejos de los planes, así que son el primer texto que se desactualiza: al
revisarlas prometían un panel de administración desde el Estándar (es de
Premium, y es un CRM, no un editor de textos), el píxel de Meta y la etiqueta de
Google Ads (no existen en ningún plan), un chatbot en el CRM (solo lo tienen los
servicios web), y que el dominio venía solo desde el Estándar. `check:cotizacion`
ahora vigila cuatro reglas: los dos idiomas tienen las mismas preguntas, ninguna
promete una posición en Google **en primera persona** (nombrar "el primer lugar"
para advertir que nadie lo controla es correcto y debe pasar), el dominio va en
los tres planes o en ninguno, y una pregunta no puede ofrecer algo —chatbot,
blog, panel— que ningún plan de ese servicio incluye.

**Dominio y hosting van en los nueve planes.** Compra y configuración de los
dos por un año, desde el Básico y en los tres servicios, el CRM incluido: no
son un argumento para subir de plan. El CRM los hereda por "Todo lo del plan
Básico", que es la convención del catálogo para no repetir la lista entera, así
que la comprobación entiende esa herencia en vez de exigir la línea literal en
los tres. Antes el CRM no los traía, por aquello de que un sistema interno no
lleva dominio propio; la decisión se revirtió.

**Quién administra qué.** El cliente no gestiona su sitio: las actualizaciones
de textos e imágenes las hace el estudio, y solo **mientras haya soporte
vigente** (1, 3 o 6 meses según el plan, extensible con mantención). Sin
soporte vigente, los cambios se cotizan aparte. La única excepción son los
planes con CRM, donde el cliente sí administra desde un panel, pero **datos de
negocio** —productos, usuarios, inventario— y no las secciones de la página.
Esta distinción es la que la FAQ tenía mal: prometía un panel de contenidos
desde el Estándar.

**El foco por programa no lleva contorno.** El aviso de cookies mueve el foco a
su contenedor al aparecer, para que un lector de pantalla se entere de que hay
algo que decidir. Ese contenedor va de borde a borde (`inset-x-0 bottom-0`), así
que el contorno dorado de `:focus-visible` se dibujaba entero pero solo se veía
su borde superior: una línea dorada suelta sobre el diálogo. El
`focus-visible:outline-none` que tenía el componente **no servía**: las
utilidades de Tailwind viven en `@layer utilities` y la regla `:focus-visible`
de `globals.css` está sin capa, y el CSS sin capa vence a cualquier capa. La
regla que sí gana es `[tabindex="-1"]:focus-visible { outline: none }`, también
sin capa y más específica. Los controles de dentro conservan su contorno: quien
navega con teclado sigue viendo dónde está.

**La validación del formulario vive en el schema, no en el componente.**
`crearContactoSchema` recibe los slugs válidos y lo usan los dos lados: React
Hook Form con `zodResolver` en el cliente, y la Server Action en el servidor.
La del cliente es comodidad de uso; **la que cuenta es la del servidor**, porque
una Server Action es un endpoint público al que se puede llamar sin pasar por el
formulario. El catálogo de servicios se lee en el servidor, no se confía en la
lista que el cliente dice haber pintado.

> Sobre inyección SQL: no se previene filtrando texto. El filtrado de aquí es
> para que el dato sea coherente. La defensa real son consultas parametrizadas
> en la capa de datos, y hay que aplicarlas igual cuando esto escriba en una base.

**`useWatch`, nunca `watch()`.** La regla `react-hooks/incompatible-library`
rechaza `watch()` porque el compilador de React no puede memorizarlo con
seguridad. `useWatch` además solo re-renderiza por el campo suscrito.

**El enlace activo del menú no se deduce del hash.** `useSeccionActiva` marca
la última sección que cruzó una línea de lectura, no la que está dentro de una
banda: entre dos secciones no habría ninguna y el resaltado parpadearía. El
`IntersectionObserver` solo dice _cuándo_ recalcular. Verificado con un barrido
de toda la página: cero posiciones sin sección activa.

**El orden del menú no es el del DOM.** El menú va Servicios, Precios, Cómo
funciona, FAQ; la página los pinta Servicios, Cómo funciona, Precios, FAQ. Por
eso el hook ordena las secciones por su posición real en el documento y no por
el orden del array que recibe.

**Revelado y hover no van en el mismo elemento.** Ambos animan `transform`, y
sobre un mismo nodo la transición del revelado (`.js [data-reveal]`, sin capa)
gana y se lleva por delante la del hover. Cuando una tarjeta deba revelarse y
además levantarse al pasar el cursor, `Reveal` envuelve y la tarjeta va dentro.

**Las utilidades `translate-*` de Tailwind v4 no son `transform`.** Escriben la
propiedad CSS `translate`, que es independiente. Una lista
`transition-[transform,...]` junto a `hover:-translate-y-1` **no anima nada**:
el salto es instantáneo y solo se ve moverse la sombra. Era exactamente lo que
hacía sentir "duro" el hover de todas las tarjetas y botones. Las listas dicen
`translate`. `transition-transform` sí sirve porque expande a
`transform, translate, scale, rotate`.

**El revelado es solo opacidad.** El desplazamiento vertical hacía que la
página pareciera moverse sola al entrar. Sin `transform`, la aparición es más
tranquila y sigue componiéndose en GPU.

**El formulario lleva `method="post"` aunque lo envíe React.** Es una red de
seguridad: si alguien pulsara antes de que hidrate, el navegador haría el envío
nativo, y con el GET por defecto el nombre, el correo y el teléfono acabarían en
la barra de direcciones, el historial y la cabecera `Referer`. La política de
privacidad promete lo contrario.

**Animación de entrada sin librería.** Un único `IntersectionObserver` para toda la
página (no uno por elemento). Solo se animan `transform` y `opacity`. El estado inicial
oculto cuelga de `.js` en `<html>`: **sin JavaScript el contenido se ve**, no queda en
`opacity: 0`. Al terminar la transición se libera `will-change`. Respeta
`prefers-reduced-motion`.

**La tarjeta del panel no puede llevar `overflow-hidden`.** Lo tenía para
redondear la barra de pestañas, y de paso recortaba el globo de ayuda del
soporte contra su propio borde: el contenido desaparecía justo al abrirlo. El
recorte pasó a la barra de pestañas, que era lo único que lo necesitaba.
Medido: cero ancestros que recorten, y el globo sobresale 106px por debajo de
la tarjeta sin perderse.

**El globo de ayuda es un disclosure, no un tooltip.** Un tooltip que solo
responde a hover no existe en un teléfono, y de ahí viene la mayoría del
tráfico. `Ayuda` abre con hover, con foco de teclado **y** con clic, y su botón
va **fuera del `<label>`**: dentro, pulsar el signo de interrogación marcaría el
checkbox. El filtro `pointerType === "mouse"` es lo que evita que en táctil el
`pointerenter` sintético abra el globo y el `click` inmediato lo cierre.
Verificado: clic abre sin marcar el checkbox, hover de mouse abre, hover táctil
no, foco abre, y cerrado queda `inert` y fuera del recorrido de teclado.

**La mantención es parte de la cotización, no una nota al pie.** Vive en
`PanelPlanes` bajo "Qué incluye" y la elección viaja completa: al resumen de
WhatsApp, al modal, y al formulario por el parámetro `mantencion` de la URL.
Son dos controles: un **checkbox** que decide si se extiende, y un **select**
que aparece solo si está marcado, con los tramos pagados rotulados
`3 meses - $84.900`. El primer mes va incluido **siempre**, marcado o no, así
que sin marcar el resumen dice `Mantención: 1 mes (Incluida)` en lugar de
omitir la línea. Como el panel se monta dos veces (móvil y escritorio), el
estado vive en `ServicioDetalle` igual que el índice de plan.

**El diálogo de cotización no scrollea entero.** Llevaba `max-h-[90vh]` con
`overflow-y-auto` en el propio `role="dialog"`, así que la cabecera y el botón
de cerrar se iban de pantalla justo cuando hacían falta. Ahora es una columna
flex que recorta (`overflow-hidden`), con la cabecera en `shrink-0` y el cuerpo
en `min-h-0 flex-1 overflow-y-auto`. **El `min-h-0` no es decorativo**: sin él
un hijo flex no baja de su alto de contenido y el scroll no aparece nunca.
Medido a 800px de alto: diálogo 720 sin scroll propio, cuerpo 669 sobre 621 con
scroll, y la cabecera no se mueve al scrollear.

**El desplazamiento de los botones flotantes lo decide el CSS, no el JS.** La
ficha de servicio marca el documento con `data-barra-inferior` y `globals.css`
sube `--fab-bottom` a 5.25rem, pero **solo bajo 1024px**: la barra fija que
esquivan es `lg:hidden`, así que en escritorio no hay nada que esquivar y
volvían a verse flotando demasiado arriba. Antes el valor se fijaba desde JS sin
mirar el ancho. Medido: 768px -> 84px de separación contra una barra de 69px;
1280px -> 20px; en el home, sin la marca, 20px.

**El botón de WhatsApp en reposo es solo el círculo.** Cara, insignia de
WhatsApp y punto de activo; el texto aparece al pulsarlo. Una píldora con dos
líneas de texto siempre visible ocupa demasiado en móvil sin que nadie lo haya
pedido. La tarjeta sigue el mismo patrón que el drawer del navbar: no se
desmonta, se apaga con `inert`, y anima `opacity`, `translate` y `scale` (las
tres propiedades reales, no `transform`). Cierra con Escape, con clic fuera y
con su propio botón, devolviendo el foco al círculo.

**La columna pegajosa cambia de anclaje, no scrollea por dentro.** Desplegado,
el panel mide más que una pantalla baja, y anclado arriba el botón de cotizar
queda permanentemente fuera de alcance. La primera solución fue `overflow-y-auto`
en la columna y estuvo mal por dos motivos: un scroll dentro de otro scroll
molesta, y **`overflow` distinto de `visible` recorta la sombra del panel** en
los bordes del contenedor.

La solución es medir y cambiar el anclaje. Un efecto compara el alto de la
columna contra `innerHeight` y escribe `data-anclaje` en el nodo:

- **cabe** -> `top: 6rem`, como siempre
- **no cabe** -> `top: auto; bottom: 1.5rem`, es decir anclada abajo: sube con
  la página hasta que su base toca el borde inferior y ahí se queda, con el
  botón de cotizar siempre a la vista

Se escribe un atributo en el DOM, no estado de React, así que no choca con
`react-hooks/set-state-in-effect`. Sin JS el atributo no existe y el valor por
defecto `top-24` deja el comportamiento de siempre. El efecto depende de
`incluyeAbierto` y de `indice` además de tener un `ResizeObserver`: los dos
cambios de alto que sabemos que ocurren no dependen de que el observador
alcance a entregar. Medido a 850px de alto: plegado 641 -> arriba, desplegado
773 -> abajo, desplegado en Premium 973 -> abajo, plegado de nuevo -> arriba.

**El estado de "Ver todo" vive en `ServicioDetalle`**, igual que el índice de
plan y la mantención, porque el panel se monta dos veces.

**El soporte incluido es del plan, no del servicio.** `soporteMeses` sube con
el escalón (1 / 3 / 6) y el selector de mantención lo respeta: el texto dice
cuántos meses ya vienen, y el desplegable **solo ofrece los tramos que superan
lo incluido**. Un plan con 6 meses incluidos no puede ofrecer "3 meses -
$84.900": sería cobrar por menos de lo que ya tiene. `check:cotizacion` vigila
las dos reglas. Antes esto vivía en el servicio, y el panel habría dicho "1 mes
incluido" mientras la lista prometía tres.

**El panel de administración es de Premium, no de Estándar.** El Estándar es el
Básico con más de todo (más secciones, páginas internas, idiomas, correos,
soporte); el salto cualitativo lo hace Premium con el CRM y su base de datos. Puesto en Estándar, Premium se quedaba sin argumento propio.

**El Premium no vende un CMS de páginas, vende un CRM con base de datos.** No
es "edita los textos de tu sitio" sino "gestiona productos, usuarios e
inventario": por eso el plan incluye **base de datos y servidor configurados**,
y por eso ya no aparece la palabra CMS en ninguna parte del catálogo. El
software es Payload 3, que corre dentro del mismo proyecto Next y necesita
Postgres; Keystatic quedó descartado porque guarda en el repositorio y no
sirve para datos de negocio que cambian a diario.

**Las maquetas de galería son vectores dibujados, no cajas grises.** Cada
servicio tiene 5 escenas de 1200x800 con contenido de un negocio inventado pero
verosímil (un estudio contable, una constructora, una distribuidora): textos
reales, precios en CLP, nombres de personas, y **marcadores numerados** que
señalan lo que hay que mirar. Usan la paleta del sitio, no un gris genérico con
acento índigo como las anteriores. Se generan desde un script con un lenguaje
visual común (marco de navegador, marco de teléfono, botón, pastilla, nota), así
que cambiar la paleta es cambiar seis constantes y no quince archivos.

**El botón flotante de WhatsApp no lleva insignia de la aplicación.** El canal
se nombra al abrir la tarjeta; en reposo basta con la cara, un aro verde y el
punto de disponibilidad. El punto va sin borde y late con `box-shadow` en
`@keyframes`: una onda que se expande y desvanece sin tocar el layout, y que se
apaga con `prefers-reduced-motion`.

**`bullets` e `incluye` son una sola lista partida en dos.** El panel muestra
"Qué incluye" con los 6 de `bullets` a la vista y "Ver todo lo que incluye"
despliega `incluye`, que es **el resto y no la lista completa**: si se
solaparan, desplegar mostraría lo mismo otra vez. `check:cotizacion` falla si
un ítem aparece en las dos. El resumen que viaja por WhatsApp sí concatena
ambas, porque ahí no hay nada plegado.

**El catálogo se escribe para el cliente, no para el desarrollador.** Ningún
texto visible dice JSON-LD, PageSpeed, Search Console, API REST, SLA, staging,
multi-tenant ni DNS: el cliente no reconoce esos términos y una lista que no se
entiende no vende. Se nombra el resultado, no la técnica — "Preparada para que
Google la encuentre" en vez de "datos estructurados", "Compromiso de
disponibilidad" en vez de "SLA", "Copia de prueba para revisar cambios antes de
publicarlos" en vez de "ambiente de staging". El trabajo técnico sigue estando;
lo que cambia es cómo se cuenta.

**No existe garantía de satisfacción.** Se eliminó del panel y del
diccionario. Lo que sí se ofrece, y es distinto, son la **garantía de defectos**
(30 días) y la **garantía de rendimiento** (PageSpeed móvil sobre 90): ambas se
verifican con un hecho medible, no con la conformidad subjetiva del cliente.
`/terminos` §11 describe la de defectos y se mantiene.

**El orden del panel es el del proceso de decisión:** precio, qué incluye,
plazo y revisiones, mantención, y recién ahí los botones. Los datos que
condicionan la compra van antes que la acción de comprar.

`bullets` son exactamente 6. En los servicios web el primero es siempre el SEO, porque es lo que
la gente pregunta, y el sexto es siempre el correo profesional, que es el
argumento que más rápido entiende un cliente no técnico. En el CRM no aplica
ninguno de los dos: un sistema interno no se posiciona en Google ni lleva
dominio propio, así que sus 6 hablan de roles, automatizaciones e
integraciones. `check:cotizacion` falla si algún plan deja de tener exactamente 6.

**El plan Básico sí crea una casilla de correo.** El catálogo original lo dejaba
fuera para forzar el salto a Estándar; la decisión se revirtió y ahora Básico
trae 1 cuenta, Estándar hasta 3 y Premium hasta 10. El escalón sigue existiendo
por cantidad, no por ausencia. Al agregarla, "Qué incluye" del Básico habría
llegado a 11, así que formulario y botón de WhatsApp quedaron en una línea.

**"Posicionamiento SEO en Google", nunca "posicionamiento garantizado".** La
primera nombra el trabajo, la segunda promete un resultado que depende de la
competencia y la autoridad del dominio. La diferencia es la que separa un
argumento de venta de un incumplimiento.

**El formulario no confía en el tramo que llega por la URL.** Busca los meses en
`servicio.mantencion.tramos` del catálogo real, igual que hace con el servicio y
el plan. Un parámetro de URL es entrada del usuario.

**"Qué incluye" son 10 líneas, no todas las que existen.** Una lista de trece
ítems no se lee: se hojea. Al recortar se fusionaron los que decían lo mismo
(SEO técnico + datos estructurados + indexación en una línea, las dos garantías
en otra) en vez de cortar por el final, que habría dejado fuera la entrega del
código fuente. `check:cotizacion` falla si algún plan vuelve a pasarse de 10.

**El precio se muestra en dos monedas y la del idioma manda.** En español el
peso es el principal y el dólar va al lado con "≈"; en inglés al revés. El valor
sale de `findic.cl` (`dolar.valor`, pesos por USD), se consulta **una sola vez
cada 6 horas en el servidor** con `next: { revalidate }` y baja por contexto:
ningún navegador golpea la API de terceros. Si la API falla, `getDolar()`
devuelve un respaldo marcado y el sitio sigue en pie — un precio sin convertir
es aceptable, una página caída por un tercero no.

**El dólar se imprime con código, no con símbolo.** `USD 238`, nunca `$238`: el
peso chileno usa el mismo signo, y "$238" junto a "$220.000" no se distingue.
La conversión siempre lleva "≈" y la fecha del valor en el `title`, porque el
dólar observado cambia todos los días y dar un número exacto sin decir de cuándo
es sería prometer un precio que mañana no se sostiene.

**Un precio de rango no es un precio.** `precio` + `precioHasta` +
`precioEstimado` distinguen el compromiso de la referencia. Los tres servicios
web tienen precio cerrado; el CRM va en rango porque cotizar un CRM cerrado sin
levantamiento es la forma más rápida de reventar un presupuesto. La UI respeta
la marca en un solo lugar, `formatPrecioPlan()`: cerrado imprime el valor,
rango imprime `piso - techo`, y sin techo imprime `Desde piso`. En las cajas
estrechas (barra móvil, cabeceras de la comparativa) el rango se colapsa a
"Desde". En JSON-LD el rango sale como `AggregateOffer` con `lowPrice` y
`highPrice`, no como `Offer`: Google marca error cuando el precio publicado de
un `Offer` no es el precio real de compra.

**Se vende indexación, no posicionamiento.** La indexación se acredita con una
captura de Search Console en días; la posición depende de competencia y
autoridad de dominio y no se controla. Ninguna parte del sitio puede decir
"posicionamiento garantizado" ni "primer lugar en Google", ni ofrecer "panel de
administración" en un plan Básico (ninguno lo trae) ni "rediseño incluido" (es
un servicio aparte). `/terminos` ya lo declara explícitamente.

**El enlace con aspecto de botón es un enlace.** `<Link><Button/></Link>` mete un
`<button>` dentro de un `<a>`, anidamiento que el HTML prohíbe: el navegador
rompe el árbol y quedan dos controles enfocables para una sola acción. Por eso
`Button` exporta `clasesBoton()` y existe `ButtonLink`, que pinta un `<Link>`
con las mismas clases. Lo nuevo usa `ButtonLink`; quedan llamadas viejas con el
anidamiento por migrar.

**El formulario no dice "enviado" porque no lo está.** Al enviar solo se abre el
cliente de correo con el mensaje redactado; pulsar Enviar allí es cosa de la
persona, y puede cancelar. El panel final dice "Falta un paso", usa un icono de
sobre en vez del check verde, y ofrece el correo directo por si la aplicación no
se abrió. El estado se llama `pendienteEnvio`, no `exito`. Cuando exista envío
transaccional propio, ahí sí corresponde confirmar la recepción.

**El dorado no puede ser texto y relleno con el mismo valor.** Medido contra la
superficie clara, `brand-500` (#f5b301) da **1.81:1**: sirve como fondo, no como
texto. Por eso hay dos familias de tokens y no una:

| Token                                            | Para qué                               | Claro                    | Oscuro      |
| ------------------------------------------------ | -------------------------------------- | ------------------------ | ----------- |
| `--color-brand`                                  | texto, iconos, enlaces                 | `brand-800`              | `brand-400` |
| `--color-brand-border`                           | bordes, contornos de foco, separadores | `brand-700`              | `brand-400` |
| `--color-border-strong`                          | contorno de controles de formulario    | `#8f887a`                | `#737373`   |
| `--color-brand-solid` + `--color-brand-on-solid` | rellenos con texto encima              | `brand-500` + casi negro | igual       |

**El contorno de un control no es un separador.** `--color-border` da
**1.30:1** contra el panel: sirve para dividir bloques, pero como única señal de
que ahí hay una casilla es invisible. Por eso existe `--color-border-strong`,
medido para superar el 3:1 de WCAG 1.4.11 sobre las cuatro superficies (3.05
claro, 3.48 oscuro). Y el checkbox marcado toma el borde de `--color-brand-border`,
no de `--color-brand-solid`: en tema claro el dorado vivo contra el panel da
1.85 y la caja perdería el contorno justo al activarse. El estado lo carga el
check oscuro sobre el relleno, a 10.19:1.

**El checkbox de mantención no es el nativo.** No se puede redondear ni animar
de forma pareja entre navegadores, así que el `input` queda en el DOM con
`sr-only` (sigue siendo el control real: enfocable, anunciado, y la etiqueta lo
activa) y la caja visible es un hermano que reacciona con `peer-checked`. El
check entra con `scale` porque el icono es descendiente de ese hermano, no
hermano del input: la variante correcta es `peer-checked:[&_svg]:scale-100`,
ya que `peer-checked:` solo alcanza a hermanos directos.

**Un borde no es texto y no necesita 4.5.** WCAG 1.4.11 pide 3:1 a los
elementos de interfaz, así que los bordes pueden usar un dorado más claro que
el del texto. Medido sobre las cinco superficies claras: `brand-700` da 3.04 en
el peor caso y sirve; `brand-600` se queda en 2.13 y no sirve ni como borde.
`--color-brand` sigue en `brand-800` porque **no hay margen**: su peor caso es
4.52 sobre `surface-inset`, es decir ya está en el suelo de AA. Aclararlo más
sacaría el texto de norma.

`brand-800` es el paso más claro que supera 4.5 sobre las cuatro superficies del
tema claro. En los rellenos el texto es **oscuro sobre dorado** (10.19:1), nunca
blanco: blanco sobre `brand-500` da 1.85:1. Un solo par de tokens sirve en ambos
temas, así que esos rellenos ya no necesitan variante `dark:`.

**Contraste medido, no estimado.** Los 54 pares de token de texto x superficie
(6 superficies, incluidas `brand-soft` y `accent-soft`) pasan WCAG AA (>= 4.5) en
ambos temas; los peores están en 4.52 (claro) y 4.67 (oscuro), ambos
`text-subtle / surface-inset`. **Al tocar un color, volver a medir.**

**El tema oscuro es negro neutro.** Las cinco superficies oscuras tienen desvío de
gris cero (`#0a0a0a`, `#161616`, `#111111`, `#1f1f1f`, `#2c2c2c`). Los neutros del
tema claro sí son cálidos, para acompañar al dorado sin pelear con él.

**El consentimiento es una puerta real, no un cartel.** `permitePreferencias()`
envuelve **todos** los `localStorage.setItem` de preferencias: `ThemeToggle` y
`I18nProvider` aplican el cambio siempre, pero solo lo recuerdan si hay un
"aceptado" explícito. Sin decisión tampoco se escribe: el consentimiento se
presta, no se presume por seguir navegando. Al rechazar se **borra** lo ya
guardado, porque dejar de escribir no sirve de nada si lo escrito sigue ahí.
Verificado en el navegador: visita nueva -> 0 claves; cambiar tema sin decidir
-> se aplica pero no se guarda; Rechazar -> solo queda `podio-consentimiento`;
Aceptar -> el tema y el idioma sí persisten; revocar desde /cookies -> las tres
claves desaparecen y el aviso reaparece.

**Los dos botones del aviso pesan lo mismo y no hay una X.** La Ley 21.719 pide
que rechazar sea tan fácil como aceptar; cerrar sin decidir dejaría un estado
ambiguo que el sitio interpretaría como permiso. El detalle de qué se guarda va
**dentro** del aviso, no solo enlazado: "informado" significa antes de decidir.
`VERSION_CONSENTIMIENTO` invalida los consentimientos viejos si cambia el texto.

**El footer es oscuro en los dos temas, como el navbar.** Sus tokens
(`--footer-*`) viven fuera de los bloques de tema. Con el fondo oscuro el logo
ya no necesita placa, así que va con `placa={false}`. Contraste medido sobre
`--footer-bg`: títulos 17.62, texto 8.36, apagado 5.35, hover 11.70.

**El crédito del creador es una firma, no una tarjeta.** Cierra la columna
Legal, con avatar de 36px y una línea de nombre y oficio. Antes ocupaba una
tarjeta del ancho de una columna entera y competía con el contenido que sí hay
que leer.

**El navbar es oscuro en los dos temas.** Sus tokens (`--navbar-*`) viven en
`theme.css` fuera de los bloques de tema, porque no dependen del tema. El
motivo no es estético: sobre una barra clara el tercio blanco del logo mide
1.04:1 y desaparece. Con la barra oscura mide 13.47:1 y la placa sobra, por eso
el navbar usa `<Logo placa={false} />`. **El footer sí conserva la placa**: su
fondo sigue siendo `--color-surface-muted`, que en tema claro es claro.

**El menú móvil es un drawer que no se desmonta.** Se apaga con `inert` en vez
de dejar de renderizarse, así la animación también ocurre al cerrar y estando
inerte queda fuera del recorrido de teclado. El velo es un `div` decorativo con
`aria-hidden`, no un botón: cerrar tocando fuera es comodidad de puntero, y como
botón habría dos controles con la misma etiqueta dentro del diálogo.

> Ojo con Tailwind v4: `translate-x-full` genera la propiedad CSS `translate`,
> no `transform`. `getComputedStyle().transform` devuelve `none` aunque el
> elemento sí esté desplazado. `transition-transform` sí lo cubre porque expande
> a `transform, translate, scale, rotate`.

**El logo solo sirve sobre fondo oscuro.** `logo-podio-chile.svg` es dorado y
blanco sobre transparente; su tercio central es blanco puro y medido contra la
superficie del tema claro da **1.04:1**, es decir, invisible. Por eso `Logo` pinta
la placa `--logo-plate`, que es oscura en el tema claro y `transparent` en el
oscuro. Si algún día llega una variante para fondos claros, la placa se quita.

**Valores arbitrarios de Tailwind usan guion bajo, no espacio.**
`bg-[oklch(22% 0.03 260)]` no genera ninguna clase y falla en silencio; lo
correcto es `bg-[oklch(22%_0.03_260)]`. Si un color arbitrario no aparece,
revisar esto antes que nada.

**SVG fuera del optimizador de imágenes.** Las maquetas de galería son vectores y
se sirven con `unoptimized`. Pasarlas por `/_next/image` obliga a habilitar
`dangerouslyAllowSVG`, y ese modo añade `Content-Disposition: attachment`, que
impide que el navegador las pinte dentro de un `<img>`. Un vector no gana nada en
el optimizador: no hay redimensionado ni cambio de formato que ganar.

## Producción

**Cabeceras de seguridad en `next.config.ts`.** No había ninguna. Ahora van CSP,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` y HSTS, más `poweredByHeader: false` para no anunciar el
framework y su versión.

La CSP lleva `'unsafe-inline'` en `script-src` a la fuerza: el script que
restituye el tema antes del primer paint es inline por necesidad. Firmarlo con
nonce obliga a renderizar cada página en cada visita y este sitio es estático.
Aun así la política bloquea scripts, marcos, fuentes y objetos de terceros.
`'unsafe-eval'` se agrega **solo en desarrollo**, donde React lo necesita: sin
esa distinción `npm run dev` queda inservible.

**Ninguna llamada a un tercero sin tiempo límite.** `fetch` de Node no lo trae.
Sin `AbortSignal.timeout`, una API que acepta la conexión y no responde deja
`next build` colgado sin error y sin fin, y el despliegue nunca termina.

**En el log del servidor no van datos personales.** La Server Action registraba
nombre, correo y teléfono. Esos registros los guarda el proveedor de
alojamiento, se retienen fuera de nuestro control y la política de privacidad
promete lo contrario. Ahora solo se anota el servicio, el país y si venía
mensaje.

**El presupuesto de JS no se cumple.** Medido sobre el build de producción y
comprimido: **317 KB en el home y 329 KB en el detalle**, contra los 120/150 KB
del Bloque 0. Los dos trozos más grandes son el runtime de React y Next (69 KB)
y **Zod (63 KB)**, que entra al cliente por `FormularioContacto`, el único que
importa `crearContactoSchema` como valor y no como tipo. El resto de los
`import type` de schemas se borran al compilar y no pesan. Bajarlo de verdad
pasa por validar en el cliente sin Zod y dejarlo solo en la Server Action, o
por cargar el formulario y el lightbox de forma diferida.

## Pendientes antes de producción

- [ ] Conectar el envío real en `enviar-contacto.ts`: hoy valida y registra, y el
      envío final lo hace el cliente de correo del visitante vía `mailto:`. Un
      correo transaccional propio quitaría esa dependencia del dispositivo
- [ ] Rate limiting por IP en la Server Action antes de exponerla en producción
- [ ] Bajar el JS del cliente: hoy 317 KB contra un presupuesto de 120 KB
- [ ] Confirmar que el dominio desplegado es `www.podiochile.com`: el canonical,
      el sitemap y el robots lo dan por hecho
- [ ] **Hacer revisar por abogado** los textos de `/privacidad`, `/terminos` y `/cookies`
- [ ] Confirmar RUT y domicilio exacto: el responsable ya está identificado como
      José Ignacio Contreras Castro, persona natural
- [ ] Implementar de verdad los plazos de conservación que promete la política (12 meses / 6 años)
- [ ] Registro de actividades de tratamiento y procedimiento escrito de brechas (72 h)
- [ ] Reemplazar las maquetas SVG de `public/images/services/` por capturas de
      proyectos reales cuando existan: una maqueta convence menos que un cliente
- [ ] Exportar una variante del logo para fondos claros, y volver a exportar el
      wordmark como vector real: hoy son dos PNG de 1600x260 embebidos en base64
      dentro del SVG, que pesan 245 KB
- [ ] Decidir entre `favicon-16.png` y `favicon-16x16.png` (son archivos distintos,
      no copias); igual para los de 32. Hoy se usan los `NxN`
- [ ] Migrar las llamadas `<Link><Button/></Link>` restantes a `ButtonLink`
- [ ] Adicionales à la carta con precio visible (sección extra, idioma, blog,
      pack legal, migración, auditoría, entrega express +40%)
- [ ] Los cuatro sellos de diferenciación bajo la comparativa: rendimiento
      garantizado, tu dominio y tu código, sin WordPress, indexación verificada
- [ ] Confirmar régimen tributario antes de publicar: si es SpA, todos los
      precios deben mostrarse "+ IVA"
- [ ] Cuenta Vercel Pro activa antes del primer cliente: publicar sitios
      comerciales en Hobby incumple la licencia
- [ ] Al sumar analítica: agregar su categoría al aviso, subir `VERSION_CONSENTIMIENTO`
      y no cargar el script hasta que esa categoría esté aceptada
- [ ] Tests: Vitest para `cotizacion.ts` y schemas; Playwright para el flujo de cotización
