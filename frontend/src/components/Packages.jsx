import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToId } from "@/lib/lenis";
import Reveal from "@/components/Reveal";

export const Packages = () => {
  const { t } = useLanguage();
  const pkgs = [
    { key: "gold", featured: true, ...t.packages.gold },
    { key: "bronz", featured: false, ...t.packages.bronz },
  ];

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

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {pkgs.map((p, i) => (
            <Reveal key={p.key} delay={0.1 + i * 0.12} className="h-full">
              <article
                data-testid={`package-card-${p.key}`}
                className={`relative flex h-full flex-col rounded-3xl border p-8 sm:p-10 ${
                  p.featured
                    ? "border-white/40 bg-white/[0.05] shadow-[0_30px_90px_-40px_rgba(255,255,255,0.25)]"
                    : "border-white/10 bg-[#0a0a0c]"
                }`}
              >
                <div className="mb-8 flex items-start justify-between">
                  <span
                    data-testid={`package-tier-${p.key}`}
                    className={`rounded-full border px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
                      p.key === "gold"
                        ? "border-amber-300/40 bg-amber-300/10 text-amber-200"
                        : "border-orange-200/30 bg-orange-200/10 text-orange-200/90"
                    }`}
                  >
                    {p.tier}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">{t.packages.soon}</span>
                </div>

                <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{p.name}</h3>
                <p data-testid={`package-desc-${p.key}`} className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {p.desc}
                </p>

                <p className="mt-9 mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  {t.packages.includesTitle}
                </p>
                <ul className="flex flex-col gap-3">
                  {p.items.map((item, idx) => (
                    <li key={idx} data-testid={`package-item-${p.key}-${idx}`} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20">
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  data-testid={`package-cta-${p.key}`}
                  onClick={() => scrollToId("#iletisim")}
                  className={`mt-10 w-full rounded-full py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] ${
                    p.featured
                      ? "bg-white text-black"
                      : "border border-white/25 text-white hover:bg-white/5"
                  }`}
                >
                  {t.packages.cta}
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
