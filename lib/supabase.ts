import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Devuelve el cliente de Supabase (singleton) o `null` si todavía no están
 * configuradas las variables de entorno. Es *lazy*: no se crea en tiempo de
 * import, así que importar este módulo nunca rompe la app aunque falten las
 * credenciales (durante el desarrollo con datos mock).
 */
export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  client = createClient(url, anonKey);
  return client;
}
