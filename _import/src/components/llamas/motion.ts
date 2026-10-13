// Motion preference: "on" | "off". Default follows prefers-reduced-motion;
// the header toggle overrides it and is remembered on this device.
export type Motion = "on" | "off";
const KEY = "llamas-motion";

// Runs inline before the page paints (see BOOT_SCRIPT) and again on hydrate.
export const BOOT_SCRIPT = `(function(){try{var s=localStorage.getItem("${KEY}");}catch(e){}var r=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.dataset.motion=(s==="on"||s==="off")?s:(r?"off":"on");})();`;

export function currentMotion(): Motion {
  if (typeof document === "undefined") return "off";
  return document.documentElement.dataset.motion === "on" ? "on" : "off";
}
export function setMotion(m: Motion) {
  document.documentElement.dataset.motion = m;
  try {
    localStorage.setItem(KEY, m);
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent("llamas:motion", { detail: m }));
}
export function onMotion(cb: (m: Motion) => void) {
  const h = (e: Event) => cb((e as CustomEvent<Motion>).detail);
  window.addEventListener("llamas:motion", h);
  return () => window.removeEventListener("llamas:motion", h);
}
// Skip heavy media on Save-Data or slow connections.
export function lightDataMode(): boolean {
  const c = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return !!c && (c.saveData === true || /(^|-)2g|3g/.test(c.effectiveType || ""));
}
