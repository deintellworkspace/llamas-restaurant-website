import { createFileRoute } from "@tanstack/react-router";
import { ActionBar, Header, Hero } from "../components/llamas/chrome";
import { Journey, Paths } from "../components/llamas/journey";
import { Footer, Menu, Visit, useClickTracking } from "../components/llamas/menu";
import { BOOT_SCRIPT } from "../components/llamas/motion";
import { HERO } from "../content/media";
import { SITE } from "../content/site";

// Restaurant structured data: only facts printed on the menu. No hours,
// ratings or price range until the owner confirms them.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  servesCuisine: ["Peruvian", "Mexican", "Sushi"],
  telephone: SITE.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    postalCode: SITE.postal,
    addressCountry: "US",
  },
  hasMenu: "#menu",
};

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@500;600;700;800&display=swap",
      },
      { rel: "preload", as: "image", href: HERO.poster.desktop, media: "(min-width: 761px)" },
      { rel: "preload", as: "image", href: HERO.poster.mobile, media: "(max-width: 760px)" },
    ],
    scripts: [
      { children: BOOT_SCRIPT },
      { type: "application/ld+json", children: JSON.stringify(JSON_LD) },
    ],
  }),
  component: Index,
});

function Index() {
  useClickTracking();
  return (
    <>
      <a className="skip" href="#menu">
        Skip to the menu
      </a>
      <Header />
      <main>
        <Hero />
        <div className="weave" aria-hidden="true" />
        <Paths />
        <Journey />
        <Menu />
        <Visit />
      </main>
      <Footer />
      <ActionBar />
    </>
  );
}
