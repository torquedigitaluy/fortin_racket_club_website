import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Clase = {
  numero: string;
  title: string;
  text: string;
  href: string;
};

const CLASES: Clase[] = [
  {
    numero: "01",
    title: "Clases individuales",
    text: "Atención uno a uno con un coach profesional. Plan a medida según tu nivel, ritmo y objetivos.",
    href: "#actividades",
  },
  {
    numero: "02",
    title: "Clases grupales",
    text: "Entrená en grupos reducidos, mejorá tu técnica y disfrutá la energía de jugar acompañado.",
    href: "#actividades",
  },
  {
    numero: "03",
    title: "Clases sociales",
    text: "Partidos y dinámicas distendidas para conocer gente, sumar horas de cancha y pasarla bien.",
    href: "#actividades",
  },
];

export default function ClasesPersonalizadas() {
  return (
    <section id="actividades" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Izquierda: imagen de tenista recortada */}
        <div className="relative h-80 lg:col-span-5 lg:h-auto lg:min-h-[640px]">
          <Image
            src="https://images.unsplash.com/photo-1531315396756-905d68d21b56?auto=format&fit=crop&w=1000&q=80"
            alt="Tenista en plena acción durante una clase"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        {/* Derecha: contenido + lista numerada */}
        <div className="flex flex-col justify-center px-6 py-16 lg:col-span-7 lg:px-16 lg:py-24">
          <div className="max-w-xl">
            <span className="font-mulish text-sm font-semibold uppercase tracking-widest text-lime">
              Empieza hoy
            </span>
            <h2 className="mt-3 font-kanit text-3xl font-bold text-brand md:text-4xl">
              Clases personalizadas
            </h2>
            <p className="mt-4 font-mulish text-brand/70">
              Elegí el formato que mejor se adapta a vos. Sea cual sea tu nivel,
              tenemos una clase pensada para que avances jugando.
            </p>

            <ul className="mt-10 space-y-8">
              {CLASES.map((clase) => (
                <li key={clase.numero} className="flex gap-5">
                  <span className="font-kanit text-4xl font-bold leading-none text-lime md:text-5xl">
                    {clase.numero}
                  </span>
                  <div className="border-l border-brand/10 pl-5">
                    <h3 className="font-kanit text-xl font-bold text-brand">
                      {clase.title}
                    </h3>
                    <p className="mt-2 font-mulish text-sm text-brand/70">
                      {clase.text}
                    </p>
                    <Link
                      href={clase.href}
                      className="group mt-3 inline-flex items-center gap-1.5 font-mulish text-sm font-semibold text-brand transition-colors hover:text-lime"
                    >
                      Saber más
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
