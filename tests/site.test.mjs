// Browser checks for the Llamas site. Run against a production build:
//   npm run build && npx next start -p 3000 &   then   npm run test:e2e
// SITE_URL overrides the target (for example a Vercel preview URL).
// CHROMIUM_PATH points at a Chromium binary when Playwright's own is not installed.
// VERCEL_AUTOMATION_BYPASS_SECRET (from the environment only) lets the checks reach a
// protected Vercel preview. It is sent as x-vercel-protection-bypass to SITE_URL's
// origin only, and is never printed.
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const AXE = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const URL = process.env.SITE_URL ?? "http://127.0.0.1:3000/";
const SHOTS = "tests/output";
const ORIGIN = new globalThis.URL(URL).origin;
const BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "";
// Adds the bypass header to requests for the site under test, and to nothing else.
async function withBypass(c) {
  if (!BYPASS) return;
  await c.route(
    (u) => u.origin === ORIGIN,
    (r) => r.continue({ headers: { ...r.request().headers(), "x-vercel-protection-bypass": BYPASS } }),
  );
}
{
  const local = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/.test(URL);
  const res = await fetch(URL, { redirect: "manual", headers: BYPASS ? { "x-vercel-protection-bypass": BYPASS } : {} });
  console.log(`target ${ORIGIN} | bypass secret ${BYPASS ? "received from environment" : "not set"} | preflight HTTP ${res.status}`);
  if (res.status !== 200) {
    console.error(
      local || BYPASS
        ? "Preflight did not return 200. Check SITE_URL and that the bypass secret belongs to this project."
        : "The site redirected or refused the request. For a protected Vercel preview, export VERCEL_AUTOMATION_BYPASS_SECRET.",
    );
    process.exit(2);
  }
}
fs.mkdirSync(SHOTS, { recursive: true });

const out = [];
const ok = (name, pass, info = "") => {
  out.push({ name, pass, info });
  console.log(`${pass ? "PASS" : "FAIL"} ${name} ${info}`);
};
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

async function ctx(opts) {
  const c = await browser.newContext(opts);
  await withBypass(c);
  const p = await c.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  p.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return { c, p, errors };
}
const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
const vitals = `window.__v={lcp:0,cls:0,lcpEl:''};new PerformanceObserver(l=>{for(const e of l.getEntries()){window.__v.lcp=e.startTime;window.__v.lcpEl=(e.element&&e.element.tagName)||e.url}}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)window.__v.cls+=e.value}}).observe({type:'layout-shift',buffered:true});`;

for (const [label, vp, mobile] of [
  ["desktop-1440", { width: 1440, height: 900 }, false],
  ["phone-390", { width: 390, height: 844 }, true],
]) {
  const { c, p, errors } = await ctx({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 });
  await p.addInitScript(vitals);
  if (mobile) {
    const cdp = await c.newCDPSession(p);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  }
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(mobile ? 6000 : 4500);
  const v = await p.evaluate(() => window.__v);
  ok(`${label}: LCP (lab${mobile ? ", ~1.6 Mbps / 150 ms, 4x CPU" : ", unthrottled"})`, v.lcp < 2500, `${Math.round(v.lcp)} ms on ${v.lcpEl}`);
  ok(`${label}: CLS (lab)`, v.cls < 0.1, v.cls.toFixed(4));
  ok(`${label}: no horizontal overflow at top`, (await overflow(p)) <= 0);
  const h1 = await p.textContent("h1");
  ok(`${label}: hero headline`, /Follow the flame\.\s*Find your flavor\./.test(h1), h1);
  ok(`${label}: eyebrow`, /Llamas Restaurant · Carmichael/i.test(await p.textContent(".eyebrow")));
  const heroBtns = await p.$$eval(".hero .btn", (a) => a.map((x) => [x.textContent.trim(), x.getAttribute("href")]));
  ok(
    `${label}: hero buttons`,
    heroBtns.length === 3 && heroBtns[0][1] === "#menu" && heroBtns[1][1].startsWith("https://www.google.com/maps/dir/") && heroBtns[2][1].startsWith("tel:+1"),
    JSON.stringify(heroBtns.map((b) => b[0])),
  );
  const heroBottom = await p.$eval(".hero .btn-row", (e) => e.getBoundingClientRect().bottom);
  ok(`${label}: hero actions visible without scrolling`, heroBottom <= vp.height, `bottom ${Math.round(heroBottom)} / ${vp.height}`);
  await p.waitForTimeout(mobile ? 6000 : 2500);
  const vid = await p.$eval(".hero__video", (el) => ({ src: el.currentSrc, playing: el.classList.contains("is-playing"), w: el.videoWidth, h: el.videoHeight }));
  ok(`${label}: hero video playing (muted, inline)`, vid.playing, `${vid.src.split("/").pop()} ${vid.w}x${vid.h}`);
  await p.screenshot({ path: `${SHOTS}/${label}-hero.jpg`, quality: 70 });
  if (mobile) ok(`${label}: action bar visible`, await p.isVisible(".action-bar"));
  for (const id of ["ch-peru", "ch-mexico", "ch-table"]) {
    await p.evaluate((id) => {
      const el = document.getElementById(id);
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + el.offsetHeight * 0.3, behavior: "instant" });
    }, id);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${SHOTS}/${label}-${id}.jpg`, quality: 70 });
  }
  ok(`${label}: no horizontal overflow mid-journey`, (await overflow(p)) <= 0);
  await p.evaluate(() => document.getElementById("menu").scrollIntoView({ behavior: "instant" }));
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${SHOTS}/${label}-menu.jpg`, quality: 70 });
  const layer = await p.evaluate(() => (window.dataLayer || []).map((e) => e.event));
  ok(`${label}: menu_view tracked`, layer.includes("menu_view"));
  ok(`${label}: no console or page errors`, errors.length === 0, errors.slice(0, 3).join(" | "));
  await c.close();
}

{
  const { c, p, errors } = await ctx({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", isMobile: true });
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(4000);
  const s = await p.evaluate(() => ({ m: document.documentElement.dataset.motion, src: document.querySelector(".hero__video").getAttribute("src"), h: document.getElementById("ch-peru").offsetHeight, vh: innerHeight }));
  ok("reduced motion: motion off by default", s.m === "off", JSON.stringify(s));
  ok("reduced motion: hero video never loaded", !s.src);
  ok("reduced motion: chapters not pinned", s.h < s.vh * 1.4);
  ok("reduced motion: no errors", errors.length === 0, errors.join(" | "));
  await c.close();
}
{
  const { c, p, errors } = await ctx({ viewport: { width: 1440, height: 900 } });
  let blocked = 0;
  await p.route(/\.(mp4|webm)$/, (r) => {
    blocked++;
    r.abort();
  });
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(5000);
  const s = await p.evaluate(() => ({ poster: document.querySelector(".hero__media img").naturalWidth, playing: document.querySelector(".hero__video").classList.contains("is-playing") }));
  ok("video blocked: poster shown, page usable", s.poster > 0 && !s.playing, `${JSON.stringify(s)} blocked ${blocked}`);
  const pageErr = errors.filter((e) => !/Failed to load resource|ERR_FAILED/.test(e));
  ok("video blocked: no script errors", pageErr.length === 0, pageErr.join(" | "));
  await c.close();
}
{
  const { c, p } = await ctx({ viewport: { width: 1440, height: 900 } });
  await p.addInitScript(() => Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" } }));
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(4000);
  ok("save-data: hero video not loaded", !(await p.$eval(".hero__video", (el) => el.getAttribute("src"))));
  await c.close();
}
{
  const { c, p, errors } = await ctx({ viewport: { width: 1440, height: 900 } });
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(1500);
  const visibleCats = () => p.$$eval(".menu-cat", (a) => a.filter((x) => !x.hidden).map((x) => x.dataset.cat));
  ok("menu: all five categories rendered", (await visibleCats()).length === 5, (await visibleCats()).join(","));
  ok("menu: 101 dishes rendered in HTML", (await p.$$eval(".dish", (a) => a.length)) === 101);
  await p.click(".tab >> text=Sushi");
  ok("menu: Sushi tab filters", JSON.stringify(await visibleCats()) === '["sushi"]');
  await p.click(".tab >> text=All");
  await p.fill(".search input", "huancaina");
  await p.waitForTimeout(200);
  const hits = await p.$$eval(".dish:not([hidden]) .dish__name", (a) => a.map((x) => x.textContent));
  ok("menu: accent-insensitive search", hits.some((h) => /Huancaína/.test(h)), hits.join(" / "));
  await p.fill(".search input", "zzzz");
  await p.waitForTimeout(200);
  ok("menu: empty state", await p.isVisible(".menu__empty"));
  await p.fill(".search input", "dragon");
  await p.click(".tab >> text=Mexican");
  await p.evaluate(() => document.getElementById("ch-sushi").scrollIntoView({ behavior: "instant" }));
  await p.click("#ch-sushi .dish-links a >> text=Fireworks Roll");
  await p.waitForTimeout(1500);
  const t = await p.evaluate(() => {
    const r = document.getElementById("item-fireworks-roll");
    const b = r.getBoundingClientRect();
    return { hidden: r.hidden, target: r.classList.contains("is-target"), top: Math.round(b.top), q: document.querySelector(".search input").value };
  });
  ok("featured link: resets filters and lands on the dish", !t.hidden && t.target && t.top > 0 && t.top < 900 && t.q === "", JSON.stringify(t));
  await p.click(".motion-toggle");
  const m = await p.evaluate(() => [document.documentElement.dataset.motion, localStorage.getItem("llamas-motion")]);
  ok("motion toggle: turns motion off and remembers it", m[0] === "off" && m[1] === "off", m.join(","));
  await p.evaluate(() =>
    document.addEventListener("click", (e) => {
      if (e.target.closest("a[href^='tel:'],a[target=_blank]")) e.preventDefault();
    }, true),
  );
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.click(".hero .btn--red");
  await p.click(".hero .btn--ghost");
  const layer = await p.evaluate(() => (window.dataLayer || []).map((e) => `${e.event}${e.place ? "@" + e.place : ""}${e.item_id ? ":" + e.item_id : ""}`));
  ok(
    "tracking: phone, directions, featured dish, filter, search events",
    ["phone_click@hero", "directions_click@hero", "featured_dish_click:fireworks-roll"].every((x) => layer.includes(x)) && layer.some((x) => x.startsWith("cuisine_filter")),
    layer.join(", "),
  );
  await p.goto(URL, { waitUntil: "load" });
  await p.keyboard.press("Tab");
  const first = await p.evaluate(() => [document.activeElement.textContent, getComputedStyle(document.activeElement).outlineStyle, document.activeElement.getBoundingClientRect().top]);
  ok("keyboard: first Tab reaches visible 'Skip to the menu'", /Skip to the menu/.test(first[0]) && first[2] >= 0, JSON.stringify(first));
  const seq = [];
  for (let i = 0; i < 14; i++) {
    await p.keyboard.press("Tab");
    seq.push(await p.evaluate(() => {
      const a = document.activeElement;
      return `${(a.textContent || a.getAttribute("aria-label") || a.tagName).trim().slice(0, 24)}[${getComputedStyle(a).outlineStyle}]`;
    }));
  }
  ok("keyboard: focus order with visible outline", seq.every((s) => s.includes("[solid]")), seq.join(" > "));
  await p.addScriptTag({ content: AXE });
  const ax = await p.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa"] });
    return r.violations.map((v) => `${v.id}(${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" ; ")}`);
  });
  ok("axe WCAG 2 A/AA: zero violations", ax.length === 0, ax.join(" || "));
  ok("interaction run: no errors", errors.length === 0, errors.join(" | "));
  await c.close();
}
{
  const c = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await withBypass(c);
  const p = await c.newPage();
  await p.goto(URL);
  const s = await p.evaluate(() => ({ dishes: document.querySelectorAll(".dish").length, call: document.querySelector(".action-bar .call")?.getAttribute("href"), ov: document.documentElement.scrollWidth - innerWidth }));
  ok("no JavaScript: full menu and call link still work", s.dishes === 101 && s.call?.startsWith("tel:+1") && s.ov <= 0, JSON.stringify(s));
  await c.close();
}
await browser.close();
fs.writeFileSync(`${SHOTS}/results.json`, JSON.stringify(out, null, 1));
const passed = out.filter((x) => x.pass).length;
console.log(`\n${passed}/${out.length} passed`);
process.exit(passed === out.length ? 0 : 1);
