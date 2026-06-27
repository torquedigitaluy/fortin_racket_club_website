"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Fondo con efecto parallax: la imagen se desplaza verticalmente en función del
 * scroll, a una fracción de la velocidad del contenido. Se escala un poco
 * (scale 1.3) para tener margen y que el desplazamiento no revele bordes.
 *
 * Reemplaza al <Image fill> de fondo. Va dentro de un contenedor `relative`
 * (la sección) y queda detrás del overlay y del contenido. Respeta
 * `prefers-reduced-motion`: si está activo, queda estático.
 */
export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  intensity = 0.4,
}: {
  src: string;
  alt?: string;
  className?: string;
  /** Fracción de la altura que recorre el fondo. 0.4 = sutil-evidente. */
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  // El zoom debe cubrir el desplazamiento a ambos lados (intensity por lado)
  // más un pequeño margen, para no revelar bordes nunca.
  const scale = 1 + intensity * 2 + 0.2;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Progreso del centro de la sección respecto al centro del viewport: el
      // rango útil va de -1 (sección entrando por abajo) a 1 (saliendo arriba).
      const center = rect.top + rect.height / 2;
      const raw = (center - viewportH / 2) / (viewportH / 2 + rect.height / 2);
      const progress = Math.max(-1, Math.min(1, raw));
      setOffset(progress * rect.height * intensity);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        unoptimized
        className="object-cover"
        style={{
          transform: `translate3d(0, ${offset}px, 0) scale(${scale})`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
