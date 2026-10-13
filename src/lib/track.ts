// Measurement hook. No analytics service is connected yet, so events go to
// window.dataLayer (ready for Google Tag Manager or GA4 when the owner adds one)
// and to a "llamas:track" DOM event. Clicks are intent signals, not visits.
type Params = Record<string, string | number | undefined>;
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...params });
    window.dispatchEvent(new CustomEvent("llamas:track", { detail: { event, ...params } }));
  } catch {
    /* never let measurement break the page */
  }
}
