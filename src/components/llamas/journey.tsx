"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HERO, MEDIA, src, srcSet } from "../../content/media";
import { SITE, TEL } from "../../content/site";
import { track } from "../../lib/track";
import { MenuIcon, PhoneIcon, PinIcon } from "./icons";
import { currentMotion, onMotion } from "./motion";

// Clearing filters and jumping to a dish row is shared by every dish link.
export function goToDish(id: string) {
  window.dispatchEvent(new CustomEvent("llamas:menu-reset"));
  requestAnimationFrame(() => {
    const row = document.getElementById(`item-${id}`);
    if (!row) return;
    row.classList.add("is-target");
    row.scrollIntoView({ behavior: currentMotion() === "on" ? "smooth" : "auto", block: "center" });
    window.setTimeout(() => row.classList.remove("is-target"), 2600);
  });
}

function DishLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <li>
      <a
        href={`#item-${id}`}
        onClick={(e) => {
          e.preventDefault();
          track("featured_dish_click", { item_id: id });
          goToDish(id);
          history.replaceState(null, "", `#item-${id}`);
        }}
      >
        {children}
      </a>
    </li>
  );
}

const PATHS = [
  {
    cat: "peruvian",
    key: "lomo-saltado",
    kicker: "Peruvian specialties",
    title: "Peru",
    text: "Lomo saltado, ceviche, ají de gallina and seafood jalea.",
  },
  {
    cat: "mexican",
    key: "quesabirrias",
    kicker: "Mexican favorites",
    title: "Mexico",
    text: "Quesabirrias with consommé, street tacos, burritos and plates.",
  },
  {
    cat: "sushi",
    key: "dragon-roll",
    kicker: "Sushi, too",
    title: "Sushi",
    text: "Twenty special rolls, plus classic rolls, nigiri and sashimi.",
  },
];

export function Paths() {
  return (
    <section className="paths" aria-label="Choose a cuisine">
      <div className="paths__grid">
        {PATHS.map((p) => {
          const m = MEDIA[p.key];
          return (
            <a
              key={p.cat}
              className="path"
              href="#menu"
              data-track="cuisine_filter"
              data-place="paths"
              data-cat={p.cat}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("llamas:menu-filter", { detail: p.cat }))
              }
            >
              <img
                src={src(m, 640)}
                srcSet={srcSet(m)}
                sizes="(max-width: 860px) 38vw, 33vw"
                width={m.width}
                height={m.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="path__body">
                <p className="path__kicker">{p.kicker}</p>
                <h2>{p.title}</h2>
                <p>{p.text}</p>
                <span className="path__go">
                  See the{" "}
                  {p.title === "Sushi" ? "sushi" : p.title === "Peru" ? "Peruvian" : "Mexican"} menu
                  →
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

type Inset = { key: string; label: string };
type ChapterProps = {
  id: string;
  variant?: string;
  kicker: string;
  title: ReactNode;
  mainKey?: string;
  insets?: Inset[];
  children: ReactNode;
  links?: { id: string; label: string }[];
  after?: ReactNode;
};

function Img({ k, cls, sizes }: { k: string; cls?: string; sizes: string }) {
  const m = MEDIA[k];
  return (
    <img
      className={cls}
      src={src(m)}
      srcSet={srcSet(m)}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={m.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

function Chapter({
  id,
  variant,
  kicker,
  title,
  mainKey,
  insets = [],
  children,
  links = [],
  after,
}: ChapterProps) {
  return (
    <section
      className={`chapter${variant ? ` chapter--${variant}` : ""}`}
      id={id}
      aria-labelledby={`${id}-h`}
    >
      <div className="chapter__stage">
        <div className="chapter__media">
          {mainKey ? (
            <Img k={mainKey} cls="main" sizes="(max-width: 860px) 100vw, 60vw" />
          ) : (
            <picture>
              <source
                media="(max-width: 760px)"
                srcSet={`${HERO.still.mobile[0]} 720w, ${HERO.still.mobile[1]} 1080w`}
                sizes="100vw"
              />
              <img
                className="main"
                src={`${HERO.still.base}-1920.webp`}
                srcSet={HERO.still.widths
                  .map((w) => `${HERO.still.base}-${w}.webp ${w}w`)
                  .join(", ")}
                sizes="60vw"
                width={1920}
                height={1080}
                alt={HERO.alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
          )}
          <div className="glow" aria-hidden="true" />
          {insets.map((s, i) => (
            <figure key={s.key} className={`chapter__inset chapter__inset--${i ? "b" : "a"}`}>
              <Img k={s.key} sizes="(max-width: 860px) 36vw, 18vw" />
              <span aria-hidden="true">{s.label}</span>
            </figure>
          ))}
        </div>
        <div className="chapter__copy">
          <p className="chapter__kicker">{kicker}</p>
          <h2 id={`${id}-h`}>{title}</h2>
          {children}
          {links.length > 0 && (
            <ul className="dish-links" aria-label="Find these on the menu">
              {links.map((l) => (
                <DishLink key={l.id} id={l.id}>
                  {l.label}
                </DishLink>
              ))}
            </ul>
          )}
          {after}
        </div>
      </div>
    </section>
  );
}

// The page's only scroll controller: writes each chapter's progress (0..1) to --p.
function useChapterProgress(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const chapters = Array.from(el.querySelectorAll<HTMLElement>(".chapter"));
    let raf = 0;
    let active = false;
    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const c of chapters) {
        const r = c.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const span = Math.max(1, r.height - vh);
        const p = Math.min(1, Math.max(0, -r.top / span));
        c.style.setProperty("--p", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (active && !raf) raf = requestAnimationFrame(frame);
    };
    const set = (m: string) => {
      active = m === "on";
      if (active) frame();
      else chapters.forEach((c) => c.style.removeProperty("--p"));
    };
    set(currentMotion());
    const off = onMotion(set);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      off();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [root]);
}

export function Journey() {
  const root = useRef<HTMLElement>(null);
  useChapterProgress(root);
  return (
    <section className="journey" ref={root} aria-label="A walk through the menu">
      <div className="journey__intro">
        <h2>Follow the flame.</h2>
        <p>
          Six stops through Peru, Mexico, sushi and the shared table.{" "}
          <a className="journey__skip" href="#menu" data-track="menu_cta" data-place="journey_skip">
            Skip to the menu
          </a>
        </p>
      </div>
      <div className="weave weave--thin" aria-hidden="true" />

      <Chapter
        id="ch-flame"
        kicker="01 · The flame"
        title="Your next favorite starts here."
        links={[{ id: "lomo-saltado", label: "Lomo Saltado" }]}
      >
        <p>
          Lomo saltado is cooked fast over high heat: tender meat stir-fried with onions, tomatoes
          and garlic, finished with soy sauce and vinegar, and served with rice and crispy fries.
        </p>
      </Chapter>

      <Chapter
        id="ch-peru"
        kicker="02 · Peru"
        title="Peru, full of flavor."
        mainKey="lomo-saltado"
        insets={[
          { key: "ceviche-mixto", label: "Ceviche Mixto" },
          { key: "papa-a-la-huancaina", label: "Papa a la Huancaína" },
        ]}
        links={[
          { id: "lomo-saltado", label: "Lomo Saltado" },
          { id: "ceviche-mixto", label: "Ceviche Mixto" },
          { id: "papa-a-la-huancaina", label: "Papa a la Huancaína" },
          { id: "jalea-mixta", label: "Jalea Mixta" },
        ]}
      >
        <p>
          Ceviche marinated in fresh lime juice, potatoes in a creamy ají amarillo sauce, and the
          saltados that bring the wok to the Peruvian table.
        </p>
        <p className="culture">
          Saltados reflect Chinese-Peruvian cooking, known in Peru as chifa: a wok, soy sauce and
          Peruvian ingredients together.
        </p>
      </Chapter>

      <Chapter
        id="ch-comfort"
        variant="comfort"
        kicker="03 · Comfort"
        title="Comfort at the table."
        mainKey="aji-de-gallina"
        insets={[
          { key: "tallarines-verdes", label: "Tallarines Verdes" },
          { key: "arroz-con-mariscos", label: "Arroz con Mariscos" },
        ]}
        links={[
          { id: "aji-de-gallina", label: "Ají de Gallina" },
          { id: "tallarines-verdes", label: "Tallarines Verdes" },
          { id: "arroz-con-mariscos", label: "Arroz con Mariscos" },
        ]}
      >
        <p>
          Shredded chicken in a savory ají amarillo sauce with rice. Green linguini in a creamy
          basil and spinach sauce. Seafood rice seasoned with ají panca and a touch of white wine.
        </p>
      </Chapter>

      <Chapter
        id="ch-mexico"
        kicker="04 · Mexico"
        title="Mexican favorites."
        mainKey="quesabirrias"
        insets={[
          { key: "street-tacos", label: "Street Tacos" },
          { key: "wet-burrito", label: "Wet Burrito" },
        ]}
        links={[
          { id: "quesabirrias", label: "Quesabirrias" },
          { id: "street-tacos", label: "Street Tacos" },
          { id: "wet-burrito", label: "Wet Burrito" },
          { id: "carne-asada", label: "Carne Asada" },
        ]}
      >
        <p>
          Cheesy quesabirrias with consommé for dipping, street tacos with onions, cilantro and
          salsa, burritos topped red or green, and full plates like carne asada.
        </p>
      </Chapter>

      <Chapter
        id="ch-sushi"
        variant="sushi"
        kicker="05 · Sushi"
        title="Another craving, covered."
        mainKey="dragon-roll"
        insets={[{ key: "fireworks-roll", label: "Fireworks Roll" }]}
        links={[
          { id: "dragon-roll", label: "Dragon Roll" },
          { id: "fireworks-roll", label: "Fireworks Roll" },
        ]}
      >
        <p>
          Twenty special rolls, from the Dragon Roll with shrimp tempura and avocado to the torched
          Fireworks Roll with spicy tuna. Classic rolls, nigiri and sashimi too.
        </p>
      </Chapter>

      <Chapter
        id="ch-table"
        variant="table"
        kicker="06 · The table"
        title="Your table is waiting."
        mainKey="shared-table"
        insets={[
          { key: "chicha-morada", label: "Chicha Morada" },
          { key: "crema-volteada", label: "Crema Volteada" },
        ]}
        links={[
          { id: "chicha-morada", label: "Chicha Morada" },
          { id: "horchata", label: "Horchata" },
          { id: "crema-volteada", label: "Crema Volteada" },
        ]}
        after={
          <>
            <div className="finale">
              <h3>Find your flavor at Llamas.</h3>
              <div className="btn-row">
                <a
                  className="btn btn--primary"
                  href="#menu"
                  data-track="menu_cta"
                  data-place="finale"
                >
                  <MenuIcon />
                  View Menu
                </a>
                <a
                  className="btn btn--ghost"
                  href={SITE.directionsUrl}
                  target="_blank"
                  rel="noopener"
                  data-track="directions_click"
                  data-place="finale"
                >
                  <PinIcon />
                  Get Directions
                </a>
                <a className="btn btn--red" href={TEL} data-track="phone_click" data-place="finale">
                  <PhoneIcon />
                  Call
                </a>
              </div>
            </div>
            <p className="note">Illustrative dish images. Actual presentation may vary.</p>
          </>
        }
      >
        <p>
          Bring everyone. Order from Peru, Mexico and the sushi bar at the same table, with chicha
          morada, horchata and crema volteada to finish.
        </p>
      </Chapter>
    </section>
  );
}
