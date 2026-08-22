export const THEME_STORAGE_KEY = "podio-theme";
export const LOCALE_STORAGE_KEY = "podio-locale";

/**
 * Se inyecta en <head> y corre antes del primer paint. Restituye las tres
 * preferencias que viven fuera de React:
 *
 * 1. Tema guardado, para que no se vea el flash de tema claro cuando la
 *    preferencia es oscura.
 * 2. Idioma guardado en el atributo lang, que debe reflejar el contenido real
 *    para lectores de pantalla y para el motor de traducción del navegador.
 * 3. La clase `js`. El estado inicial oculto del revelado por scroll cuelga de
 *    ella, así que si el JavaScript no se ejecuta el contenido se muestra
 *    normalmente en lugar de quedar invisible en opacity: 0.
 */
export const initScript = `
(function(){
  var d = document.documentElement;
  d.classList.add("js");
  // El navegador restaura la posición de scroll al navegar, y con el pie del
  // home a 5000px eso hacía que las páginas legales abrieran por el final.
  // El router ya se encarga de dejar cada ruta donde corresponde.
  try { history.scrollRestoration = "manual"; } catch (e) {}
  try {
    var theme = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (theme !== "dark" && theme !== "light") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    d.setAttribute("data-theme", theme);

    if (localStorage.getItem("${LOCALE_STORAGE_KEY}") === "en") d.lang = "en";
  } catch (e) {
    d.setAttribute("data-theme", "light");
  }
})();
`.trim();
