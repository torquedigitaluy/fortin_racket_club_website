-- =============================================================================
-- 0011  Título y descripción opcionales en slides del hero
-- =============================================================================

-- El CMS ya no exige completar título/descripción al crear un slide: puede
-- quedar solo con la imagen de fondo. Sacamos la restricción NOT NULL de la
-- tabla para que coincida con el formulario.
alter table public.hero_slides
  alter column title drop not null,
  alter column texto drop not null;
