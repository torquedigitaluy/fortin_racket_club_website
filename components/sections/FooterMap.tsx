"use client";

import { useEffect, useRef } from "react";
import { CLUB_COORDS } from "@/lib/clubLocation";

/**
 * Mapa de ubicación del club.
 *
 * Estilo Google Maps clásico (claro, sin tintes) para que se vea como una
 * tarjeta de ubicación nativa. Si hay `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
 * configurada, renderiza el mapa con la Google Maps JavaScript API; si no,
 * cae al iframe embebido (output=embed) — patrón de resiliencia: el mapa
 * nunca queda en blanco.
 */

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Carga el script de la JS API una sola vez y resuelve con `window.google`.
function loadGoogleMaps(apiKey: string): Promise<unknown> {
  const w = window as unknown as { google?: { maps?: unknown } };
  if (w.google?.maps) return Promise.resolve(w.google);
  return new Promise((resolve, reject) => {
    const existing = document.getElementById("gmaps-js") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(w.google));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.id = "gmaps-js";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=es`;
    s.async = true;
    s.onload = () => resolve(w.google);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function FooterMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!API_KEY || !ref.current) return;
    let cancelled = false;
    loadGoogleMaps(API_KEY)
      .then((google) => {
        const g = google as any;
        if (cancelled || !ref.current || !g?.maps) return;
        const map = new g.maps.Map(ref.current, {
          center: CLUB_COORDS,
          zoom: 16,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
        });
        new g.maps.Marker({ position: CLUB_COORDS, map, title: "Fortín Racket Club" });
      })
      .catch(() => {
        /* si falla la carga, queda el contenedor vacío; ver fallback abajo */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sin API key → fallback al iframe embebido, estilo claro nativo de Google.
  if (!API_KEY) {
    return (
      <iframe
        title="Ubicación de Fortín Racket Club"
        src={`https://maps.google.com/maps?q=${CLUB_COORDS.lat},${CLUB_COORDS.lng}&hl=es&z=16&output=embed`}
        className="h-48 w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return <div ref={ref} className="h-48 w-full" />;
}
