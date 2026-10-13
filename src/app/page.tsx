import { ActionBar, Header, Hero } from "@/components/llamas/chrome";
import { Journey, Paths } from "@/components/llamas/journey";
import { ClickTracking, Footer, Menu, Visit } from "@/components/llamas/menu";
import { HERO } from "@/content/media";
import { SITE } from "@/content/site";

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

export default function Home() {
  return (
    <>
      <link rel="preload" as="image" href={HERO.poster.desktop} media="(min-width: 761px)" />
      <link rel="preload" as="image" href={HERO.poster.mobile} media="(max-width: 760px)" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <ClickTracking />
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
