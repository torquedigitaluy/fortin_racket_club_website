# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Idioma: el cliente y la spec están en español. Mantén textos de UI, nombres de secciones y comentarios orientados al usuario en español.

## Estado actual

Landing de 13 secciones **implementada y compilando**, con **Supabase Auth + un CMS interno (`/admin`)** para gestionar todo el contenido, y **reservas de canchas reales**. Estructura: `app/` (landing en `page.tsx` + panel en `app/admin/`), `components/sections/` (una por sección — ver su `README.md`), `components/admin/` (UI del CMS), `lib/` (getters de datos + clientes Supabase + lógica del CMS), `supabase/migrations/` (esquema).

Todo el contenido se lee desde Supabase mediante getters en `lib/*` que **siempre caen a datos mock** si faltan credenciales o la tabla está vacía (patrón de resiliencia: la web nunca se rompe). Mercado Pago está **mockeado** (devuelve "no configurado" sin token) pero la reserva sí se registra.

`PLAN.md` describe el diseño original de las 13 secciones (orden, layout, colores). `components/sections/README.md` mapea cada sección a su componente, su fuente de datos y si es Server/Client. `SETUP_SUPABASE.md` tiene los pasos de configuración manual (env, migraciones, usuario admin).

## Stack tecnológico (requisitos — no sustituir sin pedir)

- **Framework**: Next.js 14+ con **App Router**. Server Components por defecto; Client Components (`"use client"`) solo donde haya interactividad (sliders del Hero/Testimonials, carruseles, formularios, scroll suave, estado de reservas).
- **Estilos**: Tailwind CSS, **mobile-first** y completamente responsivo.
- **Backend / DB**: Supabase. Auth con `@supabase/ssr`. Lee datos desde Server Components cuando sea posible. Esquema en `supabase/migrations/` (ver sección "Base de datos").
- **Pagos**: **Mercado Pago** para reservar cancha y para hacerse socio (planes). No usar otra pasarela. Hoy mockeado (sin token → "no disponible").
- **Iconos**: `lucide-react` (preferido) o `react-icons`.
- **Imágenes**: subidas al bucket `media` de Supabase Storage desde el CMS. Se sirven con `unoptimized` en `next/image` (sin recompresión → calidad original; subir ya optimizadas). Placeholders de Unsplash como defaults.
- **Video**: el fondo del Hero puede ser un video (ver "Hero" en Convenciones). Los videos también van al bucket `media` (subida con `components/admin/VideoUpload.tsx`). Usar **`.mp4` (H.264)**, no `.mov`/QuickTime (falla en Firefox y otros). El `<video>` va siempre muteado y en loop.

## Sistema de diseño (Tailwind config)

Definir estos tokens en la config de Tailwind y usarlos en lugar de valores hardcodeados:

- **Azul marca** `#142d4b` — color principal (acentos del logo, botones ovalados, fondos de bloques destacados, overlays al 75% de opacidad).
- **Off-white** `#f7f7f7` — fondos de secciones claras.
- **Verde lima** `#93d419` (token `lime`) — acentos/CTAs secundarios y botones ("Ver más", "Reservar"/"Saber más" sobre fondo oscuro). Nota: varios subtítulos/eyebrows que antes eran lima se pasaron a **azul marca** o **blanco**; usá lima con mesura.
- **Marrón arcilla de tenis** `#b5563a` (token `clay`) — banner "Oferta de bienvenida" y fondo de la columna "Fortín Club Cup" (foto de polvo de ladrillo con filtro azul `bg-brand`).
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

Variables de entorno en `.env.local` (plantilla en `.env.local.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (solo servidor, **nunca** `NEXT_PUBLIC_`), `MERCADOPAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`.

## Base de datos (Supabase)

- **Migraciones** en `supabase/migrations/` (numeradas `0001…`). El repo de GitHub está conectado a Supabase: las migraciones se aplican al hacer push. Para aplicarlas a mano se puede usar la Management API con un Personal Access Token. **Nunca edites una migración ya aplicada**: agregá una nueva.
- **Tablas de contenido**: `coaches`, `partidos`, `servicios`, `clases`, `beneficios`, `sponsors`, `hero_slides`, `estadisticas`, `testimonios`, `nav_links`, `planes` + `plan_features` + `plan_feature_values` (matriz), `site_settings` (key/value), `reservas`, `suscriptores`.
- **`footer_fotos` quedó en desuso**: el footer ahora muestra un **mapa de Google Maps embebido** (iframe en `FooterClient.tsx`) y la **dirección** (`contacto_direccion`) en vez de la galería de fotos. La tabla y su migración siguen existiendo, pero ya no se consulta ni está en el CMS (se removió `lib/footerFotos.ts` y su entrada del registry).
- **RLS**: lectura pública (`select using(true)`) y escritura solo admin vía la función `is_admin()` (`SECURITY DEFINER`, evita recursión). `reservas` no tiene SELECT público: la disponibilidad se expone con el RPC `get_ocupacion(fecha)` (sin PII). El bucket de Storage `media` es público para lectura, escritura solo admin.
- **Auth**: tabla `profiles(id, email, role)`. Un trigger crea el profile al registrarse; se promueve a admin con `update profiles set role='admin'`. El registro público está deshabilitado.

## CMS / Panel admin (`app/admin/`)

- Protegido por `middleware.ts` (verifica rol admin) + `requireAdmin()` en el layout y en cada server action. Login en `/admin/login`. El grupo de rutas `(panel)` agrupa lo protegido (login queda fuera para no hacer loop).
- **CRUD genérico**: las colecciones simples se describen en `lib/admin/resources.ts` (registry de campos) y se gestionan con las rutas `app/admin/(panel)/[resource]` + `components/admin/ResourceForm.tsx` + las server actions de `lib/admin/crud.ts`. Para agregar una colección al CMS, sumá su entrada al registry.
- **Editores a medida**: `ajustes` (key/value de `site_settings`), `planes` (matriz planes×ventajas), `reservas` (grilla por fecha con bloqueo).
- **Subida de media**: `components/admin/ImageUpload.tsx` (imágenes) y `components/admin/VideoUpload.tsx` (videos) + `lib/storage.ts` (bucket `media`).
- **Tipos de campo en `SETTINGS_GROUPS`** (`lib/settings.ts`): texto plano, `multiline` (textarea), `image` (`ImageUpload`), `video` (`VideoUpload`) y `select` (dropdown con `options`). El `SettingsForm` los renderiza según esas flags.

## Convenciones de arquitectura

- Genera código estructurado en **componentes limpios y separados por sección** (un componente por sección de `PLAN.md`).
- **Patrón de getters resilientes** (`lib/coaches.ts`, `lib/servicios.ts`, etc.): `type` + array `MOCK` + getter async que consulta Supabase y **cae al mock** ante cualquier error/vacío, con `console.warn`. Replicá este patrón al agregar contenido nuevo.
- **Wrapper Server + hijo Client**: las secciones con interactividad (Hero, Testimonials, Navbar, Footer, Planes, Reservas) son un Server Component que hace el `await getX()` y pasa los datos por props a un hijo Client (`XClient.tsx`) que mantiene el estado. No conviertas un Server Component en Client solo para traer datos.
- **Textos/imágenes singulares** (no listas): van en `site_settings` vía `lib/settings.ts` (con default en `SETTINGS_DEFAULTS` y entrada en `SETTINGS_GROUPS` para que aparezcan en `/admin/ajustes`). `getSettings()` mergea DB sobre defaults e ignora valores vacíos.
- **Clientes Supabase** (no dupliques inicialización): `lib/supabase.ts` (anon singleton, lecturas públicas), `lib/supabase/server.ts` (Server Components/actions con sesión), `lib/supabase/browser.ts` (login/uploads), `lib/supabase/admin.ts` (service-role, **solo servidor**, tareas privilegiadas como insertar reservas).
- Las credenciales van en variables de entorno (`.env.local`), nunca en el código. La service-role key jamás se expone al cliente.
- **Hero (galería o video)**: `hero_modo` (`galeria`|`video`) en `site_settings`. `components/sections/Hero.tsx` ramifica: video → `HeroVideo` (overlay en server) + `HeroVideoBg` (client; elige fuente escritorio vs móvil/vertical 9:16 con `matchMedia`, render sin `src` en SSR para bajar solo el video correcto); galería → `HeroCarousel`. Los campos de video viven en el grupo "Hero — modo y video" de `/admin/ajustes`. El logo del club (`hero_logo_url`, grupo "Marca") se muestra en el `Navbar`, junto al nombre — no se superpone al fondo del hero.
- **Parallax de fondos**: `components/sections/ParallaxImage.tsx` (client) reemplaza al `<Image fill>` de fondo y lo desplaza con el scroll (prop `intensity`, respeta `prefers-reduced-motion`). En uso en "Oferta de bienvenida", "Newsletter" y "Fortín Club Cup".
- **Orden de secciones**: la fuente de verdad es `app/page.tsx` (puede diferir del orden de `PLAN.md`).
- **Contenido en producción es estático**: la home se prerenderiza en build leyendo Supabase, así que los cambios hechos desde el CMS **no se reflejan hasta un nuevo deploy** (no hay ISR/revalidate configurado). Para cambios de contenido puntuales se puede actualizar `site_settings` con la service-role y redeployar.
