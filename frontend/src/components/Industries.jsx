import { Coffee, CupSoda, Utensils } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const ICONS = { utensils: Utensils, cafe: CupSoda, coffee: Coffee };

export const Industries = () => {
  const { t } = useLanguage();
  return (
    <section id="isletmeler" data-testid="industries" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{t.industries.eyebrow}</p>
            <h2 data-testid="industries-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t.industries.title}
            </h2>
            <p data-testid="industries-desc" className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.industries.desc}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {t.industries.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Utensils;
            return (
              <Reveal key={item.id} delay={0.1 + i * 0.1} className="h-full">
                <article
                  data-testid={`industry-card-${item.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#0a0a0c] p-8 transition-colors duration-500 hover:border-white/25 sm:p-9"
                >
                  <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-white transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
