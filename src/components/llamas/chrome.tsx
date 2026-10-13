"use client";

import { useEffect, useRef, useState } from "react";
import { HERO } from "../../content/media";
import { ADDRESS_ONE_LINE, SITE, TEL } from "../../content/site";
import { Logo, MenuIcon, PhoneIcon, PinIcon } from "./icons";
import { currentMotion, lightDataMode, onMotion, setMotion, type Motion } from "./motion";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [motion, setM] = useState<Motion>("on");
  useEffect(() => {
    setM(currentMotion());
    const off = onMotion(setM);
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <header className={`site-header${solid ? " is-solid" : ""}`}>
      <a className="brand" href="#top" aria-label="Llamas Restaurant, back to top">
        <Logo />
      </a>
      <nav className="site-nav" aria-label="Main">
        <a href="#menu" data-track="nav_menu">
          Menu
        </a>
        <a href="#ch-peru">Peruvian</a>
        <a href="#ch-mexico">Mexican</a>
        <a href="#ch-sushi">Sushi</a>
        <a href="#visit">Visit</a>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className="motion-toggle"
          aria-pressed={motion === "on"}
          onClick={() => setMotion(motion === "on" ? "off" : "on")}
          aria-label={motion === "on" ? "Motion on. Turn motion off" : "Motion off. Turn motion on"}
        >
          <span className="dot" aria-hidden="true" />
          <span className="label">{motion === "on" ? "Motion on" : "Motion off"}</span>
        </button>
        <a
          className="btn btn--red header-call"
          href={TEL}
          data-track="phone_click"
          data-place="header"
        >
          <PhoneIcon />
          <span>
            Call<span className="label-long"> {SITE.phoneDisplay}</span>
          </span>
        </a>
      </div>
    </header>
  );
}

// One controller for the hero film: it only decides whether to load it and
// plays/pauses it. No scroll scrubbing touches this element.
function useHeroVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let loaded = false;
    let visible = true;
    const start = () => {
      if (currentMotion() !== "on" || lightDataMode()) return;
      if (!loaded) {
        const set = window.matchMedia("(max-width: 760px)").matches
          ? HERO.video.mobile
          : HERO.video.desktop;
        const webm = v.canPlayType('video/webm; codecs="vp9"');
        v.src = webm ? set.webm : set.mp4;
        loaded = true;
      }
      if (visible)
        v.play().catch(() => {
          /* autoplay blocked: the poster stays */
        });
    };
    const stop = () => {
      v.pause();
      v.classList.remove("is-playing");
    };
    const onPlaying = () => v.classList.add("is-playing");
    const onError = () => {
      v.classList.remove("is-playing");
      v.removeAttribute("src");
    };
    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", onError);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!loaded) return;
      if (visible && currentMotion() === "on") v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    const kick = () => (idle ? idle(start, { timeout: 2500 }) : window.setTimeout(start, 1200));
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    const off = onMotion((m) => (m === "on" ? start() : stop()));
    return () => {
      off();
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", onError);
    };
  }, [ref]);
}

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  useHeroVideo(video);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <picture className="hero__media">
        <source media="(max-width: 760px)" srcSet={HERO.poster.mobile} />
        <img
          src={HERO.poster.desktop}
          srcSet={`${HERO.poster.desktopSmall} 1280w, ${HERO.poster.desktop} 1920w`}
          sizes="100vw"
          width={1920}
          height={1080}
          alt={HERO.alt}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <video
        ref={video}
        className="hero__video"
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Llamas Restaurant · Carmichael</p>
          <h1 id="hero-title">
            Follow the flame. <em>Find your flavor.</em>
          </h1>
          <p className="hero__lede">
            <strong>Peruvian specialties, Mexican favorites, and sushi</strong>, all at one
            welcoming table.
          </p>
          <div className="btn-row">
            <a className="btn btn--primary" href="#menu" data-track="menu_cta" data-place="hero">
              <MenuIcon />
              View Menu
            </a>
            <a
              className="btn btn--ghost"
              href={SITE.directionsUrl}
              target="_blank"
              rel="noopener"
              data-track="directions_click"
              data-place="hero"
            >
              <PinIcon />
              Get Directions
            </a>
            <a className="btn btn--red" href={TEL} data-track="phone_click" data-place="hero">
              <PhoneIcon />
              Call
            </a>
          </div>
          <p className="hero__address">
            <span>{ADDRESS_ONE_LINE}</span>
            <a href={TEL} data-track="phone_click" data-place="hero_text">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
      <p className="media-note">Illustrative image</p>
    </section>
  );
}

export function ActionBar() {
  return (
    <nav className="action-bar" aria-label="Quick actions">
      <a href="#menu" data-track="menu_cta" data-place="action_bar">
        <MenuIcon />
        Menu
      </a>
      <a className="call" href={TEL} data-track="phone_click" data-place="action_bar">
        <PhoneIcon />
        Call
      </a>
      <a
        href={SITE.directionsUrl}
        target="_blank"
        rel="noopener"
        data-track="directions_click"
        data-place="action_bar"
      >
        <PinIcon />
        Directions
      </a>
    </nav>
  );
}
