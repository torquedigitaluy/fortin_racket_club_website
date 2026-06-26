/**
 * Integración con Mercado Pago (Checkout Pro).
 *
 * Crea una "preferencia" de pago vía la API REST y devuelve el `init_point`
 * (URL a la que se redirige al usuario para pagar).
 *
 * Configuración necesaria en `.env.local`:
 *   MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxx   (token privado del vendedor)
 *
 * Mientras no exista el token, `createCheckoutPreference` devuelve
 * `{ configured: false }` para que la UI avise sin romperse.
 */

export type CheckoutItem = {
  title: string;
  quantity: number;
  unit_price: number;
};

export type CheckoutResult =
  | { configured: false }
  | { configured: true; url: string };

const MP_API = "https://api.mercadopago.com/checkout/preferences";

export async function createCheckoutPreference(
  items: CheckoutItem[],
  opts?: { backUrl?: string; externalReference?: string }
): Promise<CheckoutResult> {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

  // Sin token todavía → la UI mostrará "pago no disponible aún".
  if (!token) {
    return { configured: false };
  }

  const body: Record<string, unknown> = {
    items: items.map((it) => ({
      title: it.title,
      quantity: it.quantity,
      unit_price: it.unit_price,
      currency_id: "ARS",
    })),
  };

  if (opts?.externalReference) {
    body.external_reference = opts.externalReference;
  }

  if (opts?.backUrl) {
    body.back_urls = {
      success: opts.backUrl,
      pending: opts.backUrl,
      failure: opts.backUrl,
    };
    body.auto_return = "approved";
  }

  const res = await fetch(MP_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Mercado Pago respondió ${res.status}: ${detail}`);
  }

  const data = (await res.json()) as { init_point?: string };
  if (!data.init_point) {
    throw new Error("Mercado Pago no devolvió init_point");
  }

  return { configured: true, url: data.init_point };
}
