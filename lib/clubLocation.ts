/**
 * Coordenadas del club, compartidas entre el mapa (client component) y el
 * footer (server component) para armar los links de "Google Maps" / "Waze".
 * Viven en un módulo aparte (sin "use client") porque no se puede acceder a
 * propiedades de un valor exportado por un módulo cliente desde un Server
 * Component.
 */
export const CLUB_COORDS = { lat: -34.7669122, lng: -55.796759 };

export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${CLUB_COORDS.lat},${CLUB_COORDS.lng}`;
export const WAZE_URL = `https://waze.com/ul?ll=${CLUB_COORDS.lat},${CLUB_COORDS.lng}&navigate=yes`;
