import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul marca — color principal (acentos, botones, bloques destacados, overlays)
        brand: {
          DEFAULT: "#142d4b",
          dark: "#0d1d30", // sub-footer
        },
        // Off-white — fondos de secciones claras
        offwhite: "#f7f7f7",
        // Verde lima — CTAs y acentos secundarios
        lime: {
          DEFAULT: "#93d419",
        },
        // Marrón arcilla de tenis — secciones específicas (banner CTA polvo de ladrillo)
        clay: {
          DEFAULT: "#b5563a",
        },
      },
      fontFamily: {
        // Títulos
        kanit: ["var(--font-kanit)", "sans-serif"],
        // Bloques de texto
        mulish: ["var(--font-mulish)", "sans-serif"],
      },
      keyframes: {
        // Carrusel infinito: la pista tiene el contenido duplicado, por eso
        // se desplaza -50% (un ciclo exacto) y reinicia sin salto.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
