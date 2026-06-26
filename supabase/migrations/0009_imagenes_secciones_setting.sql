-- =============================================================================
-- 0009  Resto de imágenes fijas de secciones, editables desde el CMS
-- =============================================================================

insert into public.site_settings (key, value) values
  ('torneo_imagen_url', 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=80'),
  ('torneo_imagen_alt', 'Jugador de tenis ejecutando un golpe en acción'),
  ('reservas_imagen_url', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80'),
  ('reservas_imagen_alt', 'Ambiente del club de tenis'),
  ('cta_bg_url', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1920&q=80'),
  ('planes_bg_url', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1920&q=80'),
  ('planes_destacado_bg_url', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80'),
  ('newsletter_bg_url', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1920&q=80')
on conflict (key) do nothing;

-- cta_bg_url ya existía vacío (migración 0004): lo completamos con la imagen.
update public.site_settings
  set value = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1920&q=80'
  where key = 'cta_bg_url' and (value is null or value = '');
