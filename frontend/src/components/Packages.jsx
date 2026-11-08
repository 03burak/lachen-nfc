import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToId } from "@/lib/lenis";
import Reveal from "@/components/Reveal";

const TIER_STYLES = {
  bronz: "border-orange-200/30 bg-orange-200/10 text-orange-200/90",
  silver: "border-zinc-300/40 bg-zinc-300/10 text-zinc-200",
  gold: "border-amber-300/40 bg-amber-300/10 text-amber-200",
};

export const Packages = () => {
  const { t } = useLanguage();

  return (
    <section id="paketler" data-testid="packages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{t.packages.eyebrow}</p>
            <h2 data-testid="packages-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t.packages.title}
            </h2>
            <p data-testid="packages-desc" className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.packages.desc}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {t.packages.items.map((p, i) => {
            const featured = p.key === "silver";
            return (
              <Reveal key={p.key} delay={0.08 + i * 0.1} className="h-full">
                <article
                  data-testid={`package-card-${p.key}`}
                  className={`relative flex h-[560px] flex-col rounded-3xl border p-7 sm:p-8 ${
                    featured
                      ? "border-white/40 bg-white/[0.05] shadow-[0_30px_90px_-40px_rgba(255,255,255,0.25)]"
                      : "border-white/10 bg-[#0a0a0c]"
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between gap-2">
                    <span
                      data-testid={`package-tier-${p.key}`}
                      className={`rounded-full border px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest ${TIER_STYLES[p.key] || "border-white/20 text-zinc-300"}`}
                    >
                      {p.tier}
                    </span>
                    {featured && (
                      <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">{p.name}</h3>
                  <p data-testid={`package-desc-${p.key}`} className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                    {p.desc}
                  </p>

                  {p.price ? (
                    <p data-testid={`package-price-${p.key}`} className="mt-4 font-display text-xl font-bold text-white">
                      {p.price}
                    </p>
                  ) : null}

                  <p className="mb-3 mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    {t.packages.includesTitle}
                  </p>

                  <div
                    data-testid={`package-features-scroll-${p.key}`}
                    className="min-h-0 flex-1 overflow-y-auto pr-2"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    <ul className="flex flex-col gap-3 pb-1">
                      {p.features.map((f, idx) => (
                        <li key={idx} data-testid={`package-item-${p.key}-${idx}`} className="flex items-start gap-3 text-sm leading-snug text-zinc-300">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20">
                            <Check size={11} strokeWidth={2.5} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    data-testid={`package-cta-${p.key}`}
                    onClick={() => scrollToId("#iletisim")}
                    className={`mt-6 w-full shrink-0 rounded-full py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] ${
                      featured ? "bg-white text-black" : "border border-white/25 text-white hover:bg-white/5"
                    }`}
                  >
                    {t.packages.cta}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;
