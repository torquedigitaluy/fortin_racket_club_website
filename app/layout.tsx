import type { Metadata } from "next";
import { Kanit, Mulish } from "next/font/google";
import "./globals.css";

// Kanit no es fuente variable → declarar pesos explícitos.
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

// Mulish sí es variable.
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fortín Racket Club",
  description:
    "Fortín Racket Club — club de tenis moderno. Reserva de canchas, entrenamientos personales, escuela infantil y torneos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${kanit.variable} ${mulish.variable}`}>
      <body>{children}</body>
    </html>
  );
}
