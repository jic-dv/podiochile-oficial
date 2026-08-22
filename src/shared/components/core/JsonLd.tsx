/**
 * Serializa datos estructurados escapando `<` para que un valor de contenido
 * no pueda cerrar la etiqueta script e inyectar marcado.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
