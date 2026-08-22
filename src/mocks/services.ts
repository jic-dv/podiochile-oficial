import {
  ServicioSchema,
  type Servicio,
} from "@/features/services/schemas/service.schema";

const data: Servicio[] = [
  // ─── Landing Page ──────────────────────────────────────────────────────
  {
    id: "svc-landing",
    slug: "landing-page",
    icono: "landing",
    titulo: { es: "Landing Page", en: "Landing Page" },
    subtitulo: {
      es: "Una página que convierte visitantes en clientes",
      en: "One page that turns visitors into clients",
    },
    pitch: {
      es: "Una sola página, enfocada en que el visitante haga una cosa: contactarte.",
      en: "A single page focused on getting the visitor to do one thing: contact you.",
    },
    descripcion: {
      es: "Una landing page es una página única diseñada para un objetivo concreto: captar contactos, vender un servicio o lanzar una campaña. No hay menús que distraigan ni secciones de relleno. Cada bloque empuja al visitante hacia la acción que a ti te interesa. Es el punto de partida más rápido y económico para tener presencia profesional en internet, y la mejor opción si aún no necesitas un sitio completo.",
      en: "A landing page is a single page designed for one concrete goal: capture leads, sell a service or launch a campaign. There are no distracting menus or filler sections. Every block pushes the visitor toward the action that matters to you. It is the fastest and most affordable way to get a professional online presence, and the best option if you don't need a full site yet.",
    },
    galeria: [
      {
        src: "/images/services/landing-page/1-hero.svg",
        alt: {
          es: "Portada de la landing de un estudio contable: titular, botón de acción y una tarjeta con el resumen tributario del mes",
          en: "Landing page hero for an accounting firm: headline, action button and a card with the month's tax summary",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/landing-page/2-secciones.svg",
        alt: {
          es: "Tres tarjetas de servicio con el precio a la vista y una marcada como la más pedida",
          en: "Three service cards with the price in plain sight and one marked as the most requested",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/landing-page/3-movil.svg",
        alt: {
          es: "La misma landing en dos pantallas de celular: la portada y el formulario de contacto",
          en: "The same landing page on two phone screens: the hero and the contact form",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/landing-page/4-formulario.svg",
        alt: {
          es: "Sección de contacto con los datos de la empresa, el horario y un formulario de cuatro campos",
          en: "Contact section with the company details, opening hours and a four-field form",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/landing-page/5-panel.svg",
        alt: {
          es: "Panel con las visitas del mes, los contactos recibidos y de dónde llegan",
          en: "Dashboard with the month's visits, leads received and where they come from",
        },
        ancho: 1200,
        alto: 800,
      },
    ],
    acercaDe: {
      titular: {
        es: "¿Buscas una landing page profesional que genere confianza y convierta visitantes en clientes?",
        en: "Looking for a professional landing page that builds trust and turns visitors into clients?",
      },
      parrafos: {
        es: [
          "Estás en el lugar correcto.",
          "En Podio Chile diseñamos landing pages modernas orientadas a la conversión, construidas sobre React 19 y Next.js 16, para fortalecer tu marca, generar contactos y hacer crecer tu negocio.",
          "Da lo mismo si necesitas una página para tu negocio, una landing para una campaña puntual o el rediseño de la que ya tienes: armamos una solución a la medida de tus objetivos.",
          "A diferencia de una plantilla, aquí no pagas por un tema genérico con plugins encima. El código es propio, liviano y tuyo: sin licencias mensuales ni dependencias que se rompen en la próxima actualización.",
        ],
        en: [
          "You are in the right place.",
          "At Podio Chile we design modern, conversion-focused landing pages built on React 19 and Next.js 16, to strengthen your brand, generate leads and grow your business.",
          "Whether you need a page for your business, a landing page for a specific campaign or a redesign of the one you already have, we build a solution tailored to your goals.",
          "Unlike a template, you are not paying for a generic theme with plugins stacked on top. The code is custom, lightweight and yours: no monthly licences and no dependencies that break on the next update.",
        ],
      },
      listaTitulo: {
        es: "Lo que vas a recibir",
        en: "What you will get",
      },
      lista: {
        es: [
          "Un diseño hecho para ti, no una plantilla",
          "Pensada para que el visitante termine contactándote",
          "Se ve bien en celular, tablet y computador",
          "Preparada para que Google la encuentre",
          "Carga rápido y con conexión segura",
          "Formulario de contacto y botón de WhatsApp",
          "Tu dominio comprado y configurado a tu nombre",
          "Una cuenta de correo con tu dominio",
          "Botones de contacto en los lugares donde la gente decide",
          "El código es tuyo: no quedas amarrado a nadie",
        ],
        en: [
          "A design made for you, not a template",
          "Built so the visitor ends up contacting you",
          "Looks right on phone, tablet and desktop",
          "Set up so Google can find it",
          "Loads fast, over a secure connection",
          "Contact form and WhatsApp button",
          "Your domain bought and set up in your name",
          "One mailbox on your own domain",
          "Contact buttons where people actually decide",
          "The code is yours: you are not tied to anyone",
        ],
      },
    },
    idealPara: {
      es: [
        "Profesionales independientes que quieren captar clientes",
        "Lanzamiento de un producto o servicio nuevo",
        "Campañas de Google Ads o redes sociales",
        "Negocios que hoy solo tienen Instagram",
        "Validar una idea antes de invertir en un sitio completo",
      ],
      en: [
        "Independent professionals looking to attract clients",
        "Launching a new product or service",
        "Google Ads or social media campaigns",
        "Businesses that currently only have Instagram",
        "Validating an idea before investing in a full site",
      ],
    },
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    proceso: [
      {
        titulo: { es: "Brief y objetivos", en: "Brief and goals" },
        descripcion: {
          es: "Definimos a quién le hablas, qué acción quieres que realice y qué mensaje lo convence.",
          en: "We define who you're speaking to, what action you want them to take and which message convinces them.",
        },
      },
      {
        titulo: { es: "Diseño de la página", en: "Page design" },
        descripcion: {
          es: "Creamos la estructura y el diseño visual completo antes de programar. Lo apruebas tú.",
          en: "We create the full structure and visual design before coding. You approve it.",
        },
      },
      {
        titulo: { es: "Desarrollo y textos", en: "Development and copy" },
        descripcion: {
          es: "Programamos la página y ajustamos los textos para que vendan, no solo describan.",
          en: "We build the page and refine the copy so it sells, not just describes.",
        },
      },
      {
        titulo: { es: "Publicación", en: "Launch" },
        descripcion: {
          es: "Configuramos dominio, certificado SSL y analítica. Tu página queda en línea y midiendo.",
          en: "We set up domain, SSL certificate and analytics. Your page goes live and starts measuring.",
        },
      },
    ],
    comparativa: [
      {
        label: { es: "Secciones", en: "Sections" },
        basico: { es: "Hasta 5", en: "Up to 5" },
        estandar: { es: "Hasta 8", en: "Up to 8" },
        premium: { es: "Hasta 12", en: "Up to 12" },
      },
      {
        label: { es: "Páginas internas", en: "Inner pages" },
        basico: false,
        estandar: { es: "Hasta 5", en: "Up to 5" },
        premium: { es: "Sin límite", en: "Unlimited" },
      },
      {
        label: { es: "Diseño", en: "Design" },
        basico: { es: "A medida", en: "Custom" },
        estandar: {
          es: "A medida + dirección de arte",
          en: "Custom + art direction",
        },
        premium: {
          es: "Sistema de diseño y animaciones",
          en: "Design system and animations",
        },
      },
      {
        label: { es: "Adaptable desde 360px", en: "Responsive from 360px" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Formularios de contacto", en: "Contact forms" },
        basico: { es: "1, a tu correo", en: "1, to your inbox" },
        estandar: { es: "1, a tu correo", en: "1, to your inbox" },
        premium: {
          es: "Sin límite, a base de datos",
          en: "Unlimited, to a database",
        },
      },
      {
        label: { es: "Botón de WhatsApp", en: "WhatsApp button" },
        basico: true,
        estandar: true,
        premium: { es: "Enrutamiento por área", en: "Routing by department" },
      },
      {
        label: {
          es: "Dominio 1 año a tu nombre",
          en: "Domain for 1 year in your name",
        },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "SSL y despliegue a producción",
          en: "SSL and production deployment",
        },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Preparado para Google", en: "Set up for Google" },
        basico: true,
        estandar: true,
        premium: {
          es: "Con seguimiento de conversiones",
          en: "With conversion tracking",
        },
      },
      {
        label: { es: "Estadísticas de visitas", en: "Visit statistics" },
        basico: false,
        estandar: true,
        premium: {
          es: "Con eventos de conversión",
          en: "With conversion events",
        },
      },
      {
        label: {
          es: "Registro del sitio en Google",
          en: "Site registered with Google",
        },
        basico: false,
        estandar: true,
        premium: { es: "Con reporte mensual", en: "With monthly report" },
      },
      {
        label: {
          es: "Cuentas de correo profesional",
          en: "Professional mailboxes",
        },
        basico: 1,
        estandar: { es: "Hasta 3", en: "Up to 3" },
        premium: { es: "Múltiples", en: "Multiple" },
      },
      {
        label: {
          es: "Panel de administración (CRM)",
          en: "Admin panel (CRM)",
        },
        basico: false,
        estandar: false,
        premium: {
          es: "Productos, usuarios e inventario",
          en: "Products, users and inventory",
        },
      },
      {
        label: {
          es: "Base de datos y servidor",
          en: "Database and server",
        },
        basico: false,
        estandar: false,
        premium: {
          es: "Configurados y a tu nombre",
          en: "Set up and in your name",
        },
      },
      {
        label: { es: "Blog propio", en: "Your own blog" },
        basico: false,
        estandar: false,
        premium: false,
      },
      {
        label: { es: "Multi-idioma", en: "Multi-language" },
        basico: false,
        estandar: { es: "Varios idiomas", en: "Several languages" },
        premium: { es: "Varios idiomas", en: "Several languages" },
      },
      {
        label: { es: "Modo claro y oscuro", en: "Light and dark mode" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Chatbot", en: "Chatbot" },
        basico: false,
        estandar: false,
        premium: {
          es: "Con IA sobre tu contenido",
          en: "AI over your content",
        },
      },
      {
        label: { es: "Imágenes generadas con IA", en: "AI-generated images" },
        basico: 8,
        estandar: 8,
        premium: 25,
      },
      {
        label: {
          es: "Conexión con otros sistemas",
          en: "Connection to other systems",
        },
        basico: false,
        estandar: false,
        premium: { es: "Hasta 3 conexiones", en: "Up to 3 connections" },
      },
      {
        label: { es: "Soporte incluido", en: "Support included" },
        basico: { es: "1 mes", en: "1 month" },
        estandar: { es: "3 meses", en: "3 months" },
        premium: { es: "6 meses", en: "6 months" },
      },
      {
        label: { es: "Rondas de revisión", en: "Revision rounds" },
        basico: 2,
        estandar: 3,
        premium: 5,
      },
      {
        label: { es: "Garantía por fallas", en: "Warranty against faults" },
        basico: { es: "30 días", en: "30 days" },
        estandar: { es: "30 días", en: "30 days" },
        premium: { es: "30 días", en: "30 days" },
      },
      {
        label: { es: "Entrega del código fuente", en: "Source code delivery" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Plazo de entrega", en: "Delivery time" },
        basico: { es: "Entrega en 5 días", en: "Delivered in 5 days" },
        estandar: { es: "Entrega en 7 días", en: "Delivered in 7 days" },
        premium: { es: "Entrega en 10 días", en: "Delivered in 10 days" },
      },
    ],
    faq: [
      {
        pregunta: {
          es: "¿Puedo editar los textos yo mismo después?",
          en: "Can I edit the text myself afterwards?",
        },
        respuesta: {
          es: "Los cambios de textos e imágenes los hacemos nosotros durante el período de soporte incluido, en los tres planes: nos escribes y los aplicamos. El panel de administración del plan Premium es otra cosa: sirve para gestionar productos, usuarios e inventario desde una base de datos, no para reescribir las secciones de la página.",
          en: "We make the text and image changes for you during the included support period, on all three plans: you write to us and we apply them. The Premium plan's admin panel is a different thing: it manages products, users and inventory from a database, not the wording of your page sections.",
        },
      },
      {
        pregunta: {
          es: "¿Sirve para hacer publicidad en Google o Instagram?",
          en: "Does it work for advertising on Google or Instagram?",
        },
        respuesta: {
          es: "Sí, y es uno de sus usos principales: carga rápido, tiene una sola acción clara y el formulario te llega al correo. La dejamos preparada para que conectes las herramientas de medición de tus campañas; si prefieres que las instalemos y configuremos nosotros, dilo al cotizar y lo agregamos.",
          en: "Yes, and it's one of its main uses: it loads fast, it has a single clear action and the form reaches your inbox. We leave it ready for you to connect your campaign measurement tools; if you would rather we install and configure them, say so when you request the quote and we will add it.",
        },
      },
      {
        pregunta: {
          es: "¿Qué pasa si después quiero un sitio más grande?",
          en: "What if I want a bigger site later?",
        },
        respuesta: {
          es: "La landing se puede ampliar a un sitio multipágina reutilizando el diseño y el código. Descontamos lo ya invertido del valor del nuevo proyecto.",
          en: "The landing page can grow into a multi-page site reusing the design and code. We discount what you already invested from the new project's price.",
        },
      },
    ],
    planes: [
      {
        nivel: "basico",
        nombre: { es: "Básico", en: "Basic" },
        precio: 220000,
        precioHasta: null,
        precioEstimado: false,
        entregaDias: 5,
        entrega: { es: "Entrega en 5 días", en: "Delivered in 5 days" },
        revisiones: 2,
        soporteMeses: 1,
        resumen: {
          es: "Presencia profesional para validar tu negocio o sostener campañas. Sin costos mensuales obligatorios.",
          en: "A professional presence to validate your business or support ad campaigns. No mandatory monthly costs.",
        },
        bullets: {
          es: [
            "Posicionamiento en Google (SEO)",
            "Hasta 5 secciones a medida",
            "Adaptable a todo tipo de dispositivos",
            "Compra y configuración de dominio y hosting por 1 año",
            "Certificado SSL incluido",
            "1 cuenta de correo profesional",
          ],
          en: [
            "Positioning for Google (SEO)",
            "Up to 5 custom sections",
            "Works on every type of device",
            "Domain and hosting purchase and setup for 1 year",
            "SSL certificate included",
            "1 professional mailbox",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Formulario de contacto y botón de WhatsApp",
            "Textos e imágenes creados para ti (hasta 8 imágenes)",
            "1 mes de soporte gratis",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Contact form and WhatsApp button",
            "Copy and images created for you (up to 8 images)",
            "Complete design and development",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Sitio publicado y funcionando en tu dominio",
            "Cuenta de correo creada y probada",
            "Comprobante de que Google ya lo tiene indexado",
            "Informe de velocidad al momento de entregar",
            "Repositorio transferido a tu cuenta",
          ],
          en: [
            "Site published and running on your domain",
            "Mailbox created and tested",
            "Proof that Google has already indexed it",
            "Speed report at handover",
            "Repository transferred to your account",
          ],
        },
        badge: null,
        destacado: false,
      },
      {
        nivel: "estandar",
        nombre: { es: "Estándar", en: "Standard" },
        precio: 340000,
        precioHasta: null,
        precioEstimado: false,
        entregaDias: 7,
        entrega: { es: "Entrega en 7 días", en: "Delivered in 7 days" },
        revisiones: 3,
        soporteMeses: 3,
        resumen: {
          es: "Administras el contenido tú mismo, con correo propio y métricas para saber de dónde llegan tus visitas.",
          en: "You manage the content yourself, with your own email and metrics showing where your visitors come from.",
        },
        bullets: {
          es: [
            "Posicionamiento SEO en Google con estadísticas de visitas",
            "5 páginas internas",
            "Adaptable a todo tipo de dispositivos, con modo oscuro",
            "Compra y configuración de dominio y hosting por 1 año",
            "Certificado SSL incluido",
            "Múltiples cuentas de correo profesional",
          ],
          en: [
            "SEO positioning work with visit statistics",
            "5 inner pages",
            "Works on every type of device, with dark mode",
            "Domain and hosting purchase and setup for 1 year",
            "SSL certificate included",
            "Multiple professional email accounts",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Sitio en varios idiomas",
            "Textos e imágenes creados para ti (hasta 16 imágenes)",
            "3 meses de soporte incluidos",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Site in several languages",
            "Copy and images created for you (up to 16 images)",
            "3 months of support included",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Accesos al panel de contenido y sesión de uso grabada",
            "Casillas de correo creadas y probadas",
            "Estadísticas de visitas, con los accesos a tu nombre",
            "3 meses de soporte desde la publicación",
          ],
          en: [
            "Everything in Basic",
            "Content panel access and a recorded walkthrough",
            "Mailboxes created and tested",
            "Visit statistics, with access in your own name",
          ],
        },
        badge: { es: "Recomendado", en: "Recommended" },
        destacado: true,
      },
      {
        nivel: "premium",
        nombre: { es: "Premium", en: "Premium" },
        precio: 490000,
        precioHasta: null,
        precioEstimado: false,
        entregaDias: 10,
        entrega: { es: "Entrega en 10 días", en: "Delivered in 10 days" },
        revisiones: 5,
        soporteMeses: 6,
        resumen: {
          es: "La landing como canal de venta: blog para SEO de largo plazo y captura de leads a base de datos.",
          en: "The landing page as a sales channel: a blog for long-term SEO and lead capture into a database.",
        },
        bullets: {
          es: [
            "Posicionamiento SEO en Google con estadísticas de visitas",
            "Panel de administración (CRM): productos, usuarios e inventario",
            "Base de datos y servidor configurados para almacenar y gestionar",
            "Páginas internas sin límite",
            "Adaptable a todo tipo de dispositivos, con modo oscuro",
            "Múltiples cuentas de correo electrónico",
          ],
          en: [
            "SEO positioning work with visit statistics",
            "Admin panel (CRM): products, users and inventory",
            "Database and server set up to store and manage",
            "Unlimited inner pages",
            "Works on every type of device, with dark mode",
            "Multiple email accounts",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Certificado SSL incluido",
            "Compra y configuración de dominio y hosting por 1 año",
            "Sitio en varios idiomas",
            "Chatbot con IA que responde sobre tu contenido",
            "Hasta 25 imágenes creadas para ti",
            "6 meses de soporte incluidos",
            "Conexiones externas: pagos, reservas y correos automáticos",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "SSL certificate included",
            "Domain and hosting purchase and setup for 1 year",
            "Site in several languages",
            "AI chatbot that answers about your content",
            "Up to 25 images created for you",
            "6 months of support included",
            "External connections: payments, bookings and automated emails",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Todo lo del plan Estándar",
            "Panel de administración con base de datos y capacitación de uso",
            "Panel de leads capturados",
            "Informe al mes de cómo te encuentran en Google",
          ],
          en: [
            "Everything in Standard",
            "Admin panel with database, plus usage training",
            "Captured-leads dashboard",
            "A report one month later on how people find you on Google",
          ],
        },
        badge: null,
        destacado: false,
      },
    ],
    discovery: null,
    destacado: false,
    mantencion: {
      mensualDesde: 19900,
      tramos: [
        { meses: 1, precio: 0 },
        { meses: 3, precio: 54900 },
        { meses: 6, precio: 99900 },
        { meses: 12, precio: 189000 },
      ],
    },
    mantencionObligatoria: false,
  },

  // ─── Página Web Multipágina ────────────────────────────────────────────
  {
    id: "svc-multipagina",
    slug: "pagina-web-multipagina",
    icono: "multipagina",
    titulo: { es: "Página Web Multipágina", en: "Multi-page Website" },
    subtitulo: {
      es: "El sitio completo que tu empresa necesita",
      en: "The complete site your company needs",
    },
    pitch: {
      es: "Varias páginas, blog y panel propio para que administres el contenido tú.",
      en: "Several pages, a blog and your own panel so you manage the content yourself.",
    },
    descripcion: {
      es: "Un sitio multipágina es la presencia web completa de una empresa: inicio, quiénes somos, servicios, blog, contacto y todas las páginas que tu negocio necesite. El plan Premium suma un panel de administración con base de datos propia: ahí gestionas productos, usuarios, inventario y todo lo que tu negocio necesite registrar. Es la opción correcta cuando tu empresa tiene varios servicios que explicar, quiere posicionarse en Google con contenido propio, o simplemente necesita proyectar el tamaño real del negocio.",
      en: "A multi-page site is a company's complete web presence: home, about, services, blog, contact and every page your business needs. The Premium plan adds an admin panel with its own database: there you manage products, users, inventory and anything else your business needs to track. It's the right choice when your company has several services to explain, wants to rank on Google with its own content, or simply needs to project the real size of the business.",
    },
    galeria: [
      {
        src: "/images/services/pagina-web-multipagina/1-hero.svg",
        alt: {
          es: "Portada de una constructora con el menú de todas sus páginas y sus cifras de trayectoria",
          en: "Home page of a construction firm with the menu of all its pages and its track-record figures",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/pagina-web-multipagina/2-secciones.svg",
        alt: {
          es: "Página de servicios con una tarjeta por cada tipo de obra y sus migas de pan",
          en: "Services page with one card per type of work, plus breadcrumbs",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/pagina-web-multipagina/3-panel.svg",
        alt: {
          es: "Panel de administración con la lista de páginas del sitio, su estado y la última edición",
          en: "Admin panel listing the site's pages, their status and the last edit",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/pagina-web-multipagina/4-movil.svg",
        alt: {
          es: "El sitio en el celular, con el menú desplegado y los selectores de idioma y de tema",
          en: "The site on a phone, with the menu open and the language and theme switches",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/pagina-web-multipagina/5-formulario.svg",
        alt: {
          es: "Página de contacto con mapa, dirección y formulario para cotizar una obra",
          en: "Contact page with a map, the address and a form to request a quote",
        },
        ancho: 1200,
        alto: 800,
      },
    ],
    acercaDe: {
      titular: {
        es: "¿Tu empresa necesita un sitio web completo que explique todo lo que hace?",
        en: "Does your company need a complete website that explains everything it does?",
      },
      parrafos: {
        es: [
          "Una sola página se queda corta cuando tienes varias líneas de negocio que explicar.",
          "Construimos sitios corporativos en React 19 y Next.js 16, con panel de administración propio para que publiques contenido sin depender de nadie ni pagar por cada cambio.",
          "Cada página se piensa para una intención de búsqueda distinta, que es lo que hace que Google entienda tu empresa y la muestre a quien la busca.",
        ],
        en: [
          "A single page falls short when you have several business lines to explain.",
          "We build corporate sites on React 19 and Next.js 16, with their own admin panel so you publish content without depending on anyone or paying for every change.",
          "Each page is designed around a different search intent, which is what makes Google understand your company and show it to the people looking for it.",
        ],
      },
      listaTitulo: {
        es: "Lo que vas a recibir",
        en: "What you will get",
      },
      lista: {
        es: [
          "Las páginas que tu empresa necesita, ordenadas con criterio",
          "Un diseño parejo en todo el sitio",
          "Preparado para que Google encuentre cada página, no solo la portada",
          "Formularios de contacto donde corresponde",
          "Tu dominio y la conexión segura ya configurados",
          "Cuentas de correo con tu dominio",
          "Panel con base de datos para gestionar productos, usuarios e inventario (Premium)",
          "Blog para atraer visitas con contenido propio (desde Estándar)",
          "Versión en inglés si tu mercado lo pide",
          "El código es tuyo: no quedas amarrado a nadie",
        ],
        en: [
          "The pages your company needs, ordered with a plan",
          "One consistent design across the whole site",
          "Set up so Google finds every page, not just the home page",
          "Contact forms on the pages where they belong",
          "Your domain and secure connection already set up",
          "Mailboxes on your own domain",
          "A panel with a database to manage products, users and inventory (Premium)",
          "A blog to bring in visits with your own content (from Standard)",
          "An English version if your market needs it",
          "The code is yours: you are not tied to anyone",
        ],
      },
    },
    idealPara: {
      es: [
        "Empresas con varios servicios o líneas de negocio",
        "Negocios que quieren posicionarse en Google con un blog",
        "Estudios profesionales, consultoras y constructoras",
        "Instituciones educativas y organizaciones",
        "Cualquier empresa que hoy no tiene sitio web propio",
      ],
      en: [
        "Companies with several services or business lines",
        "Businesses that want to rank on Google with a blog",
        "Professional firms, consultancies and construction companies",
        "Educational institutions and organizations",
        "Any company without its own website today",
      ],
    },
    tecnologias: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Base de datos",
      "Vercel",
    ],
    proceso: [
      {
        titulo: { es: "Arquitectura del sitio", en: "Site architecture" },
        descripcion: {
          es: "Definimos qué páginas existirán, cómo se enlazan entre sí y qué contenido lleva cada una.",
          en: "We define which pages will exist, how they link to each other and what content each one carries.",
        },
      },
      {
        titulo: { es: "Diseño del sistema visual", en: "Visual system design" },
        descripcion: {
          es: "Creamos el diseño de las páginas clave y el sistema que mantiene todo coherente.",
          en: "We design the key pages and the system that keeps everything consistent.",
        },
      },
      {
        titulo: {
          es: "Desarrollo y carga de contenido",
          en: "Development and content loading",
        },
        descripcion: {
          es: "Programamos el sitio, montamos el panel de administración y cargamos tu contenido inicial.",
          en: "We build the site, set up the admin panel and load your initial content.",
        },
      },
      {
        titulo: { es: "Capacitación y publicación", en: "Training and launch" },
        descripcion: {
          es: "Te enseñamos a usar el panel, configuramos dominio y analítica, y publicamos.",
          en: "We teach you to use the panel, configure domain and analytics, and publish.",
        },
      },
    ],
    comparativa: [
      {
        label: { es: "Páginas", en: "Pages" },
        basico: { es: "Hasta 5", en: "Up to 5" },
        estandar: { es: "Hasta 10", en: "Up to 10" },
        premium: { es: "Sin límite", en: "Unlimited" },
      },
      {
        label: { es: "Diseño", en: "Design" },
        basico: { es: "A medida", en: "Custom" },
        estandar: { es: "A medida", en: "Custom" },
        premium: { es: "A medida", en: "Custom" },
      },
      {
        label: { es: "Adaptable desde 360px", en: "Responsive from 360px" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Formularios de contacto", en: "Contact forms" },
        basico: { es: "1, a tu correo", en: "1, to your inbox" },
        estandar: { es: "1, a tu correo", en: "1, to your inbox" },
        premium: { es: "Sin límite", en: "Unlimited" },
      },
      {
        label: { es: "Botón de WhatsApp", en: "WhatsApp button" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "Dominio 1 año a tu nombre",
          en: "Domain for 1 year in your name",
        },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "SSL y publicación", en: "SSL and launch" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Preparado para Google", en: "Set up for Google" },
        basico: true,
        estandar: true,
        premium: {
          es: "Con seguimiento de conversiones",
          en: "With conversion tracking",
        },
      },
      {
        label: { es: "Estadísticas de visitas", en: "Visit statistics" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "Registro del sitio en Google",
          en: "Site registered with Google",
        },
        basico: true,
        estandar: true,
        premium: { es: "Con reporte mensual", en: "With monthly report" },
      },
      {
        label: {
          es: "Cuentas de correo profesional",
          en: "Professional mailboxes",
        },
        basico: 1,
        estandar: { es: "Hasta 3", en: "Up to 3" },
        premium: { es: "Múltiples", en: "Multiple" },
      },
      {
        label: {
          es: "Panel de administración (CRM)",
          en: "Admin panel (CRM)",
        },
        basico: false,
        estandar: false,
        premium: {
          es: "Productos, usuarios e inventario",
          en: "Products, users and inventory",
        },
      },
      {
        label: {
          es: "Base de datos y servidor",
          en: "Database and server",
        },
        basico: false,
        estandar: false,
        premium: {
          es: "Configurados y a tu nombre",
          en: "Set up and in your name",
        },
      },
      {
        label: { es: "Blog propio", en: "Your own blog" },
        basico: false,
        estandar: false,
        premium: true,
      },
      {
        label: { es: "Multi-idioma", en: "Multi-language" },
        basico: false,
        estandar: { es: "Varios idiomas", en: "Several languages" },
        premium: { es: "Varios idiomas", en: "Several languages" },
      },
      {
        label: { es: "Modo claro y oscuro", en: "Light and dark mode" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Chatbot", en: "Chatbot" },
        basico: false,
        estandar: false,
        premium: {
          es: "Con IA sobre tu contenido",
          en: "AI over your content",
        },
      },
      {
        label: { es: "Imágenes generadas con IA", en: "AI-generated images" },
        basico: 8,
        estandar: 15,
        premium: 25,
      },
      {
        label: { es: "Soporte incluido", en: "Support included" },
        basico: { es: "1 mes", en: "1 month" },
        estandar: { es: "3 meses", en: "3 months" },
        premium: { es: "6 meses", en: "6 months" },
      },
      {
        label: { es: "Rondas de revisión", en: "Revision rounds" },
        basico: 3,
        estandar: 4,
        premium: 6,
      },
      {
        label: { es: "Garantía por fallas", en: "Warranty against faults" },
        basico: { es: "30 días", en: "30 days" },
        estandar: { es: "30 días", en: "30 days" },
        premium: { es: "30 días", en: "30 days" },
      },
      {
        label: { es: "Entrega del código fuente", en: "Source code delivery" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Plazo de entrega", en: "Delivery time" },
        basico: { es: "Entrega en 10 días", en: "Delivered in 10 days" },
        estandar: { es: "Entrega en 12 días", en: "Delivered in 12 days" },
        premium: { es: "Entrega en 14 días", en: "Delivered in 14 days" },
      },
    ],
    faq: [
      {
        pregunta: {
          es: "¿Puedo agregar páginas nuevas después?",
          en: "Can I add new pages later?",
        },
        respuesta: {
          es: "Sí. Las páginas nuevas las desarrollamos nosotros reutilizando el diseño ya hecho, así que salen bastante más baratas que las del proyecto inicial. Si estás dentro del período de soporte o de mantención, las páginas sencillas entran ahí; una con estructura totalmente distinta se cotiza como trabajo adicional.",
          en: "Yes. We build the new pages reusing the design already made, so they cost considerably less than those in the original project. If you are within the support or maintenance period, simple pages are covered there; one with a completely different structure is quoted as additional work.",
        },
      },
      {
        pregunta: {
          es: "¿El blog realmente sirve para aparecer en Google?",
          en: "Does the blog really help me show up on Google?",
        },
        respuesta: {
          es: "Sí, es una de las formas más efectivas, pero requiere constancia: publicar contenido útil de forma regular. El blog viene en el plan Premium. Nosotros dejamos la base técnica correcta y te orientamos sobre qué temas escribir; los resultados suelen verse entre el tercer y el sexto mes, y dependen de cuánto publiques.",
          en: "Yes, it's one of the most effective ways, but it requires consistency: publishing useful content regularly. The blog comes with the Premium plan. We leave the correct technical foundation and guide you on what topics to write; results usually appear between the third and sixth month, and depend on how much you publish.",
        },
      },
      {
        pregunta: {
          es: "¿Qué pasa si mi empresa crece y necesito más?",
          en: "What if my company grows and I need more?",
        },
        respuesta: {
          es: "El sitio está construido para crecer. Se le puede sumar un portal de clientes, integración con un CRM o una tienda en línea sin rehacer lo existente.",
          en: "The site is built to grow. You can add a client portal, CRM integration or an online store without rebuilding what already exists.",
        },
      },
    ],
    planes: [
      {
        nivel: "basico",
        nombre: { es: "Básico", en: "Basic" },
        precio: 420000,
        precioHasta: null,
        precioEstimado: false,
        entregaDias: 10,
        entrega: { es: "Entrega en 10 días", en: "Delivered in 10 days" },
        revisiones: 3,
        soporteMeses: 1,
        resumen: {
          es: "El sitio corporativo que tu empresa necesita para ser encontrada y tomada en serio.",
          en: "The corporate site your company needs to be found and taken seriously.",
        },
        bullets: {
          es: [
            "Posicionamiento en Google (SEO)",
            "Hasta 5 páginas a medida",
            "Adaptable a todo tipo de dispositivos",
            "Compra y configuración de dominio y hosting por 1 año",
            "Certificado SSL incluido",
            "1 cuenta de correo profesional",
          ],
          en: [
            "Positioning for Google (SEO)",
            "Up to 5 custom pages",
            "Works on every type of device",
            "Domain and hosting purchase and setup for 1 year",
            "SSL certificate included",
            "1 professional mailbox",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Formulario de contacto y botón de WhatsApp",
            "Textos e imágenes creados para ti (hasta 8 imágenes)",
            "1 mes de soporte gratis",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Contact form and WhatsApp button",
            "Copy and images created for you (up to 8 images)",
            "1 month of free support",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Sitio publicado y funcionando en tu dominio",
            "Comprobante de que Google ya lo tiene indexado",
            "Casillas de correo creadas y probadas",
            "Repositorio transferido a tu cuenta",
          ],
          en: [
            "Site published and running on your domain",
            "Proof that Google has already indexed it",
            "Mailboxes created and tested",
            "Repository transferred to your account",
          ],
        },
        badge: null,
        destacado: false,
      },
      {
        nivel: "estandar",
        nombre: { es: "Estándar", en: "Standard" },
        precio: 590000,
        precioHasta: null,
        precioEstimado: false,
        entregaDias: 12,
        entrega: { es: "Entrega en 12 días", en: "Delivered in 12 days" },
        revisiones: 4,
        soporteMeses: 3,
        resumen: {
          es: "Sitio administrable con blog: publicas tú, en dos idiomas, y mides lo que pasa.",
          en: "A manageable site with a blog: you publish it yourself, in two languages, and measure what happens.",
        },
        bullets: {
          es: [
            "Posicionamiento SEO en Google con estadísticas de visitas",
            "Hasta 10 páginas a medida",
            "Adaptable a todo tipo de dispositivos, con modo oscuro",
            "Compra y configuración de dominio y hosting por 1 año",
            "Certificado SSL incluido",
            "Múltiples cuentas de correo profesional",
          ],
          en: [
            "SEO positioning work with visit statistics",
            "Up to 10 custom pages",
            "Works on every type of device, with dark mode",
            "Domain and hosting purchase and setup for 1 year",
            "SSL certificate included",
            "Multiple professional email accounts",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Todo lo del plan Básico",
            "Sitio en varios idiomas",
            "Textos e imágenes creados para ti (hasta 15 imágenes)",
            "3 meses de soporte incluidos",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Everything in Basic",
            "Site in several languages",
            "Copy and images created for you (up to 15 images)",
            "3 months of support included",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Todo lo del plan Básico",
            "Panel de administración con accesos y capacitación grabada",
            "Blog publicado con contenido de ejemplo",
            "Estadísticas de visitas, con los accesos a tu nombre",
          ],
          en: [
            "Everything in Basic",
            "Admin panel access plus recorded training",
            "Blog published with sample content",
            "Visit statistics, with access in your own name",
          ],
        },
        badge: { es: "Recomendado", en: "Recommended" },
        destacado: true,
      },
      {
        nivel: "premium",
        nombre: { es: "Premium", en: "Premium" },
        precio: 790000,
        precioHasta: null,
        precioEstimado: false,
        entregaDias: 14,
        entrega: { es: "Entrega en 14 días", en: "Delivered in 14 days" },
        revisiones: 6,
        soporteMeses: 6,
        resumen: {
          es: "Arquitectura de contenidos, roles de usuario e integraciones: el sitio como sistema, no como folleto.",
          en: "Content architecture, user roles and integrations: the site as a system, not a brochure.",
        },
        bullets: {
          es: [
            "Posicionamiento SEO en Google con estadísticas de visitas",
            "Panel de administración (CRM): productos, usuarios e inventario",
            "Base de datos y servidor configurados para almacenar y gestionar",
            "Páginas sin límite",
            "Adaptable a todo tipo de dispositivos, con modo oscuro",
            "Múltiples cuentas de correo electrónico",
          ],
          en: [
            "SEO positioning work with visit statistics",
            "Admin panel (CRM): products, users and inventory",
            "Database and server set up to store and manage",
            "Unlimited pages",
            "Works on every type of device, with dark mode",
            "Multiple email accounts",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Certificado SSL incluido",
            "Compra y configuración de dominio y hosting por 1 año",
            "Sitio en varios idiomas",
            "Blog propio para publicar cuando quieras",
            "Chatbot con IA que responde sobre tu contenido",
            "Hasta 25 imágenes creadas para ti",
            "6 meses de soporte incluidos",
            "Conexiones externas: pagos, reservas y correos automáticos",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "SSL certificate included",
            "Domain and hosting purchase and setup for 1 year",
            "Site in several languages",
            "Your own blog to publish whenever you want",
            "AI chatbot that answers about your content",
            "Up to 25 images created for you",
            "6 months of support included",
            "External connections: payments, bookings and automated emails",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Todo lo del plan Estándar",
            "Panel de administración con roles y base de datos configurados",
            "Panel de leads y dashboard de métricas",
            "Documentación e integraciones probadas",
          ],
          en: [
            "Everything in Standard",
            "Admin panel with roles and database configured",
            "Leads panel and metrics dashboard",
            "Documentation and tested integrations",
          ],
        },
        badge: null,
        destacado: false,
      },
    ],
    discovery: null,
    destacado: true,
    mantencion: {
      mensualDesde: 39900,
      tramos: [
        { meses: 1, precio: 0 },
        { meses: 3, precio: 109900 },
        { meses: 6, precio: 199900 },
        { meses: 12, precio: 379000 },
      ],
    },
    mantencionObligatoria: false,
  },

  // ─── CRM ───────────────────────────────────────────────────────────────
  {
    id: "svc-crm",
    slug: "crm-personalizado",
    icono: "crm",
    titulo: { es: "CRM Personalizado", en: "Custom CRM" },
    subtitulo: {
      es: "Ordena tus clientes, tus ventas y tu soporte",
      en: "Organize your clients, your sales and your support",
    },
    pitch: {
      es: "Un sistema hecho a la medida de cómo trabajas, no al revés.",
      en: "A system built around how you work, not the other way around.",
    },
    descripcion: {
      es: "Un CRM es el sistema donde vive toda la relación con tus clientes: quién te contactó, en qué etapa está cada negocio, qué se conversó y qué falta por hacer. A diferencia de un CRM genérico que te obliga a adaptar tu operación al software, aquí construimos el sistema alrededor de cómo tu equipo ya trabaja. Se acaban las planillas paralelas, los seguimientos que se pierden y las respuestas que nadie recuerda haber dado.",
      en: "A CRM is where your entire client relationship lives: who contacted you, what stage each deal is in, what was discussed and what's left to do. Unlike a generic CRM that forces you to adapt your operation to the software, here we build the system around how your team already works. No more parallel spreadsheets, lost follow-ups or replies nobody remembers giving.",
    },
    galeria: [
      {
        src: "/images/services/crm-personalizado/1-panel.svg",
        alt: {
          es: "Resumen del CRM con los indicadores del mes, las ventas por mes y las tareas del día",
          en: "CRM overview with the month's indicators, sales per month and today's tasks",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/crm-personalizado/2-secciones.svg",
        alt: {
          es: "Tablero de oportunidades por etapa, con el monto de cada negocio",
          en: "Deal board by stage, showing the amount of each opportunity",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/crm-personalizado/3-formulario.svg",
        alt: {
          es: "Ficha de un cliente con sus datos, el historial de cada acción y sus cotizaciones",
          en: "Client record with their details, the history of every action and their quotes",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/crm-personalizado/4-movil.svg",
        alt: {
          es: "El CRM en el celular para el equipo en terreno, junto a los permisos por rol",
          en: "The CRM on a phone for the team in the field, alongside the per-role permissions",
        },
        ancho: 1200,
        alto: 800,
      },
      {
        src: "/images/services/crm-personalizado/5-hero.svg",
        alt: {
          es: "Pantalla de acceso al sistema, con el código fuente y la base de datos a nombre del cliente",
          en: "System sign-in screen, with the source code and database in the client's name",
        },
        ancho: 1200,
        alto: 800,
      },
    ],
    acercaDe: {
      titular: {
        es: "¿Sigues administrando tus clientes en planillas que nadie actualiza?",
        en: "Still managing your clients in spreadsheets that nobody keeps up to date?",
      },
      parrafos: {
        es: [
          "El problema no es la planilla: es que cada persona tiene la suya.",
          "Desarrollamos sistemas CRM a medida en React 19, Next.js 16 y PostgreSQL, diseñados alrededor de cómo trabaja tu equipo hoy, no al revés.",
          "Si tu proceso calza con un CRM genérico te lo vamos a decir derechamente. Un sistema a medida se justifica cuando tu operación tiene particularidades que el software estándar no cubre, cuando el costo por usuario se vuelve caro con el tiempo, o cuando necesitas integrarlo con sistemas propios.",
        ],
        en: [
          "The problem is not the spreadsheet: it is that everyone has their own.",
          "We build custom CRM systems on React 19, Next.js 16 and PostgreSQL, designed around how your team already works, not the other way around.",
          "If your process fits a generic CRM we will tell you straight. A custom system is justified when your operation has specifics the standard software does not cover, when the per-user cost gets expensive over time, or when you need to integrate it with your own systems.",
        ],
      },
      listaTitulo: {
        es: "Lo que vas a recibir",
        en: "What you will get",
      },
      lista: {
        es: [
          "Conversamos cómo trabaja tu equipo antes de programar nada",
          "Tus clientes, empresas y negocios en un solo lugar",
          "Un tablero de ventas con las etapas que tú definas",
          "Tickets de soporte con responsable y plazo",
          "Recordatorios automáticos para que nada se te pase",
          "Conectado a tu correo y a WhatsApp",
          "Cada persona ve solo lo que le corresponde",
          "Traemos tus planillas actuales y limpiamos los duplicados",
          "Funciona en el celular para el equipo en terreno",
          "Datos cifrados y tratados conforme a la Ley 21.719",
        ],
        en: [
          "We talk through how your team works before writing any code",
          "Your clients, companies and deals in one place",
          "A sales board with the stages you define",
          "Support tickets with an owner and a deadline",
          "Automatic reminders so nothing slips",
          "Connected to your email and WhatsApp",
          "Each person only sees what concerns them",
          "We bring in your current spreadsheets and clean the duplicates",
          "Works on the phone for the team in the field",
          "Encrypted data, handled under Law 21.719",
        ],
      },
    },
    idealPara: {
      es: [
        "Equipos de venta que hoy trabajan con planillas Excel",
        "Empresas de servicios con seguimiento de clientes",
        "Negocios que reciben consultas por varios canales",
        "Equipos de soporte que necesitan tickets ordenados",
        "Empresas que ya probaron un CRM genérico y no les calzó",
      ],
      en: [
        "Sales teams currently working with Excel spreadsheets",
        "Service companies with client follow-up",
        "Businesses receiving inquiries through several channels",
        "Support teams that need organized tickets",
        "Companies that tried a generic CRM and it didn't fit",
      ],
    },
    tecnologias: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    proceso: [
      {
        titulo: { es: "Levantamiento del proceso", en: "Process discovery" },
        descripcion: {
          es: "Mapeamos cómo trabaja hoy tu equipo: etapas, responsables, datos que necesitan y dónde se pierde información.",
          en: "We map how your team works today: stages, owners, the data they need and where information gets lost.",
        },
      },
      {
        titulo: { es: "Diseño del sistema", en: "System design" },
        descripcion: {
          es: "Definimos las pantallas, los campos y los permisos por rol. Lo revisas antes de que escribamos código.",
          en: "We define screens, fields and role permissions. You review it before we write any code.",
        },
      },
      {
        titulo: { es: "Desarrollo por etapas", en: "Staged development" },
        descripcion: {
          es: "Construimos por módulos y te mostramos avances funcionando, para corregir temprano y no al final.",
          en: "We build module by module and show you working progress, so we correct early instead of at the end.",
        },
      },
      {
        titulo: {
          es: "Migración y puesta en marcha",
          en: "Migration and go-live",
        },
        descripcion: {
          es: "Traemos tus datos actuales, capacitamos al equipo y acompañamos las primeras semanas de uso real.",
          en: "We bring in your current data, train the team and support the first weeks of real usage.",
        },
      },
    ],
    comparativa: [
      {
        label: { es: "Autenticación y roles", en: "Authentication and roles" },
        basico: true,
        estandar: true,
        premium: { es: "Permisos por recurso", en: "Per-resource permissions" },
      },
      {
        label: { es: "Contactos y empresas", en: "Contacts and companies" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Pipeline de oportunidades", en: "Deal pipeline" },
        basico: { es: "Configurable", en: "Configurable" },
        estandar: { es: "Configurable", en: "Configurable" },
        premium: { es: "Configurable", en: "Configurable" },
      },
      {
        label: {
          es: "Tareas, notas e historial",
          en: "Tasks, notes and history",
        },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Importación desde CSV", en: "CSV import" },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Reportes", en: "Reports" },
        basico: { es: "Básicos", en: "Basic" },
        estandar: { es: "Dashboards por rol", en: "Dashboards per role" },
        premium: {
          es: "Reportes a la medida de tu negocio",
          en: "Reports tailored to your business",
        },
      },
      {
        label: { es: "Automatizaciones de flujo", en: "Workflow automations" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "Avisos por correo y WhatsApp",
          en: "Email and WhatsApp alerts",
        },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Cotizador interno", en: "Internal quoting tool" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Gestión documental", en: "Document management" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "Se conecta con otros sistemas",
          en: "Connects to other systems",
        },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Auditoría de acciones", en: "Action audit log" },
        basico: false,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "Varias empresas en un sistema",
          en: "Several companies in one system",
        },
        basico: false,
        estandar: false,
        premium: true,
      },
      {
        label: { es: "Integraciones externas", en: "External integrations" },
        basico: false,
        estandar: false,
        premium: {
          es: "SII, ERP, pagos y agenda",
          en: "Tax authority, ERP, payments, scheduling",
        },
      },
      {
        label: {
          es: "Copia de prueba para revisar cambios antes de publicarlos",
          en: "A test copy to review changes before publishing them",
        },
        basico: false,
        estandar: false,
        premium: true,
      },
      {
        label: {
          es: "Compromiso escrito de disponibilidad",
          en: "Written uptime commitment",
        },
        basico: false,
        estandar: false,
        premium: true,
      },
      {
        label: {
          es: "Código fuente y esquema en cada hito",
          en: "Source code and schema at every milestone",
        },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: {
          es: "Mantención obligatoria desde producción",
          en: "Mandatory maintenance from go-live",
        },
        basico: true,
        estandar: true,
        premium: true,
      },
      {
        label: { es: "Plazo de entrega", en: "Delivery time" },
        basico: { es: "Entrega en 2 semanas", en: "Delivered in 2 weeks" },
        estandar: { es: "Entrega en 4 a 5 semanas", en: "Delivered in 4 to 5 weeks" },
        premium: { es: "Entrega en 6 a 8 semanas", en: "Delivered in 6 to 8 weeks" },
      },
    ],
    faq: [
      {
        pregunta: {
          es: "¿Por qué no usar un CRM genérico como HubSpot?",
          en: "Why not use a generic CRM like HubSpot?",
        },
        respuesta: {
          es: "Si tu proceso calza con lo que ofrecen, un CRM genérico es una buena opción y te lo diremos honestamente. Un CRM a medida se justifica cuando tu operación tiene particularidades que el software estándar no cubre, cuando el costo por usuario se vuelve alto con el tiempo, o cuando necesitas integrarlo con sistemas propios.",
          en: "If your process fits what they offer, a generic CRM is a good option and we'll tell you so honestly. A custom CRM makes sense when your operation has specifics the standard software doesn't cover, when the per-user cost becomes high over time, or when you need to integrate it with your own systems.",
        },
      },
      {
        pregunta: {
          es: "¿Pueden migrar los datos que tengo en Excel?",
          en: "Can you migrate the data I have in Excel?",
        },
        respuesta: {
          es: "Sí. La importación de tus datos viene desde el plan Básico: exportas tus planillas a CSV, revisamos el contenido, limpiamos duplicados y cargamos la información al sistema antes de la puesta en marcha.",
          en: "Yes. Importing your data is included from the Basic plan: you export your spreadsheets to CSV, we review the content, clean duplicates and load the information into the system before go-live.",
        },
      },
      {
        pregunta: {
          es: "¿Dónde quedan alojados los datos de mis clientes?",
          en: "Where is my clients' data hosted?",
        },
        respuesta: {
          es: "En servidores con cifrado en tránsito y en reposo, con copias de seguridad automáticas. Puedes elegir la región de alojamiento. Configuramos el sistema considerando la Ley 21.719 de protección de datos, vigente en Chile desde diciembre de 2026.",
          en: "On servers with encryption in transit and at rest, with automatic backups. You can choose the hosting region. We configure the system taking into account Law 21.719 on data protection, in force in Chile from December 2026.",
        },
      },
      {
        pregunta: {
          es: "¿Por qué el precio es un rango y no un valor fijo?",
          en: "Why is the price a range instead of a fixed amount?",
        },
        respuesta: {
          es: "Porque cerrar el precio de un CRM sin conocer tu operación es la forma más rápida de reventar el presupuesto, el tuyo o el nuestro. Por eso partimos con un levantamiento pagado, que se descuenta del valor del proyecto: de ahí sale el alcance por escrito y recién ahí el precio deja de ser un rango. En los servicios web, en cambio, el precio es cerrado desde el principio.",
          en: "Because pinning down the price of a CRM without knowing your operation is the fastest way to blow the budget, yours or ours. That is why we start with a paid discovery phase, which is deducted from the project price: it produces the scope in writing, and only then does the price stop being a range. On the web services, by contrast, the price is fixed from the start.",
        },
      },
    ],
    planes: [
      {
        nivel: "basico",
        nombre: { es: "Básico (MVP)", en: "Basic (MVP)" },
        precio: 1200000,
        precioHasta: 1800000,
        precioEstimado: true,
        entregaDias: 14,
        entrega: { es: "Entrega en 2 semanas", en: "Delivered in 2 weeks" },
        revisiones: 4,
        soporteMeses: 1,
        resumen: {
          es: "El núcleo operativo: contactos, oportunidades y tareas en un solo lugar, con tus roles.",
          en: "The operational core: contacts, deals and tasks in one place, with your own roles.",
        },
        bullets: {
          es: [
            "Autenticación y roles de usuario",
            "Pipeline de oportunidades configurable",
            "Adaptable a todo tipo de dispositivos",
            "Importación de tus datos desde CSV",
            "Código fuente y base de datos a tu nombre",
            "Capacitación de uso grabada",
          ],
          en: [
            "Authentication and user roles",
            "Configurable deal pipeline",
            "Works on every type of device",
            "Import of your data from CSV",
            "Source code and database in your name",
            "Recorded usage training",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Compra y configuración de dominio y hosting por 1 año",
            "Contactos y empresas",
            "Tareas y recordatorios",
            "Notas e historial de cada cliente",
            "Reportes básicos",
            "Tu base de datos documentada en cada entrega",
            "30 días de garantía por fallas",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Domain and hosting purchase and setup for 1 year",
            "Contacts and companies",
            "Tasks and reminders",
            "Notes and history for each client",
            "Basic reports",
            "Your database documented at every delivery",
            "30-day warranty against faults",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Sistema en producción con tus usuarios creados",
            "Esquema de base de datos documentado",
            "Repositorio transferido a tu cuenta",
            "Capacitación de uso grabada",
          ],
          en: [
            "System in production with your users created",
            "Documented database schema",
            "Repository transferred to your account",
            "Recorded usage training",
          ],
        },
        badge: null,
        destacado: false,
      },
      {
        nivel: "estandar",
        nombre: { es: "Estándar", en: "Standard" },
        precio: 1900000,
        precioHasta: 2600000,
        precioEstimado: true,
        entregaDias: 35,
        entrega: { es: "Entrega en 4 a 5 semanas", en: "Delivered in 4 to 5 weeks" },
        revisiones: 6,
        soporteMeses: 3,
        resumen: {
          es: "El CRM que trabaja solo: automatiza avisos, cotiza y deja registro de cada acción.",
          en: "The CRM that works on its own: automates alerts, quotes, and logs every action.",
        },
        bullets: {
          es: [
            "Automatizaciones de flujo de trabajo",
            "Avisos por correo y WhatsApp",
            "Adaptable a todo tipo de dispositivos",
            "Dashboards por rol y cotizador interno",
            "Se conecta con otros sistemas y registra quién hizo qué",
            "Gestión documental",
          ],
          en: [
            "Workflow automations",
            "Email and WhatsApp alerts",
            "Works on every type of device",
            "Dashboards per role and internal quoting",
            "Connects to other systems and logs who did what",
            "Document management",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Todo lo del plan Básico",
            "Avisos automáticos según lo que vaya pasando",
            "Permisos por rol en cada módulo",
            "Documentación para conectar otros sistemas",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Everything in Basic",
            "Automatic alerts based on what happens",
            "Per-role permissions on every module",
            "Documentation to connect other systems",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Todo lo del plan Básico",
            "Documentación para conectar otros sistemas",
            "Automatizaciones configuradas y probadas",
            "Dashboards por rol",
          ],
          en: [
            "Everything in Basic",
            "Documentation to connect other systems",
            "Automations configured and tested",
            "Dashboards per role",
          ],
        },
        badge: { es: "Recomendado", en: "Recommended" },
        destacado: true,
      },
      {
        nivel: "premium",
        nombre: { es: "Premium", en: "Premium" },
        precio: 3400000,
        precioHasta: null,
        precioEstimado: true,
        entregaDias: 56,
        entrega: { es: "Entrega en 6 a 8 semanas", en: "Delivered in 6 to 8 weeks" },
        revisiones: 8,
        soporteMeses: 6,
        resumen: {
          es: "Plataforma multi-empresa con integraciones al SII, ERP y pagos, y disponibilidad comprometida.",
          en: "A multi-company platform integrated with tax authority, ERP and payments, with committed uptime.",
        },
        bullets: {
          es: [
            "Varias empresas en un sistema, con permisos al detalle",
            "Integraciones con SII, ERP y pagos",
            "Adaptable a todo tipo de dispositivos",
            "Reportes a la medida de tu negocio",
            "Copia de prueba para revisar cambios antes de publicarlos",
            "Compromiso escrito de disponibilidad",
          ],
          en: [
            "Several companies in one system, with detailed permissions",
            "Integrations with tax authority, ERP and payments",
            "Works on every type of device",
            "Reports tailored to your business",
            "A test copy to review changes before publishing them",
            "Written uptime commitment",
          ],
        },
        incluye: {
          es: [
            "Diseño y desarrollo completo",
            "Todo lo del plan Estándar",
            "Permisos al detalle sobre cada dato",
            "Monitoreo de errores mientras está en uso",
            "Respuesta a fallas críticas según el acuerdo de servicio",
            "Conexiones externas: pagos, reservas y correos automáticos",
            "Código fuente",
          ],
          en: [
            "Complete design and development",
            "Everything in Standard",
            "Detailed permissions over each record",
            "Error monitoring while it is in use",
            "Critical-fault response under the service agreement",
            "External connections: payments, bookings and automated emails",
            "Source code",
          ],
        },
        entregables: {
          es: [
            "Todo lo del plan Estándar",
            "Copia de prueba para revisar cambios antes de publicarlos",
            "Integraciones probadas y funcionando",
            "Compromiso de disponibilidad firmado",
          ],
          en: [
            "Everything in Standard",
            "A test copy to review changes before publishing them",
            "Integrations tested and working",
            "Signed uptime commitment",
          ],
        },
        badge: null,
        destacado: false,
      },
    ],
    discovery: {
      precio: 250000,
      duracion: { es: "1 a 2 semanas", en: "1 to 2 weeks" },
      nota: {
        es: "Incluye mapa de procesos, backlog priorizado, modelo de datos, arquitectura y alcance cerrado por fase. El documento es tuyo aunque no contrates, y se descuenta del proyecto si contratas dentro de 30 días.",
        en: "Includes process map, prioritized backlog, data model, architecture and scope closed per phase. The document is yours even if you do not hire, and it is deducted from the project if you hire within 30 days.",
      },
    },
    destacado: false,
    mantencion: {
      mensualDesde: 190000,
      tramos: [
        { meses: 1, precio: 0 },
        { meses: 3, precio: null },
        { meses: 6, precio: null },
        { meses: 12, precio: null },
      ],
    },
    mantencionObligatoria: true,
  },
];

/** Validación en tiempo de import: si un mock deriva del schema, el build falla aquí */
export const serviciosMock = data.map((s) => ServicioSchema.parse(s));
