"use client";

import { useEffect, useRef } from "react";

/**
 * Mapa de ubicación del club.
 *
 * Si hay `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` configurada, renderiza el mapa con la
 * Google Maps JavaScript API y el theme "Modest" (azul oscuro, ~paleta del
 * sitio). Si no hay key, cae al iframe embebido (output=embed) con un tinte azul
 * por CSS — patrón de resiliencia: el mapa nunca queda en blanco.
 */

const COORDS = { lat: -34.7669122, lng: -55.796759 };
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Theme "Modest" de Snazzy Maps (snazzymaps.com/style/287720/modest).
const MAP_STYLE = [
  { featureType: "all", elementType: "geometry", stylers: [{ color: "#202c3e" }] },
  { featureType: "all", elementType: "labels.text.fill", stylers: [{ gamma: 0.01 }, { lightness: 20 }, { weight: "1.39" }, { color: "#ffffff" }] },
  { featureType: "all", elementType: "labels.text.stroke", stylers: [{ weight: "0.96" }, { saturation: "9" }, { visibility: "on" }, { color: "#000000" }] },
  { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ lightness: 30 }, { saturation: "9" }, { color: "#29446b" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ saturation: 20 }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ lightness: 20 }, { saturation: -20 }] },
  { featureType: "road", elementType: "geometry", stylers: [{ lightness: 10 }, { saturation: -30 }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#193a55" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ saturation: 25 }, { lightness: 25 }, { weight: "0.01" }] },
  { featureType: "water", elementType: "all", stylers: [{ lightness: -20 }] },
];

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
          center: COORDS,
          zoom: 16,
          styles: MAP_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
        });
        new g.maps.Marker({ position: COORDS, map, title: "Fortín Racket Club" });
      })
      .catch(() => {
        /* si falla la carga, queda el contenedor vacío; ver fallback abajo */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sin API key → fallback al iframe embebido con tinte azul.
  if (!API_KEY) {
    return (
      <iframe
        title="Ubicación de Fortín Racket Club"
        src="https://maps.google.com/maps?q=-34.7669122,-55.796759&hl=es&z=16&output=embed"
        className="h-64 w-full"
        style={{
          border: 0,
          // Aproximación al theme "Modest" (navy uniforme): desaturar y teñir de un solo azul.
          // Versión clara ("en negativo"): "grayscale(1) sepia(1) hue-rotate(188deg) saturate(1.5) brightness(1.08) contrast(0.9)"
          filter:
            "grayscale(1) invert(0.92) sepia(1) hue-rotate(186deg) saturate(1.8) brightness(0.92) contrast(0.95)",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return <div ref={ref} className="h-64 w-full" />;
}
