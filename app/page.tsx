import Image from "next/image";
import { RevealGate } from "@/components/home/RevealGate";
import { ServiceMenu } from "@/components/home/ServiceMenu";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";

export default function Home() {
  return (
    <RevealGate>
      <main>
        {/* Hero — full-bleed portfolio photo, extending up under the
            transparent nav (-mt-24 matches the nav's own h-24). Heading,
            tagline, and the About Us intro all sit low on the image over a
            dark scrim, so nothing collides with the nav floating on top. */}
        <ScrollFadeSection className="relative -mt-24 h-[68vh] min-h-[560px] w-full overflow-hidden sm:h-[78vh] md:h-[92vh]">
          <Image
            src="/images/home/hero.jpg"
            alt="Couple Artistry by Shaash — bridal makeup and hair artistry, led by the couple"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 md:px-16 md:pb-16">
            <h1 className="font-display text-4xl uppercase leading-tight tracking-[0.04em] text-ivory sm:text-6xl md:text-7xl">
              Couple Artistry
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-ivory/90 sm:text-sm">
              Artistry Led by the Couple
            </p>

            <div className="mt-8 max-w-xl border-t border-ivory/25 pt-6 sm:mt-10 sm:pt-8">
              <p className="text-xs uppercase tracking-[0.25em] text-ivory/70">About Us</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/90 sm:text-base">
                Founded by Ashi &amp; Shabeer, Couple Artistry by Shaash brings together 9+ years of
                bridal beauty experience — makeup, colour analysis, and styling guided as one, so
                every look feels timeless, elegant, and completely you.
              </p>
            </div>
          </div>
        </ScrollFadeSection>

        <ScrollFadeSection className="px-6 pb-16 pt-16 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-3xl">
            <ServiceMenu />
          </div>
        </ScrollFadeSection>
      </main>
    </RevealGate>
  );
}
