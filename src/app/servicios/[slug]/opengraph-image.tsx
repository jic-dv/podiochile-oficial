import { ImageResponse } from "next/og";
import { getServicio, getSlugs, getPrecioDesde } from "@/features/services/api/services.service";

export const alt = "Servicio de Podio Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default async function ServicioOpengraphImage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const servicio = getServicio(slug);

  // La ruta ya devuelve 404 si el slug no existe; esto solo evita un throw
  // durante la generación de la imagen.
  const titulo = servicio?.titulo.es ?? "Podio Chile";
  const subtitulo = servicio?.subtitulo.es ?? "Diseño y desarrollo web";
  const desde = servicio ? CLP.format(getPrecioDesde(servicio)) : "";
  const planes = servicio?.planes.map((p) => p.nombre.es) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #171307 55%, #221a05 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #f5b301 0%, #22a578 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "linear-gradient(135deg, #f5b301 0%, #d99a00 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 25,
              fontWeight: 700,
              color: "#141105",
            }}
          >
            P
          </div>
          <div style={{ fontSize: 25, fontWeight: 600, color: "#b8b2a4" }}>Podio Chile</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            {titulo}
          </div>
          <div style={{ fontSize: 32, color: "#ffc233", marginTop: 20, maxWidth: 940 }}>
            {subtitulo}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {planes.map((p) => (
              <div
                key={p}
                style={{
                  fontSize: 22,
                  color: "#e8e4d8",
                  border: "1px solid #3a3222",
                  borderRadius: 999,
                  padding: "10px 22px",
                  background: "#191509",
                }}
              >
                {p}
              </div>
            ))}
          </div>

          {desde && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 20, color: "#b8b2a4" }}>Desde</div>
              <div style={{ fontSize: 46, fontWeight: 700, color: "#ffc233" }}>{desde}</div>
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
