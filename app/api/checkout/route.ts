import { NextResponse } from "next/server";
import { createCheckoutPreference } from "@/lib/mercadopago";

/**
 * POST /api/checkout
 * Body: { title: string, price: number, quantity?: number, reference?: string }
 *
 * Crea una preferencia de pago en Mercado Pago y devuelve:
 *   { configured: true, url }   → redirigir al usuario a `url`
 *   { configured: false }       → MP aún no configurado (mostrar aviso)
 */
export async function POST(req: Request) {
  let payload: {
    title?: string;
    price?: number;
    quantity?: number;
    reference?: string;
  };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { title, price, quantity = 1, reference } = payload;

  if (!title || typeof price !== "number" || price <= 0) {
    return NextResponse.json(
      { error: "Faltan datos válidos (title, price)" },
      { status: 400 }
    );
  }

  try {
    const result = await createCheckoutPreference(
      [{ title, quantity, unit_price: price }],
      { externalReference: reference }
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago" },
      { status: 502 }
    );
  }
}
