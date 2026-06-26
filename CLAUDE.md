# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Idioma: el cliente y la spec están en español. Mantén textos de UI, nombres de secciones y comentarios orientados al usuario en español.

## Estado actual

Scaffolding Next.js 14 (App Router, TypeScript) **ya creado y compilando**. Estructura: `app/` (layout con fuentes + `page.tsx` que compone secciones), `components/sections/` (un componente por sección — ver su `README.md`), `lib/supabase.ts`. Falta implementar las 13 secciones.

`PLAN.md` es la fuente de verdad de las 13 secciones de la landing (orden, layout, colores y comportamiento de cada una). Léelo antes de implementar cualquier sección y construye en ese orden. `components/sections/README.md` mapea cada sección a su componente y si es Server o Client.

## Stack tecnológico (requisitos — no sustituir sin pedir)

- **Framework**: Next.js 14+ con **App Router**. Server Components por defecto; Client Components (`"use client"`) solo donde haya interactividad (sliders del Hero/Testimonials, carruseles, formularios, scroll suave, estado de reservas).
- **Estilos**: Tailwind CSS, **mobile-first** y completamente responsivo.
- **Backend / DB**: Supabase para datos dinámicos. Tablas conocidas por la spec: `coaches` (sección Entrenadores) y la agenda de partidos de "Torneo & Calendario" (campos: Fecha, Jugadores, Cancha). Lee datos de Supabase desde Server Components cuando sea posible.
- **Pagos**: **Mercado Pago** para reservar cancha y para hacerse socio (planes). No usar otra pasarela.
- **Iconos**: `lucide-react` (preferido) o `react-icons`.
- **Imágenes**: placeholders de Unsplash durante el desarrollo (se reemplazarán por imágenes reales después).

## Sistema de diseño (Tailwind config)

Definir estos tokens en la config de Tailwind y usarlos en lugar de valores hardcodeados:

- **Azul marca** `#142d4b` — color principal (acentos del logo, botones ovalados, fondos de bloques destacados, overlays al 75% de opacidad).
- **Off-white** `#f7f7f7` — fondos de secciones claras.
- **Verde lima** `#93d419` — acentos/CTAs secundarios (columna "Fortín Club Cup", botones "Ver más").
- **Marrón arcilla de tenis** — secciones específicas (banner CTA con fondo de polvo de ladrillo).
- **Sub-footer** `#0d1d30`.
- **Tipografía**: Kanit para títulos, Mulish para bloques de texto (configurar vía `next/font`). Si no se encuentran, utilizar similares.

Estética objetivo: moderna, sobria y elegante. Botones ovalados (full-rounded) son un patrón recurrente.

## Comandos

```bash
npm run dev      # servidor de desarrollo (localhost:3000)
npm run build    # build de producción
npm run start    # servir build de producción
npm run lint     # ESLint (next/core-web-vitals)
```

Variables de entorno en `.env.local` (plantilla en `.env.local.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `MERCADOPAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`.

## Convenciones de arquitectura

- Genera código estructurado en **componentes limpios y separados por sección** (un componente por sección de `PLAN.md`).
- Mantén la lógica de cliente (estado de sliders/carruseles, formularios) aislada en Client Components pequeños; deja el resto como Server Components.
- Centraliza el cliente de Supabase y las llamadas a Mercado Pago; no dupliques inicialización en componentes.
- Las credenciales (Supabase, Mercado Pago) van en variables de entorno (`.env.local`), nunca en el código.
