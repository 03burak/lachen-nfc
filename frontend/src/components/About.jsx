import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export const About = () => {
  const { t } = useLanguage();
  return (
    <section id="hakkimizda" data-testid="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div
            data-testid="about-image-frame"
            className="relative overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1750943079478-ae516c4133cd?crop=entropy&cs=srgb&fm=jpg&q=80"
              alt={t.about.title}
              className="h-[320px] w-full object-cover sm:h-[440px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-[#050505]/30" />
            <p
              data-testid="about-image-tag"
              className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-200 backdrop-blur-md"
            >
              {t.about.imageTag}
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{t.about.eyebrow}</p>
            <h2 data-testid="about-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t.about.title}
            </h2>
            <p data-testid="about-p1" className="mt-7 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.about.p1}
            </p>
            <p data-testid="about-p2" className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.about.p2}
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col">
            {t.about.pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.08}>
                <div data-testid={`about-pillar-${i}`} className="flex items-start gap-4 border-t border-white/10 py-5 last:border-b">
                  <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-white sm:text-base">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
