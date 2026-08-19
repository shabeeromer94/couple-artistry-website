import Image from "next/image";
import { RevealGate } from "@/components/home/RevealGate";
import { ServiceMenu } from "@/components/home/ServiceMenu";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";

export default function Home() {
  return (
    <RevealGate>
      <main>
        {/* Hero — full-bleed portfolio photo, brand heading overlaid
            top-left on a dark scrim so it stays crisp and legible
            regardless of crop. */}
        <ScrollFadeSection className="relative h-[62vh] min-h-[420px] w-full overflow-hidden sm:h-[75vh] md:h-[88vh]">
          <Image
            src="/images/home/hero.jpg"
            alt="Couple Artistry by Shaash — bridal makeup and hair artistry, led by the couple"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/20 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-start px-6 pt-14 sm:px-10 sm:pt-20 md:px-16 md:pt-24">
            <h1 className="font-display text-4xl uppercase leading-tight tracking-[0.04em] text-ivory sm:text-6xl md:text-7xl">
              Couple Artistry
            </h1>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-ivory/90 sm:text-sm">
              Artistry Led by the Couple
            </p>
          </div>
        </ScrollFadeSection>

        {/* About — short intro, expanded on in full on the Makeup page */}
        <ScrollFadeSection className="px-6 py-12 text-center md:py-16">
          <div className="mx-auto max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-dark">About Us</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-light">
              Founded by Ashi &amp; Shabeer, Couple Artistry by Shaash brings together 9+ years of
              bridal beauty experience — makeup, colour analysis, and styling guided as one, so every
              look feels timeless, elegant, and completely you.
            </p>
          </div>
        </ScrollFadeSection>

        <ScrollFadeSection className="px-6 pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <ServiceMenu />
          </div>
        </ScrollFadeSection>
      </main>
    </RevealGate>
  );
}
