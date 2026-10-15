import { ArrowUpRight, BarChart3, Bot, Nfc, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const ICONS = { nfc: Nfc, star: Star, chart: BarChart3, ai: Bot };

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="hizmetler" data-testid="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{t.services.eyebrow}</p>
            <h2 data-testid="services-title" className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t.services.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p data-testid="services-desc" className="max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.services.desc}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div data-testid="services-grid" className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {t.services.items.map((item) => {
              const Icon = ICONS[item.icon] || Nfc;
              return (
                <article
                  key={item.id}
                  data-testid={`service-card-${item.id}`}
                  className="group relative flex min-h-[300px] flex-col justify-between bg-[#0a0a0c] p-8 transition-colors duration-500 hover:bg-white sm:p-10 lg:min-h-[340px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-zinc-500 transition-colors duration-500 group-hover:text-black/50">
                      /{item.tag}
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400 transition-colors duration-500 group-hover:border-black/20 group-hover:text-black/60">
                      {item.label}
                    </span>
                  </div>

                  <div className="mt-10">
                    <Icon
                      size={30}
                      strokeWidth={1.5}
                      className="mb-6 text-zinc-300 transition-colors duration-500 group-hover:text-black"
                    />
                    <h3 className="font-display text-xl font-semibold tracking-tight text-white transition-colors duration-500 group-hover:text-black sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-black/70 sm:text-base">
                      {item.desc}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={22}
                    className="absolute bottom-8 right-8 text-zinc-600 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black sm:bottom-10 sm:right-10"
                  />
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
