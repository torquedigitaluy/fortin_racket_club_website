import { getSupabase } from "./supabase";

/**
 * Entrenadores del club.
 *
 * Tabla esperada en Supabase (crear cuando esté el proyecto):
 *
 *   create table coaches (
 *     id          bigint generated always as identity primary key,
 *     nombre      text not null,
 *     cargo       text not null,            -- ej: "Coach de alto rendimiento"
 *     descripcion text not null,
 *     foto_url    text,                     -- URL pública de la foto
 *     orden       int default 0,            -- para ordenar la grilla
 *     created_at  timestamptz default now()
 *   );
 *
 * Mientras no existan las variables de entorno de Supabase (o la tabla esté
 * vacía / falle la consulta) se devuelven los datos mock de abajo.
 */
export type Coach = {
  id: string | number;
  nombre: string;
  cargo: string;
  descripcion: string;
  foto_url: string;
};

const MOCK_COACHES: Coach[] = [
  {
    id: 1,
    nombre: "Augusto",
    cargo: "",
    descripcion: "",
    foto_url: "/Augusto 1.jpeg",
  },
  {
    id: 2,
    nombre: "Gime",
    cargo: "",
    descripcion: "",
    foto_url: "/Gime 2.jpeg",
  },
  {
    id: 3,
    nombre: "Marti",
    cargo: "",
    descripcion: "",
    foto_url: "/DOM_4587 - Marti 3 cortar vertical.JPG",
  },
  {
    id: 4,
    nombre: "Fede",
    cargo: "",
    descripcion: "",
    foto_url: "/Fede 4.jpeg",
  },
];

export async function getCoaches(limit = 8): Promise<Coach[]> {
  const supabase = getSupabase();

  // Sin credenciales aún → datos mock.
  if (!supabase) {
    return MOCK_COACHES.slice(0, limit);
  }

  const { data, error } = await supabase
    .from("coaches")
    .select("id, nombre, cargo, descripcion, foto_url")
    .eq("activo", true)
    .order("orden", { ascending: true })
    .limit(limit);

  // Ante cualquier problema (tabla inexistente, vacía, error de red) → mock.
  if (error || !data || data.length === 0) {
    if (error) {
      console.warn("[coaches] Supabase no disponible, usando mock:", error.message);
    }
    return MOCK_COACHES.slice(0, limit);
  }

  return data as Coach[];
}
