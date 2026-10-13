# Llamas Restaurant website

The website for Llamas Restaurant, 5825 Manzanita Ave, Carmichael, CA, which serves Peruvian specialties, Mexican favorites and sushi.

It is one page built with Next.js (App Router). The page is prerendered as static HTML, so the full menu, Call and Directions work even when JavaScript is off. Motion is added on top. It respects reduced-motion and Save-Data settings, and there is a toggle in the header.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (type check included)
npm run typecheck
```

### Browser checks

```bash
npm run build && npx next start -p 3000 &
npm run test:e2e     # 43 checks: phone and desktop, reduced motion, video blocked,
                     # Save-Data, menu search and filters, keyboard, axe WCAG 2 A/AA, no-JS
```

- To use a Chromium that is not managed by Playwright, set `CHROMIUM_PATH`.
- To test a deployed preview, set `SITE_URL`.
- Screenshots and `results.json` go to `tests/output/`, which git ignores.

## Where things live

| What | File |
|---|---|
| Name, address, phone, directions link | `src/content/site.ts` |
| Full menu: 101 dishes, prices as printed | `src/content/menu.ts` |
| Image and video list, alt text, swap-in notes | `src/content/media.ts` |
| Page sections | `src/components/llamas/` |
| Styles (brand colors #111111, #C62828, #F4C542, #FFF8EE) | `src/app/llamas.css` |
| Images, flame video, logo, share image | `public/assets/` |

To replace an illustrative dish image with a real photo:
1. Save the photo as WebP at widths 640, 1280 and 1920.
2. Put it in `public/assets/img/` with the same base name as the image it replaces.
3. In that image's entry in `src/content/media.ts`, set `sourceType: "photo"` and fill in `replacement`.

### Analytics

Clicks are pushed to `window.dataLayer`, ready for Google Tag Manager or GA4. No analytics account is connected yet.

Events:
- `menu_view`
- `featured_dish_click`
- `phone_click`
- `directions_click`
- `cuisine_filter`
- `menu_search`
- `menu_cta`

## Deploying on Vercel

Vercel builds this repository with its standard Next.js settings: build command `next build`, Node 20 or newer. It needs no environment variables.

1. In Vercel, choose **Add New → Project**, import `deintellworkspace/llamas-restaurant-website`, and name the project `llamas-restaurant-website`.
2. Every pull request and branch gets its own **preview** link. Vercel marks previews `noindex`, so search engines skip them.
3. Merging into `main` updates the **live** site. Only merge once the owner has approved the facts below.

## Facts still to confirm with the owner

- **Suite and phone.** The printed menu says Suite 2 and (916) 334-7122. A Restaurant.com listing shows Suite 3 and (916) 566-9405. The site uses the printed values.
- **Hours.** Not shown; the site asks visitors to call.
- **Prices.** As printed, and labeled as possibly changing.
- **Ordering.** There is no Order Online button until a real ordering link exists.
- **Menu spellings.** The ones to check are listed in `REVIEW_FLAGS` in `src/content/menu.ts`.
