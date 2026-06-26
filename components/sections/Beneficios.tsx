import Image from "next/image";
import { LandPlot, Users, Trophy, Shirt, Dumbbell, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Beneficio = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const IZQUIERDA: Beneficio[] = [
  {
    icon: LandPlot,
    title: "2 Canchas",
    text: "Dos canchas profesionales de polvo de ladrillo en óptimas condiciones.",
  },
  {
    icon: Users,
    title: "Coaches profesionales",
    text: "Equipo de entrenadores certificados para todos los niveles.",
  },
  {
    icon: Trophy,
    title: "Torneos",
    text: "Competencias internas y torneos abiertos durante todo el año.",
  },
];

const DERECHA: Beneficio[] = [
  {
    icon: Shirt,
    title: "Guardarropa",
    text: "Vestuarios y guardarropa con lockers para tus pertenencias.",
  },
  {
    icon: Dumbbell,
    title: "Campos de entrenamiento",
    text: "Espacios dedicados para la práctica física y la preparación.",
  },
  {
    icon: Flame,
    title: "Barbacoa",
    text: "Sector de parrillas para compartir después del partido.",
  },
];

function BeneficioItem({
  beneficio,
  align,
}: {
  beneficio: Beneficio;
  align: "left" | "right";
}) {
  const Icon = beneficio.icon;
  const reverse = align === "right";
  return (
    <div
      className={`flex items-start gap-4 ${
        reverse ? "lg:flex-row-reverse lg:text-right" : ""
      }`}
    >
      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand/5 text-brand">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="font-kanit text-lg font-semibold text-brand">
          {beneficio.title}
        </h3>
        <p className="mt-1 font-mulish text-sm text-brand/70">
          {beneficio.text}
        </p>
      </div>
    </div>
  );
}

export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Encabezado */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-mulish text-sm font-semibold uppercase tracking-widest text-lime">
            Beneficios
          </span>
          <h2 className="mt-3 font-kanit text-3xl font-bold text-brand md:text-4xl">
            Full Comfort para Miembros
          </h2>
          <p className="mt-4 font-mulish text-brand/70">
            Todo lo que un socio necesita para disfrutar el club dentro y fuera
            de la cancha.
          </p>
        </div>

        {/* Grilla: 3 bloques · imagen central · 3 bloques */}
        <div className="grid items-center gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-10">
            {IZQUIERDA.map((b) => (
              <BeneficioItem key={b.title} beneficio={b} align="left" />
            ))}
          </div>

          {/* Imagen central */}
          <div className="relative mx-auto h-72 w-full max-w-sm overflow-hidden rounded-[2rem] shadow-xl sm:h-80 lg:h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80"
              alt="Raqueta de tenis y pelotas"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-10">
            {DERECHA.map((b) => (
              <BeneficioItem key={b.title} beneficio={b} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
