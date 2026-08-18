import { RevealGate } from "@/components/home/RevealGate";
import { ServiceMenu } from "@/components/home/ServiceMenu";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/config/copy";

export default function Home() {
  return (
    <RevealGate>
      <main>
        <section className="px-6 pb-10 pt-14 text-center md:pb-12 md:pt-20">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-dark">{BRAND_NAME}</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
            {BRAND_TAGLINE}
          </h1>
        </section>

        <section className="px-6 pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <ServiceMenu />
          </div>
        </section>
      </main>
    </RevealGate>
  );
}
