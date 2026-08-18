import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { JourneyProvider } from "@/lib/context/JourneyProvider";
import { UtmCapture } from "@/lib/context/UtmCapture";
import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/config/copy";
import { env } from "@/lib/config/env";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${BRAND_NAME} — Bridal Makeup & Hair Artistry`,
    template: `%s — ${BRAND_NAME}`,
  },
  description: BRAND_TAGLINE,
  openGraph: {
    title: BRAND_NAME,
    description: BRAND_TAGLINE,
    siteName: BRAND_NAME,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable} bg-ivory font-sans text-charcoal antialiased`}>
        <UtmCapture />
        <JourneyProvider>
          <Nav />
          {children}
          <Footer />
        </JourneyProvider>
      </body>
    </html>
  );
}
