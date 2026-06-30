import { getNavLinks } from "@/lib/navLinks";
import { getSettings } from "@/lib/settings";
import NavbarClient from "./NavbarClient";

/**
 * Server wrapper: trae los links de navegación y el logo del club, y delega
 * el comportamiento (scroll, menú móvil) al componente cliente.
 */
export default async function Navbar() {
  const [navLinks, settings] = await Promise.all([getNavLinks(), getSettings()]);
  return (
    <NavbarClient
      navLinks={navLinks}
      logoUrl={settings.hero_logo_url}
      logoAlt={settings.hero_logo_alt}
    />
  );
}
