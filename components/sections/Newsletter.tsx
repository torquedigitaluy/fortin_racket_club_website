"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // TODO: conectar a un servicio de email / Supabase cuando esté disponible.
    setEnviado(true);
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden">
      {/* Fondo: raquetas cruzadas */}
      <Image
        src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay #142d4b al 75% */}
      <div className="absolute inset-0 bg-brand/75" />

      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center text-white md:py-20">
        <h2 className="font-kanit text-3xl font-bold md:text-4xl">
          Sumate a nuestro newsletter
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-mulish text-white/80">
          Recibí novedades, torneos y promociones exclusivas para la comunidad
          del club.
        </p>

        {enviado ? (
          <p className="mt-8 font-mulish font-semibold text-lime">
            ¡Gracias por suscribirte! Pronto tendrás noticias nuestras.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico"
              className="w-full rounded-full bg-white px-6 py-3.5 font-mulish text-sm text-brand outline-none ring-lime focus:ring-2"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-lime px-8 py-3.5 font-mulish text-sm font-semibold text-brand transition-transform hover:scale-105"
            >
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
