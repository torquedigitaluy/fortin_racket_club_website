"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, DollarSign } from "lucide-react";
import { startCheckout } from "@/lib/checkout";

// Horarios de 09:00 a 22:00 (último turno termina 23:00).
const HORAS = Array.from({ length: 14 }, (_, i) => 9 + i);

const CANCHAS = ["Cancha 1", "Cancha 2"] as const;
type Cancha = (typeof CANCHAS)[number];

const PRECIO_HORA = 999;

// Mock de horarios NO disponibles por cancha (luego vendrá de Supabase).
const NO_DISPONIBLES: Record<Cancha, number[]> = {
  "Cancha 1": [10, 13, 17, 20],
  "Cancha 2": [9, 12, 16, 19, 21],
};

function pad(h: number) {
  return h < 10 ? `0${h}` : `${h}`;
}

export default function ReservaCanchas() {
  const [cancha, setCancha] = useState<Cancha>("Cancha 1");
  const [loading, setLoading] = useState<number | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  async function reservar(hora: number) {
    setAviso(null);
    setLoading(hora);
    const status = await startCheckout({
      title: `Reserva ${cancha} ${pad(hora)}:00 — Fortín Racket Club`,
      price: PRECIO_HORA,
      reference: `reserva-${cancha.replace(" ", "").toLowerCase()}-${hora}`,
    });
    setLoading(null);

    if (status === "not_configured") {
      setAviso("La reserva con pago aún no está disponible. Mercado Pago se conectará pronto.");
    } else if (status === "error") {
      setAviso("Hubo un problema al iniciar la reserva. Intentá de nuevo.");
    }
  }

  return (
    <section id="reservas" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Encabezado */}
        <div className="mb-12 max-w-2xl">
          <span className="font-mulish text-sm font-semibold uppercase tracking-widest text-lime">
            Jugá hoy
          </span>
          <h2 className="mt-3 font-kanit text-3xl font-bold text-brand md:text-4xl">
            Reserva de canchas
          </h2>
          <p className="mt-4 font-mulish text-brand/70">
            Elegí tu cancha y horario. Reservá online y asegurá tu turno en
            segundos.
          </p>
        </div>

        {/* Fila superior: grid asimétrico (imagen + caja destacada) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Imagen lifestyle (2/3) */}
          <div className="relative h-72 overflow-hidden rounded-2xl lg:col-span-2 lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80"
              alt="Ambiente del club de tenis"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          {/* Caja #142d4b con horario y precio (1/3) */}
          <div className="flex flex-col justify-center gap-6 rounded-2xl bg-brand p-8 text-white">
            <div>
              <span className="flex items-center gap-2 font-mulish text-sm uppercase tracking-widest text-lime">
                <Clock className="h-4 w-4" /> Horarios
              </span>
              <p className="mt-2 font-kanit text-4xl font-bold">09:00 – 23:00</p>
              <p className="mt-1 font-mulish text-sm text-white/60">
                Todos los días
              </p>
            </div>
            <div className="h-px bg-white/15" />
            <div>
              <span className="flex items-center gap-2 font-mulish text-sm uppercase tracking-widest text-lime">
                <DollarSign className="h-4 w-4" /> Precio por hora
              </span>
              <p className="mt-2 font-kanit text-5xl font-bold">${PRECIO_HORA}</p>
            </div>
          </div>
        </div>

        {/* Fila inferior: reservar cancha (ancho completo) */}
        <div className="mt-8 rounded-2xl border border-brand/10 bg-offwhite p-6 md:p-8">
          {/* Selector de cancha */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-kanit text-xl font-bold text-brand">
              Elegí tu horario
            </h3>
            <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
              {CANCHAS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCancha(c)}
                  className={`rounded-full px-5 py-2 font-mulish text-sm font-semibold transition-colors ${
                    cancha === c
                      ? "bg-brand text-white"
                      : "text-brand/70 hover:text-brand"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de horarios */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {HORAS.map((h) => {
              const disponible = !NO_DISPONIBLES[cancha].includes(h);
              const cargando = loading === h;
              return (
                <button
                  key={h}
                  type="button"
                  disabled={!disponible || cargando}
                  onClick={() => reservar(h)}
                  className={`rounded-xl px-3 py-3 font-mulish text-sm font-semibold transition-all ${
                    disponible
                      ? "bg-brand text-white hover:scale-105 hover:bg-brand/90"
                      : "cursor-not-allowed bg-gray-200 text-gray-400 line-through"
                  } ${cargando ? "opacity-60" : ""}`}
                  aria-label={
                    disponible
                      ? `Reservar ${cancha} a las ${pad(h)}:00`
                      : `${pad(h)}:00 no disponible`
                  }
                >
                  {cargando ? "…" : `${pad(h)}:00`}
                </button>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="mt-6 flex flex-wrap items-center gap-6 font-mulish text-xs text-brand/60">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-brand" /> Disponible
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gray-200" /> No disponible
            </span>
          </div>

          {/* Aviso (no configurado / error) */}
          {aviso && (
            <p className="mt-6 font-mulish text-sm text-brand/70">{aviso}</p>
          )}
        </div>
      </div>
    </section>
  );
}
