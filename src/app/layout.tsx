import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const display = localFont({
  src: [
    { path: "../../public/fonts/font-2.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/font-3.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/font-4.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/font-0.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/font-1.ttf", weight: "500", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: false,
});
const sans = localFont({
  src: [
    { path: "../../public/fonts/font-5.ttf", weight: "400" },
    { path: "../../public/fonts/font-6.ttf", weight: "500" },
    { path: "../../public/fonts/font-7.ttf", weight: "600" },
    { path: "../../public/fonts/font-8.ttf", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_URL
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  openGraph: {
    title: "KPM Opulence — The Event Studio",
    description:
      "Your moment, beautifully imagined. Florals, romantic settings and personalised celebrations.",
    siteName: "KPM Opulence",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPM Opulence — The Event Studio",
    description: "Your moment, beautifully imagined.",
    images: ["/opengraph-image.png"],
  },
  title: "KPM Opulence — The Event Studio",
  description:
    "Your moment, beautifully imagined. An interactive event styling concept by paceIT.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={display.variable + " " + sans.variable}>
      <body>{children}</body>
    </html>
  );
}
