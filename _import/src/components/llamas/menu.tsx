import { useEffect, useMemo, useRef, useState } from "react";
import { MEDIA, src } from "../../content/media";
import { MENU, type MenuItem } from "../../content/menu";
import { ADDRESS_ONE_LINE, SITE, TEL } from "../../content/site";
import { track } from "../../lib/track";
import { Logo, PhoneIcon, PinIcon, SearchIcon } from "./icons";

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const haystack = (i: MenuItem) =>
  fold([i.name, i.en, i.desc, ...(i.variants ?? []).map((v) => v.label)].filter(Boolean).join(" "));

// Spanish dish names get lang="es" so screen readers pronounce them properly.
const SPANISH = new Set(["peruvian", "mexican"]);
const ENGLISH_NAMES = /^(\d|Fish|Combo|Wet|Super|Hamburger|Cheese|Chicken|Kids|Steak|Fried|Shrimp)/;

function Price({ p }: { p: string }) {
  return <>${p}</>;
}

function Dish({ item, cat }: { item: MenuItem; cat: string }) {
  const m = MEDIA[item.id];
  const es = SPANISH.has(cat) && !!item.en && !ENGLISH_NAMES.test(item.name);
  return (
    <li
      className={`dish${m ? " has-img" : ""}`}
      id={`item-${item.id}`}
      data-search={haystack(item)}
    >
      {m && (
        <img
          className="dish__img"
          src={src(m, 640)}
          width={96}
          height={64}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      <h5 className="dish__name">
        <span lang={es ? "es" : undefined}>{item.name}</span>
        {item.en && <span className="dish__en">{item.en}</span>}
      </h5>
      {item.price ? (
        <span className="dish__price">
          <Price p={item.price} />
        </span>
      ) : (
        <span className="dish__price" aria-hidden="true" />
      )}
      {item.desc && <p className="dish__desc">{item.desc}</p>}
      {item.variants && (
        <ul className="dish__variants">
          {item.variants.map((v) => (
            <li key={v.label}>
              {v.label}{" "}
              <b>
                <Price p={v.price} />
              </b>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Menu() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState<number | null>(null);
  const body = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const searchTimer = useRef(0);

  useEffect(() => {
    const reset = () => {
      setCat("all");
      setQ("");
    };
    const filter = (e: Event) => {
      setCat((e as CustomEvent<string>).detail);
      setQ("");
    };
    window.addEventListener("llamas:menu-reset", reset);
    window.addEventListener("llamas:menu-filter", filter);
    return () => {
      window.removeEventListener("llamas:menu-reset", reset);
      window.removeEventListener("llamas:menu-filter", filter);
    };
  }, []);

  // Filtering toggles `hidden` on server-rendered rows, so the full menu exists without JS.
  useEffect(() => {
    const root = body.current;
    if (!root) return;
    const term = fold(q.trim());
    let count = 0;
    root.querySelectorAll<HTMLElement>(".menu-cat").forEach((c) => {
      const catOk = cat === "all" || c.dataset.cat === cat;
      let catHits = 0;
      c.querySelectorAll<HTMLElement>(".menu-group").forEach((g) => {
        let hits = 0;
        g.querySelectorAll<HTMLElement>(".dish").forEach((d) => {
          const ok = catOk && (!term || (d.dataset.search ?? "").includes(term));
          d.hidden = !ok;
          if (ok) hits++;
        });
        g.hidden = hits === 0;
        catHits += hits;
      });
      c.hidden = catHits === 0;
      count += catHits;
    });
    setShown(count);
  }, [cat, q]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("menu_view");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tabs = useMemo(
    () => [{ id: "all", label: "All" }, ...MENU.map((c) => ({ id: c.id, label: c.label }))],
    [],
  );

  return (
    <section className="menu" id="menu" ref={section} aria-labelledby="menu-h">
      <div className="menu__head">
        <h2 id="menu-h">Menu</h2>
        <p>
          Peruvian specialties, Mexican favorites, sushi, kids meals and classics, drinks and
          desserts.
        </p>
        <p className="menu__notes">
          <span>Prices as printed on the current menu and may change. Please call to confirm.</span>
          <span>Illustrative dish images. Actual presentation may vary.</span>
        </p>
      </div>
      <div className="menu__bar">
        <div className="menu__bar-inner">
          <div className="tabs" role="group" aria-label="Menu categories">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className="tab"
                aria-pressed={cat === t.id}
                onClick={() => {
                  setCat(t.id);
                  track("cuisine_filter", { category: t.id, place: "menu_tabs" });
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="search">
            <span className="sr-only">Search the menu</span>
            <SearchIcon />
            <input
              type="search"
              value={q}
              placeholder="Search dishes"
              autoComplete="off"
              onChange={(e) => {
                const v = e.target.value;
                setQ(v);
                window.clearTimeout(searchTimer.current);
                if (v.trim().length > 1)
                  searchTimer.current = window.setTimeout(
                    () => track("menu_search", { term: v.trim().slice(0, 40) }),
                    900,
                  );
              }}
            />
          </label>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {shown === null ? "" : `${shown} dishes shown`}
      </p>
      <div className="menu__body" ref={body}>
        {MENU.map((c) => (
          <div key={c.id} className="menu-cat" data-cat={c.id} id={`menu-${c.id}`}>
            <h3>{c.label}</h3>
            {c.groups.map((g) => (
              <div key={g.id} className="menu-group">
                <h4>{g.title}</h4>
                {g.intro && <p className="intro">{g.intro}</p>}
                <ul className="dishes">
                  {g.items.map((i) => (
                    <Dish key={i.id} item={i} cat={c.id} />
                  ))}
                </ul>
                {g.notes && (
                  <div className="group-notes">
                    {g.notes.map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        {shown === 0 && (
          <p className="menu__empty">
            No dishes match “{q}”. Try another word, or{" "}
            <button
              type="button"
              className="tab"
              onClick={() => {
                setQ("");
                setCat("all");
              }}
            >
              show the full menu
            </button>
          </p>
        )}
      </div>
      <p className="menu__advisory">
        Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your
        risk of foodborne illness. Please tell us about any food allergies when you order.
      </p>
    </section>
  );
}

export function Visit() {
  return (
    <section className="visit" id="visit" aria-labelledby="visit-h">
      <div className="visit__grid">
        <div>
          <h2 id="visit-h">Visit Llamas</h2>
          <p>
            Peruvian specialties, Mexican favorites and sushi on Manzanita Avenue in Carmichael.
          </p>
          <p>Please call to confirm today's hours.</p>
        </div>
        <dl className="facts">
          <div className="fact">
            <dt>Address</dt>
            <dd>
              {ADDRESS_ONE_LINE}
              <br />
              <a
                className="btn btn--primary"
                href={SITE.directionsUrl}
                target="_blank"
                rel="noopener"
                data-track="directions_click"
                data-place="visit"
              >
                <PinIcon />
                Get Directions
              </a>
            </dd>
          </div>
          <div className="fact">
            <dt>Phone</dt>
            <dd>
              <a href={TEL} data-track="phone_click" data-place="visit_text">
                {SITE.phoneDisplay}
              </a>
              <br />
              <a className="btn btn--red" href={TEL} data-track="phone_click" data-place="visit">
                <PhoneIcon />
                Call
              </a>
            </dd>
          </div>
          <div className="fact">
            <dt>Hours</dt>
            <dd>Please call to confirm today's hours.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="brand" href="#top" aria-label="Llamas Restaurant, back to top">
          <Logo />
        </a>
        <p>{SITE.tagline}</p>
        <p>
          {ADDRESS_ONE_LINE} ·{" "}
          <a href={TEL} data-track="phone_click" data-place="footer">
            {SITE.phoneDisplay}
          </a>
        </p>
        <p>Dish and flame images on this site are illustrative. Actual presentation may vary.</p>
      </div>
    </footer>
  );
}

// One delegated listener for every link marked with data-track.
export function useClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!a) return;
      const ev = a.dataset.track!;
      track(ev, {
        place: a.dataset.place ?? "",
        ...(a.dataset.cat ? { category: a.dataset.cat } : {}),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
