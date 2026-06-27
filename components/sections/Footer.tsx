import { getNavLinks } from "@/lib/navLinks";
import { getSettings } from "@/lib/settings";
import FooterClient from "./FooterClient";

/**
 * Server wrapper: trae enlaces y ajustes (contacto, redes, whatsapp) y delega
 * el botón "volver al inicio" al componente cliente.
 */
export default async function Footer() {
  const [enlaces, settings] = await Promise.all([
    getNavLinks(),
    getSettings(),
  ]);

  return <FooterClient enlaces={enlaces} settings={settings} />;
}
