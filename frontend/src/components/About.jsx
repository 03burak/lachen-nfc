import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const SLIDES = [
  { src: "/images/plexi-scene.png", alt: "Lachen & Co. pleksi NFC/QR masa standı — kafe sahnesi" },
  { src: "/images/plexi-1.webp", alt: "Lachen & Co. pleksi NFC/QR masa standı" },
  { src: "/images/plexi-2.webp", alt: "Lachen & Co. pleksi masa standı — detay" },
  { src: "/images/nfc-tech.png", alt: "Lachen & Co. NFC restoran teknolojisi" },
];

export const About = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="hakkimizda" data-testid="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div
            data-testid="about-slider"
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c]"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={SLIDES[index].src}
                src={SLIDES[index].src}
                alt={SLIDES[index].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />

            <button
              data-testid="about-slider-prev"
              onClick={() => go(-1)}
              aria-label="Önceki görsel"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-white hover:text-black group-hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              data-testid="about-slider-next"
              onClick={() => go(1)}
              aria-label="Sonraki görsel"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-white hover:text-black group-hover:opacity-100"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  data-testid={`about-slider-dot-${i}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Görsel ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
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
