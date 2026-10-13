import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { BOOT_SCRIPT } from "@/components/llamas/motion";
import "./base.css";
import "./llamas.css";

// Fraunces is only ever set at 700, so the variable font with optical sizing renders
// the same as the 600/700 faces the Higgsfield site loaded.
const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });
// Manrope 500 to 800 only, as on the Higgsfield site: body text set at 400 renders
// with the 500 face there, so it must here too.
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });

// Vercel sets this on every build; it gives share images an absolute URL.
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

const title = "Llamas Restaurant in Carmichael, CA | Peruvian, Mexican & Sushi";
const description =
  "Peruvian specialties, Mexican favorites, and sushi at one welcoming table. See the full menu, call, or get directions to 5825 Manzanita Ave, Carmichael.";

export const metadata: Metadata = {
  metadataBase: host ? new URL(`https://${host}`) : undefined,
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/assets/og/llamas-og-1200x630.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/og/llamas-og-1200x630.jpg"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111111" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Sets html[data-motion] before first paint so pinned chapters never jump. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="llamas">{children}</body>
    </html>
  );
}
