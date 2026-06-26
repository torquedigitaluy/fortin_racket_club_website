import { getPlanes } from "@/lib/planes";
import { getSettings } from "@/lib/settings";
import PlanesSocioClient from "./PlanesSocioClient";

/**
 * Server wrapper: trae los planes y sus ventajas (matriz aplanada) y delega la
 * compra (Mercado Pago) al componente cliente.
 */
export default async function PlanesSocio() {
  const [{ features, planes }, settings] = await Promise.all([
    getPlanes(),
    getSettings(),
  ]);
  return (
    <PlanesSocioClient
      features={features}
      planes={planes}
      bgUrl={settings.planes_bg_url}
      destacadoBgUrl={settings.planes_destacado_bg_url}
    />
  );
}
