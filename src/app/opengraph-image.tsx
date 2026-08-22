import { ImageResponse } from "next/og";
import { LOGO_ICONO_DATA_URI } from "@/shared/lib/ogLogo";

export const alt = "Podio Chile - Páginas y aplicaciones web para empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        {/* Barra firma: el mismo gradiente índigo -> esmeralda de las tarjetas */}
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

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/image
              no corre dentro de next/og; esta es la forma soportada */}
          <img src={LOGO_ICONO_DATA_URI} width={56} height={56} alt="" />
          <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>
            Podio Chile
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 940,
            }}
          >
            Tu presencia digital, profesional desde el primer día
          </div>
          <div style={{ fontSize: 28, color: "#b8b2a4", marginTop: 24, maxWidth: 900 }}>
            {"Landing pages, sitios multipágina y aplicaciones web a medida como CRM, para profesionales y empresas."}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Landing Page", "Página Web Multipágina", "CRM Personalizado"].map((s) => (
            <div
              key={s}
              style={{
                fontSize: 22,
                color: "#e8e4d8",
                border: "1px solid #3a3222",
                borderRadius: 999,
                padding: "10px 22px",
                background: "#191509",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
