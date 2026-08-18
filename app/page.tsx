import { RevealGate } from "@/components/home/RevealGate";
import { ServiceCardGrid } from "@/components/home/ServiceCardGrid";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/config/copy";

export default function Home() {
  return (
    <RevealGate>
      <main>
        <section className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-dark">{BRAND_NAME}</p>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-charcoal sm:text-5xl">
            {BRAND_TAGLINE}
          </h1>
        </section>

        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto max-w-content">
            <ServiceCardGrid />
          </div>
        </section>
      </main>
    </RevealGate>
  );
}
