import Link from "next/link";
import { NAV_LINKS } from "@/lib/config/navigation";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/config/copy";
import { env } from "@/lib/config/env";
import { buildWaLink } from "@/lib/utils/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  const waLink = buildWaLink("Hi Couple Artistry! I'd like to know more.", env.whatsappNumber);

  return (
    <footer className="border-t border-charcoal/10 bg-ivory-dark">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-charcoal">{BRAND_NAME}</p>
            <p className="mt-2 max-w-xs text-sm text-charcoal-light">{BRAND_TAGLINE}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal-light">Explore</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-charcoal-light hover:text-wine"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-charcoal-light hover:text-wine">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal-light">Connect</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-light hover:text-wine">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={env.instagramMain} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-light hover:text-wine">
                  Instagram — The Couple Artistry
                </a>
              </li>
              <li>
                <a href={env.instagramStitching} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-light hover:text-wine">
                  Instagram — Stitching Studio
                </a>
              </li>
              <li>
                <a href={env.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-light hover:text-wine">
                  Google Business
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs text-charcoal-light/70">
          © {year} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
